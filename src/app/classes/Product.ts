export class Product {
    id: number;
    title: string;
    description: string;
    category: string;
    rating: {rate : number; count : number};
    image: string;
    price: number;
    cartCount: number;
  
    constructor(product: any) {
        {
          this.id = product.id;
          this.title = product.title || '';
          this.description = product.description || '';
          this.category = this.formatCategoryName(product.category) || '';
          this.rating = product.rating || '';
          this.image = product.image || '';
          this.price = product.price || '';
          this.cartCount = 0;
        }
    }

    formatCategoryName(str: string ): string {
      return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
    }
  }
  