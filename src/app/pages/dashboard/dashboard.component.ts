import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DashboardService } from '../dashboard.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { HighlightDirective } from '../../directive/highlight.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    HighlightDirective,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'username', 'email', 'company', 'city'];
  userData: any[] = [];
  apiResponse: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  isLoading = true;
  isTableVisible = false;
  isDashboardCardsVisible = false;
  isSearchVisible = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;

    this.dashBoardService.getUsers().subscribe({
      next: (data: any[]) => {
        this.apiResponse = data;
        this.userData = data.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.address.city,
          company: user.company.name
        }));

        this.dataSource.data = this.userData;
        
        this.loadComponentsProgressively();
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.isLoading = false;
      }
    });
  }

  private loadComponentsProgressively() {
    setTimeout(() => {
      this.isDashboardCardsVisible = true;
    }, 300);

    setTimeout(() => {
      this.isSearchVisible = true;
    }, 600);

    setTimeout(() => {
      this.isTableVisible = true;
      this.isLoading = false;
      
      this.setPaginatorAfterTableRender();
    }, 900);
  }

  private setPaginatorAfterTableRender() {
    const maxAttempts = 10;
    let attempts = 0;
    
    const setPaginator = () => {
      if (this.paginator && this.dataSource) {
        this.dataSource.paginator = this.paginator;
        console.log('Paginator set successfully');
        return;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(setPaginator, 50);
      } else {
        console.warn('Could not set paginator after', maxAttempts, 'attempts');
      }
    };
    
    setTimeout(setPaginator, 50);
  }

  ngAfterViewInit() {
    if (this.isTableVisible && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onSearch(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    if (filterValue === '') {
      this.dataSource.data = this.userData;
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
    
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onRowClick(row: any) {
    let data = this.apiResponse.filter((user: any) => user.id === row.id)[0];
    this.dialog.open(UserDetailsComponent, {
      data: data
    });
  }
}