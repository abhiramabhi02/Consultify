import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-Services/user-services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css'],
})
export class ProListComponent implements OnInit {
  professionals: any
  role: string = '';

  constructor(
    private service: UserServicesService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParams()
    this.listAll()
  }

  getParams() {
    this.activeroute.params.subscribe((params) => {
      this.role = params['pro'];
      console.log(this.role, 'role');
      
    });
  }

  listAll() {
    let data = {
      role: this.role
    };

    this.service.professionalListing(data).subscribe((response: any) => {
      console.log(response, 'res');
      if (response.success) {
        this.professionals = response.pros;
      }
    });
  }
}
