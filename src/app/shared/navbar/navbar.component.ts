import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { selectClient } from 'src/app/redux/selectors.store';
import { ClientStoreType } from 'src/app/models/ClientType';

@Component({
  selector: 'dsw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  focus;
  listTitles: any[];
  location: Location;
  client: ClientStoreType;

  constructor(location: Location, private router: Router, private authService: AuthService, private store: Store) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.store.select(selectClient).subscribe(data => this.client = data);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  signOut() {
    this.authService.SignOut().subscribe(_ => {
      this.router.navigate(["/"]);
    });
  }

}
