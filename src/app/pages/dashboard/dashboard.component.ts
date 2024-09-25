import { Component, ViewEncapsulation, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
} from 'ng-apexcharts';
import { MessageService } from 'primeng/api';
import { UserDetailsComponent } from '../user-details/user-details.component';

interface RevenueCategory {
  name: string;
  value: number;
}
const REVENUE_DATA: RevenueCategory[] = [
  { name: 'Gym', value: 6000 },
  { name: 'box', value: 2000 },
  { name: 'Thai', value: 1500 },
  { name: 'workout', value: 500 },
  // Add more categories as needed
];
// Gym session interface with added `dateEnd` field
export interface GymSessionData {
  username: string;
  age: number;
  dateJoined: string;  // ISO date format
  dateEnd: string;     // Added dateEnd field
  status: string;      // 'Payé', 'Non Payé'
}
interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

/** Static data for gym sessions */
const GYM_SESSIONS: GymSessionData[] = [
  { username: 'Mohamed Ali', age: 25, dateJoined: '2024-01-15', dateEnd: '2024-01-31', status: 'Payé' },
  { username: 'Achref Hamdi', age: 26, dateJoined: '2024-02-20', dateEnd: '2024-03-15', status: 'Mech rajel' },
  { username: 'Seif Zoghlami', age: 22, dateJoined: '2024-03-10', dateEnd: '2024-03-31', status: 'Payé' },
  { username: 'Oussam Hamdi', age: 28, dateJoined: '2024-04-05', dateEnd: '2024-04-30', status: 'Payé' },
  { username: 'Chichi Riahi', age: 35, dateJoined: '2024-05-12', dateEnd: '2024-06-12', status: 'Non Payé' },
  { username: 'Iheb Fouzai', age: 35, dateJoined: '2024-05-12', dateEnd: '2024-06-12', status: 'Non Payé' },
  // Add more data if needed
];

// Data structure to store monthly users and payments for each year
interface YearlyData {
  year: string;
  monthlyUsers: number[];
  monthlyPayments: number[];
}

const GYM_STATS: YearlyData[] = [
  {
    year: '2023',
    monthlyUsers: [100, 120, 130, 110, 90, 80, 150, 160, 170, 140, 130, 120],
    monthlyPayments: [5000, 6000, 6500, 5800, 4700, 4200, 7200, 7500, 8000, 6800, 6400, 6100]
  },
  {
    year: '2024',
    monthlyUsers: [110, 125, 135, 120, 95, 85, 155, 165, 175, 145, 135, 125],
    monthlyPayments: [5200, 6100, 6700, 6000, 4900, 4300, 7400, 7700, 8200, 6900, 6500, 6200]
  }
];

// Component configuration
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent {
  displayedColumns: string[] = ['username', 'age', 'dateJoined', 'dateEnd', 'status', 'actions']; // Added 'dateEnd'
  dataSource: MatTableDataSource<GymSessionData>;
  months = [
    { value: '2024', viewValue: '2024' },
    { value: '2025', viewValue: '2025' },
    { value: '2026', viewValue: '2026' }
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  // Variables for charts
  public salesOverviewChart!: Partial<any> | any;
  public yearlyChart!: Partial<any> | any;
  public monthlyChart!: Partial<any> | any;
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];
  public revenueBreakdownChart: Partial<any> | any;
  // Variable to store the selected year
  selectedYear: string = '2023';  // Default year selection


  constructor(private messageService: MessageService) {
    this.revenueBreakdownChart = this.initRevenueBreakdownChart();
    this.dataSource = new MatTableDataSource(GYM_SESSIONS);

    // Sales overview chart - updated to show users and payments data
    this.updateSalesOverviewChart(GYM_STATS[0].monthlyUsers, GYM_STATS[0].monthlyPayments);

    // Other charts initialization (can keep as they were)
    this.yearlyChart = this.initYearlyChart();
    this.monthlyChart = this.initMonthlyChart();
  }
  initRevenueBreakdownChart() {
    return {
      series: REVENUE_DATA.map(data => data.value),
      chart: {
        type: 'donut',
        height: 300,
      },
      labels: REVENUE_DATA.map(data => data.name),
      colors: ['#5D87FF', '#49BEFF', '#F9F9FD'],
      legend: { show: true },
      tooltip: { theme: 'light' },
    };
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

  // Function to update sales overview chart with new data
  updateSalesOverviewChart(users: number[], payments: number[]) {
    this.salesOverviewChart = {
      series: [
        {
          name: 'Number of Users',
          data: users,
          color: '#5D87FF',
        },
        {
          name: 'Total Payments ($)',
          data: payments,
          color: '#49BEFF',
        }
      ],
      chart: {
        type: 'bar',
        height: 390,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '35%', borderRadius: [4] }
      },
      xaxis: {
        categories: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
      },
      yaxis: [
        {
          title: { text: 'Number of Users' }
        },
        {
          opposite: true,
          title: { text: 'Total Payments ($)' }
        }
      ],
      stroke: {
        width: 3,
        colors: ['transparent']
      },
      tooltip: { theme: 'light' }
    };
  }

  // Year change handler to update the chart
  onYearChange() {
    const yearData = GYM_STATS.find(data => data.year === this.selectedYear);
    if (yearData) {
      this.updateSalesOverviewChart(yearData.monthlyUsers, yearData.monthlyPayments);
    }
  }

  // Initialize yearly chart (left as in the original)
  initYearlyChart() {
    return {
      series: [38, 40, 25],
      chart: {
        type: 'donut',
        height: 130
      },
      colors: ['#5D87FF', '#ECF2FF', '#F9F9FD'],
      plotOptions: {
        pie: {
          donut: { size: '75%' }
        }
      },
      stroke: { show: false },
      dataLabels: { enabled: false },
      legend: { show: false }
    };
  }

  // Initialize monthly chart (left as in the original)
  initMonthlyChart() {
    return {
      series: [{ name: '', color: '#49BEFF', data: [25, 66, 20, 40, 12, 58, 20] }],
      chart: { type: 'area', height: 60 },
      stroke: { curve: 'smooth', width: 2 },
      fill: { opacity: 0.05 }
    };
  }
  readonly dialog = inject(MatDialog);
  show(x:Event){
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '50%', // Adjust the width as needed
      maxWidth: '90vw', // Optional: Set a max width relative to viewport width
      height:'80%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
