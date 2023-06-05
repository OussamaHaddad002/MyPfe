import { Component } from '@angular/core';
import { AuthenticationService } from "../services/authentication-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  username: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder,) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isFieldEmpty(field: string): boolean {
    return field === 'username' ? !this.username : !this.password;
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password);
  }

  login() {
    const login = this.loginForm.value.login;
    const password = this.loginForm.value.password;

    this.authService.login(login, password);
  }
}
