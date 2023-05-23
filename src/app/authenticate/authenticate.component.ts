import { Component } from '@angular/core';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  username: string = '';
  password: string = '';

  isFieldEmpty(field: string): boolean {
    return field === 'username' ? !this.username : !this.password;
  }
}
