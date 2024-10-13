import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class storeAPIService {

  private apiUrl = 'https://fakestoreapi.com';  // Base API URL

  constructor(private http: HttpClient) { }

  // Get list of products
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/categories`);
  }

  // Get list of products
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // Get product by ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  // Get product by ID
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/category/${category.toLowerCase()}`);
  }

  // ECreate a new product (POST)
  createProduct(productData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/products`, productData, { headers });
  }

  //  Update product by ID (PUT)
  updateProduct(productId: number, productData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/products/${productId}`, productData, { headers });
  }

  // Delete a product (DELETE)
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
}
