import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() activeLink: string = "";
  @Input() userName: string = "Agent Name";

  dropdownVisible: boolean = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    window.location.href = '/logout';
  }
}
