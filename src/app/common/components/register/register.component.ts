import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  constructor() { }
  
  registerForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    console.info(this.registerForm.value);
  }
}
