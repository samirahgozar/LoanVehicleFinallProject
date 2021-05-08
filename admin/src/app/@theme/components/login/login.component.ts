import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertPosition, AlertType } from 'app/@core/data/alert';
import { AlertService } from 'app/_services/alert.service';
import { first } from 'rxjs/operators';
import { AddUserDTO, User } from '../../../@core/data/users';
import { AuthService } from '../../../_Services/auth.service';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    public toastrService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authservice.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  registerForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  loginLoading = false;
  submitted = false;
  loginSubmitted = false;
  user: any;

  successTitle = 'Success!';
  successContent = "Registration Successful!";
  errorContent = "Registration Failed!";

  returnUrl = '/pages/home';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loginForm = this.formBuilder.group({
      loginUsername: ['', Validators.required],
      loginPassword: ['', Validators.required]
    });
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // signUpButton.addEventListener('click', () => {
    //   container.classList.add('right-panel-active');
    // });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  get g() {

    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authservice.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          // this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

  register() {
    // this.submitted = true;
    // // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // }
    // this.loading = true;
    // const addUserDTO: AddUserDTO = {
    //   FirstName: this.registerForm.value.firstName,
    //   LastName: this.registerForm.value.lastName,
    //   Username: this.registerForm.value.username,
    //   Password: this.registerForm.value.password,
    // };
    // if (this.registerForm.valid) {
    //   this.user = Object.assign({}, this.registerForm.value);
    //   this.authservice.register(addUserDTO).subscribe(
    //     (data) => {
    //       data['error'] && this.toastrService.showAlert('error', this.errorContent, data['error'], "toast-buttom-center");
    //       data["msg"] && this.toastrService.showAlert('success', this.successTitle, data["msg"], "toast-buttom-center");
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.toastrService.showAlert('error', "Registeration Failed", error?.error, "toast-buttom-center");
    //     },
    //     () => {
    //       this.loading = false;
    //     }
    //   );
    // }
  }

  logIn() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginLoading = true;
    this.authservice.login(this.g.loginUsername.value, this.g.loginPassword.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          if (error.status == 401) {
            this.toastrService.showAlert('error', "Login Failed", 'Invalid Username or Password!', "toast-buttom-center");
          }
          else {
            this.toastrService.showAlert('error', "Login Failed", 'Server Error! try again...', "toast-buttom-center");
          }
          this.loginLoading = false;
        });
  }
}
