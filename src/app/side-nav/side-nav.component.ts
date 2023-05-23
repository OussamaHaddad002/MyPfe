import { Component, Input , Output, EventEmitter, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
 @Input() activeLink: string = 'Dashboard';
 @Output() activeLinkChange: EventEmitter<string> = new EventEmitter<string>();

 constructor (private router: Router) {}

 ngOnInit(){
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.activeLink = this.getActiveLinkFromUrl(event.urlAfterRedirects);
    }
  });
 }

 getActiveLinkFromUrl(url: string): string {
  if (url.includes('/dashboard')) {
    return 'dashboard';
  } else if (url.includes('/schedule')) {
    return 'schedule';
  } else if (url.includes('/resources')) {
    return 'resources';
  } else if (url.includes('/changelog')) {
    return 'changelog';
  } else {
    return '';
  }
 }



 setActiveLink(link: string) {

  setTimeout(()=> {
    this.activeLink = link;
    this.activeLinkChange.emit(this.activeLink);
  })


 }


}
