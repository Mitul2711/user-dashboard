import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-user-details',
  imports: [MatTabsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<UserDetailsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data);
    
  }
}