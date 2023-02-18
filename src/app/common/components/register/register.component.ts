import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  registerForm = new FormGroup({
    username: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  onSubmit() {
    console.info(this.registerForm.value);
    this.authService.register(this.registerForm.value as User).subscribe({
      next: data => {
        console.log(data);
        if (data.success) {
          this.router.navigate(['/login']);
        }
      },
      error: error => console.error(error)
    })
  }
}
