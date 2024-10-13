# Shoptrek

Shoptrek is a fully functional E-commerce website built with Angular and Tailwind CSS. The project fetches product data from the [FakeStore API](https://fakestoreapi.com/) and allows users to browse, filter, and purchase products.

## Features
- **User Authentication**: The project starts with a login form. Upon successful login(currently any email and password is allowed), the product data is fetched from FakeStore API.
- **Product Filtering**: Users can filter products based on different categories.
- **Product Details**: Users can view more details of a product by clicking on it. A modal will open displaying the product's image, rating, description, and an "Add to Cart" button.
- **Shopping Cart**: Users can add multiple products to the cart, view the cart details with quantity, and see the subtotal. The cart items are stored in **session storage**, so users can log out and log in again to see their added products.
- **Order Placement**: A "Place Order" button allows users to finalize their order, and a unique order ID is generated for each transaction.

## Tech Stack
- **Angular**: Version 15.1.0
- **Tailwind CSS**: For styling
- **FakeStore API**: The API used for fetching product data.

## Installation and Setup : To run this project locally:
git clone https://github.com/yourusername/shoptrek.git
cd shoptrek 
npm install
ng serve --open