import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'user-dashboard';

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit() {
    this.checkSessionExpiry();
  }

  checkSessionExpiry() {
    const interval = setInterval(() => {
      const expiry = Number(localStorage.getItem('expiry'));
      const now = new Date().getTime();
      if (expiry && now > expiry) {
        this.logout();
        clearInterval(interval);
      }
    }, 1000);
  }

  logout() {
    localStorage.clear();
    this.commonService.showWarning('Session expired. Please login again.');
    this.router.navigate(['/login']);
  }


}
