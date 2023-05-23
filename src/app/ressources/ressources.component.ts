import { Component } from '@angular/core';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.css']
})
export class RessourcesComponent {
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
    status: ''
  };

  constructor() {
    this.tables = [
      {
        id: 1,
        data: []
      }
    ];
  }

  // Function to add a new row to the table
  addRow() {
    const newRow = {
      teamMember: 'John Doe',
      role: 'Developer',
      bu: 'ABC Company',
      regime: 'Standard',
      startDate: '2023-05-16',
      endDate: '2023-05-18',
      duration: '2 days',
      effort: '8 hours',
      status: 'In_Progress'
    };

    this.tables[0].data.push(newRow);
  }



  addNew(){
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
}
