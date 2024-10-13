import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../classes/Product';
import { storeAPIService } from '../services/api.service'
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit, OnChanges {
  @Input() productCategory: string = 'All Categories';
  products : Product[] = [];
  showModal : boolean = false;
  modalProduct?: Product;
  productAdded: boolean = false;

  constructor(private apiService : storeAPIService, private sessionService : SessionService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['productCategory']) {
        this.fetchProducts();
      }
  }

  fetchProducts() {
    if(this.productCategory == 'All Categories') {
      this.apiService.getAllProducts().subscribe({
          next: (data: any[]) => {
            this.products = data.map(product => new Product(product));
          },
          error : (error) => {
            console.log(error);
          },
          complete : () => {
            console.log('Products fetched');
          }
        }
      )
    } else {
      this.apiService.getProductsByCategory(this.productCategory).subscribe({
          next: (data) => {
            this.products = data
          },
          error : (error) => {
            console.log(error);
          },
          complete : () => {
            console.log('Products fetched');
          }
        }
      )
    }
  }

  showProduct(product: Product) {
    console.log(product);
    this.showModal = true;
    this.modalProduct = product;
  }

  addToCart() {
    if(!this.modalProduct) {
      return;
    }
    let cart: Product[] = this.sessionService.getCart() || [];

    let existingProduct = cart.find((product: Product) => product.id === this.modalProduct?.id);
    if (existingProduct) {
      existingProduct.cartCount += 1; 
    } else {
      this.modalProduct.cartCount = 1; 
      cart.push(this.modalProduct);
    }
    this.productAdded = true;
    this.sessionService.setCart(cart);
  }

  closeModal(){
    this.productAdded = false;
    this.showModal = false;
  }
}
