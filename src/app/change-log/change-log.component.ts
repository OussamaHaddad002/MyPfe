import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.css']
})
export class ChangeLogComponent {
  public total = 123;
  public scope = 3;
  public resourcing = 2;
  public timeline = 1;
  tables: any[] = [];
  public changeForm!: FormGroup;

  newRow: any = {
    Type: '',
    Initiator: '',
    Date: '',
    Description: '',
    Impact: '',
    Cost: '',
    Status: ''
  };

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.tables = [
      {
        id: 1,
        data: [],
      }
    ];
  }

  // Function to add a new row to the table
  addRow() {
    const newRow = {
      Type: 'Fixed',
      Initiator: 'Developer',
      Date: '2023-05-18',
      Description: 'lorem ipsum',
      Impact: 'Timeline',
      Cost: 16,
      status: 'In_Progress'
    };

    this.tables[0].data.push(newRow);
  }

  addNew() {
    const table = this.tables[0]; // Assuming there is only one table
    table.isAddingNew = true;
    this.newRow = {
      Type: '',
      Initiator: '',
      Date: '',
      Description: '',
      Impact: '',
      Cost: '',
      status: ''
    };
  }



  saveNewRow(table: any) {
    // Add validation checks if required
    table.data.push({ ...this.newRow });
    table.isAddingNew = false;
    this.newRow = {
      Type: '',
      Initiator: '',
      Date: '',
      Description: '',
      Impact: '',
      Cost: '',
      status: ''
    };
  }


}
