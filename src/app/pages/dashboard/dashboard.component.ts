import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardService } from '../dashboard.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['name', 'username', 'email', 'company', 'city'];
  userData: any[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashBoardService.getUsers().subscribe((data: any[]) => {
      this.userData = data.map(user => ({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        company: user.company.name
      }));

      this.dataSource = new MatTableDataSource(this.userData);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSearch(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    console.log(filterValue);


    if (filterValue === '') {
      this.dataSource.data = this.userData;
      return;
    } else {

      const filteredData = this.userData.filter((data: any) =>
        data.name.toLowerCase().includes(filterValue) ||
        data.username.toLowerCase().includes(filterValue) ||
        data.email.toLowerCase().includes(filterValue) ||
        data.city.toLowerCase().includes(filterValue) ||
        data.company.toLowerCase().includes(filterValue)
      );

      this.dataSource.data = filteredData;
    }
  }

}