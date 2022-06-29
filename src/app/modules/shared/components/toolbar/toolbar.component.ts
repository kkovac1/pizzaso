import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public user$: Observable<User | null>;

  constructor(
    private authService: AuthService
  ) { 
    this.user$ = this.authService.authenthicated$;
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

}
