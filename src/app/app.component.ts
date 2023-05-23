import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeLink: string = '';
  showSideNavAndSearchBar: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.showSideNavAndSearchBar = !this.router.url.includes('/authenticate') && !this.router.url.includes('/register');

      if (event instanceof NavigationEnd) {
        this.activeLink = this.getActiveLinkFromUrl(event.urlAfterRedirects);
      }
      console.log("sidenav" + this.showSideNavAndSearchBar)
    });
  }

  getActiveLinkFromUrl(url: string): string {
    // Parse the URL and extract the active link based on the path or any other criteria
    // You can customize this method based on your route configuration
    if (url.includes('/dashboard')) {
      return 'Dashboard';
    } else if (url.includes('/schedule')) {
      return 'Schedule';
    } else if (url.includes('/ressources')) {
      return 'Resources';
    } else if (url.includes('/changelog')) {
      return 'Change Log';
    } else {
      return '';
    }
  }
}
