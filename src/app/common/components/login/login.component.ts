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

  studentForm = new FormGroup({
    neptunID: new FormControl(''),
  });

  status = true;

  toggleUser() {
    this.status = !this.status;
  }

  onSubmit() {
    this.authService.authenticate(this.loginForm.value as User).subscribe({
      next: data => {
        console.log(data)
        this.authService.storeUserData(data.accessToken, data.user);
        this.router.navigate(['/visualization']);
        this.toastr.success('You are now logged in!', 'Success✅', {
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

  onStudentSubmit() {
    console.log(this.studentForm.value)
  }
}
