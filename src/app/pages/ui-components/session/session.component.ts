import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { AddSeanceComponent } from '../add-seance/add-seance.component';

/** Constants used to fill up our data base. */
export interface GymSessionData {
  username: string;
  age: number;
  dateJoined: string;  // Using ISO date format for simplicity
  dateEnd: string;     // Adding dateEnd
  status: string;      // e.g., 'Paid', 'Not Paid'
}

/** Static data for gym sessions */
const GYM_SESSIONS: GymSessionData[] = [
  { username: 'Mohamed Ali', age: 25, dateJoined: '2024-01-15', dateEnd: '2024-01-31', status: 'Payé' },
  { username: 'Achref Hamdi', age: 30, dateJoined: '2024-02-20', dateEnd: '2024-03-15', status: 'Non Payé' },
  { username: 'Seif Zoghlami', age: 22, dateJoined: '2024-03-10', dateEnd: '2024-03-31', status: 'Payé' },
  { username: 'Oussam Hamdi', age: 28, dateJoined: '2024-04-05', dateEnd: '2024-04-30', status: 'Payé' },
  { username: 'Chichi Riahi', age: 35, dateJoined: '2024-05-12', dateEnd: '2024-06-12', status: 'Non Payé' },
  { username: 'Iheb Fouzai', age: 35, dateJoined: '2024-05-12', dateEnd: '2024-06-12', status: 'Non Payé' },
  // Add more static data as needed
];

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements AfterViewInit {
  displayedColumns: string[] = ['username', 'age', 'dateJoined', 'dateEnd', 'status','actions']; // Added 'dateEnd'
  dataSource: MatTableDataSource<GymSessionData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private messageService:MessageService) {
    // Assign the static data to the data source for the table to render
    this.dataSource = new MatTableDataSource(GYM_SESSIONS);
  }
  show() {
    console.log("test")
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);
  addSeance() {
    const dialogRef = this.dialog.open(AddSeanceComponent, {
      width: '60%', // Adjust the width as needed
      maxWidth: '90vw', // Optional: Set a max width relative to viewport width
      height:'100%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
