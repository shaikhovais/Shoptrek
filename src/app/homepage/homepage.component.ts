import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  selectedCategory : string = 'All Categories';

  receiveValueFromChild(value: any) {
    this.selectedCategory = value;  
    console.log('Received category from header :', value);
  }
}
