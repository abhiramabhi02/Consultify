import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, CategoryScale, LinearScale, Title } from 'chart.js';

interface AppointmentData {
  date: string;
  count: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  appointments: AppointmentData[] = [
    { date: '2023-08-01', count: 5 },
    { date: '2023-08-02', count: 8 },
    { date: '2023-08-03', count: 12 },
    // Add more appointment data here
  ];

  @ViewChild('appointmentChart', { static: true }) chartElement: ElementRef | undefined
  chart: any; // Use 'any' type for the chart

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = (this.chartElement!.nativeElement as HTMLCanvasElement).getContext('2d')!;
    console.log(ctx, 'ctx');
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.appointments.map(data => data.date),
        datasets: [
          {
            label: 'Appointments',
            data: this.appointments.map(data => data.count),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM DD',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Appointments Count',
            },
          },
        },
      },
      plugins: [Title, LinearScale, CategoryScale], // Add required plugins
    });
  }  
}
