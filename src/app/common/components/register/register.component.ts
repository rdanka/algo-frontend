import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent {

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly toastr: ToastrService) { }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  studentForm = new FormGroup({
    neptunId: new FormControl(''),
  });

  status = true;

  toggleUser(): void {
    this.status = !this.status;
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value as User).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.toastr.success('Successfully registered!', 'Success✅', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      },
      error: error => this.toastr.error(error.error.msg, 'Error!', {
        progressBar: true,
        positionClass: 'toast-bottom-right'
      })
    })
  }

  onStudentSubmit(): void {
    this.authService.studentLogin(this.studentForm.value.neptunId || '').subscribe({
      next: data => {
        this.authService.storeStudentData(data.neptunId);
        this.router.navigate(['/visualization']);
        this.toastr.success('You are now logged in!', 'Success✅', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        });
      },
      error: error => {
        console.error(error)
        this.toastr.error(error.error.msg, 'Error!', {
          progressBar: true,
          positionClass: 'toast-bottom-right'
        })
      }
    });
}
}
