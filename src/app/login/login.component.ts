import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email : string = '';
  password : string = '';

  constructor(private router: Router) {}

  logIn(form: NgForm) {
    if (form.valid) {

      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({  // hardcoded to do login
          username: "johnd",
          password: "m38rmF$"
        })
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('Error:', err));
    } else {
      console.log("Form is invalid");
    }

    this.router.navigate(['/home']);
  }
}
