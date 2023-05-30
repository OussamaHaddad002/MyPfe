import { Component } from '@angular/core';
import { AuthenticationService } from "../services/authentication-service.service";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService) { }
  isFieldEmpty(field: string): boolean {
    return field === 'username' ? !this.username : !this.password;
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password);
  }
}
