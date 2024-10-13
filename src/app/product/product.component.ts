import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: Product; 
}
