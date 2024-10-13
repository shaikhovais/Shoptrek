import { Component, Output, EventEmitter } from '@angular/core';
import { storeAPIService } from '../services/api.service'
import { SessionService } from '../services/session.service'
import { Product } from '../classes/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();
  categories : string[] = [];
  cart : Product[] = [];
  showCart : boolean = false;
  showPopup : boolean = false;
  confirmOrder : boolean = false;
  orderID : string = '';
  deliveryDate : string = '';
  totalAmount : number = 0;
  isCartEmpty : boolean = true;
  showMobileMenu : boolean = false;

  constructor(private apiService : storeAPIService, private sessionService : SessionService) {
    this.fetchCategories();
  }

  async fetchCategories() {
      this.apiService.getAllCategories().subscribe({
        next: (data) => {
          this.categories = data;
          this.categories.unshift('All Categories');
          this.categories = this.categories.map(category => category.charAt(0).toUpperCase() + category.slice(1))
          console.log(this.categories);
        },
        error : (error) => {
          console.log(error);
        },
        complete : () => {
          console.log('Categories fetched');
        }
      }
    )
  }
  
  onCategoryChange(event : any) : void {
    const target = event.target as HTMLSelectElement;  
    const selectedValue = target?.value || '';  
    console.log('Selected category :', selectedValue);
    this.categorySelected.emit(selectedValue);  
  }

  switchMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  openCart() {
    this.cart = this.sessionService.getCart();
    
    if(this.cart.length !== 0) {
      this.calculateTotalAmount();
      this.isCartEmpty = false;
    } else {
      this.isCartEmpty = true;
    };
    this.showCart = true;
  }

  removeProductFromCart(productId : number) {
    this.cart = this.cart.filter(product => product.id !== productId);
    this.sessionService.setCart(this.cart);
    if(this.cart.length === 0) {
      this.isCartEmpty = true;
    }
    this.calculateTotalAmount();
  }

  checkout() {
    this.orderID = this.generateUniqueOrderId();
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    this.deliveryDate =  `${nextWeek.getDate().toString().padStart(2, '0')} ${nextWeek.toLocaleString('default', { month: 'short' })} ${nextWeek.getFullYear()}`;
    this.sessionService.clearCart();
    this.closeCart();
    this.confirmOrder = true;
  }

  calculateTotalAmount() {
    this.totalAmount = this.cart.reduce((amount, product) => {
      return amount + (product.cartCount * product.price);
    }, 0)
    this.totalAmount = Math.round(this.totalAmount * 100) / 100;
  }

  closeCart() {
    this.showCart = false;
  }

  openPopup(){
    this.showPopup = true;
  }

  closePopup() {
    this.confirmOrder = false;
    this.showPopup = false;
  }

  generateUniqueOrderId(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const uniqueOrderId = `A${month}${day}${year}${seconds}${randomNumber}`;
  
    return uniqueOrderId;
  }
}
