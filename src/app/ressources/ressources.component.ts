import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.css']
})
export class RessourcesComponent implements OnInit {
  public total = 123;
  public manage = 3;
  public dev = 2;
  public support = 1;
  tables: any[] = []; // Initialize tables as an empty array

  newRow: any = {
    teamMember: '',
    role: '',
    bu: '',
    regime: '',
    startDate: '',
    endDate: '',
    duration: '',
    effort: '',
    Res: '',
  };

  //roles: string[] = ['TeamLead', 'PO', 'TeamMember', 'Designer'];
   projectManagementPercentage: number = 0;
   developmentPercentage: number = 0;
   supportPercentage: number = 0;

  constructor(private http: HttpClient) {
    this.tables = [
      {
        id: 1,
        data: []
      }
    ];


  }

  ngOnInit() {
    this.fetchData();
    this.fetchEffortData();
  }

  fetchData() {
    this.http.get('http://localhost:8080/resourcePlannings').subscribe(
      (response: any) => {
        console.log('Fetched data:', response);
        this.loadResources(response);
      },
      (error) => {
        console.error('Failed to fetch data:', error);
      }
    );
  }


  loadResources(data: any[]) {
    const table = this.tables[0]; // Assuming there is only one table
    table.data = data.map(resource => ({
      teamMember: resource.teamMember,
      role: resource.role,
      bu: resource.bu,
      regime: resource.regime,
      startDate: resource.startDate,
      endDate: resource.endDate,
      duration: resource.duration,
      effort: resource.effort,
      status: resource.status
    }));
  }

  // Function to add a new row to the table
  addRow() {
    const newRow = {
      teamMember: 'John Doe',
      role: 'Developer',
      bu: 'ABC Company',
      Regime: 'Standard',
      startDate: '2023-05-16',
      endDate: '2023-05-18',
      duration: '2 days',
      effort: '8 hours',
      status: 'In_Progress'
    };

    this.tables[0].data.push(newRow);
  }

  addNew() {
    const table = this.tables[0]; // Assuming there is only one table
    table.isAddingNew = true;
    this.newRow = {
      teamMember: '',
      role: '',
      bu: '',
      regime: '',
      startDate: '',
      endDate: '',
      duration: '',
      effort: '',
      status: ''
    };
  }

  saveNewRow(table: any) {
    // Add validation checks if required
    table.data.push({ ...this.newRow });
    table.isAddingNew = false;
    console.log(this.newRow)


    console.log(this.newRow)
    // Send the new row data to the backend API
    this.http.post('http://localhost:8080/resourcePlannings', this.newRow).subscribe(
      (response) => {
        console.log('Row added successfully:', response);
        console.log(this.newRow)
        this.fetchEffortData()
        this.fetchData()
      },
      (error) => {
        console.error('Failed to add row:', error);
      }
    );


    this.newRow = {
      teamMember: '',
      role: '',
      bu: '',
      Regime: '',
      startDate: '',
      endDate: '',
      duration: '',
      effort: '',
      status: ''
    };
  }


  fetchEffortData() {
    // Make an HTTP GET request to your API endpoint
    this.http.get('http://localhost:8080/resourcePlannings').subscribe((data: any) => {
      // Process the received data to calculate the efforts
      this.calculateEfforts(data);
    });
  }

  calculateEfforts(data: any) {
    // Assuming the API response is an array of resource objects containing the 'role' and 'effort' attributes
    const projectManagementRoles = ['TeamLead', 'ProductOwner'];
    const developmentRoles = ['TeamMember', 'Designer'];

    // Initialize the effort variables
    this.total = 0;
    this.manage = 0;
    this.dev = 0;
    this.support = 0;

    // Iterate over the received data and calculate the efforts
    data.forEach((resource: any) => {
      const role = resource.role;
      const effort = parseInt(resource.effort);

      this.total += effort;


      if (projectManagementRoles.includes(role)) {
        this.manage += effort;
      } else if (developmentRoles.includes(role)) {
        this.dev += effort;
      } else {
        this.support += effort;
      }

      this.projectManagementPercentage = (this.manage / this.total) * 100;
      this.developmentPercentage = (this.dev / this.total) * 100;
      this.supportPercentage = (this.support / this.total) * 100;
    });
  }
}
