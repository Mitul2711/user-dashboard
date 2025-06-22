import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  user!: string;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user') || '';
  }

  logout() {
    localStorage.clear();
    this.commonService.showSuccess('Logout successful');
    this.router.navigate(['/login']);
  }
}
