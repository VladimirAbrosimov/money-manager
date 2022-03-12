import {Component, HostListener, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public username: string = this.userService.getUsername();
  public isActive = false;

  private smallScreenWidth = 700;
  public isScreenWidthTooSmall = window.innerWidth < this.smallScreenWidth;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize')
  onResize(): void {
    this.isScreenWidthTooSmall = window.innerWidth < this.smallScreenWidth;
  }

  public toggleActive(): void {
    this.isActive = !this.isActive;
  }

}
