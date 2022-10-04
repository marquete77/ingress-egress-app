import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userName: string = '';
  userSubs!: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .subscribe(({user}) => this.userName = user?.name)
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logout() {
    this.auth.logout()
      .then(() => this.router.navigate(['/login']));
  }

}
