import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly toastr: ToastrService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    this.authService.authenticate(this.loginForm.value as User).subscribe({
      next: data => {
        this.authService.storeUserData(data.accessToken, data.user);
        this.router.navigate(['/dashboard']);
        this.toastr.success('You are now loggen in!', 'Success✅', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      },
      error: error => this.toastr.error(error.error.msg, 'Error!', {
        progressBar: true,
        positionClass: 'toast-bottom-right'
      })
    });
  }
}
