import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ChangeService} from "../services/change.service";

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.css']
})
export class ChangeLogComponent implements OnInit{
  public total = 123;
  public scope = 3;
  public resourcing = 2;
  public timeline = 1;
  tables: any[] = [];
  public changes: any[] = [];
  isAddingNew: boolean = false; // Initialize the property


  public changeForm!: FormGroup;
  vari: any[]= [];
  newRow: any = {
    type: '',
    initiator: '',
    date: '',
    description: '',
    impact: '',
    cost: '',
    status: ''
  };
 scopePercentage: number =0;
 resourcingPercentage: number = 0;
 timelinePercentage: number= 0;
 costRate:number=0;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private changeService: ChangeService) {
    this.tables = [
      {
        id: 1,
        data: [],
      }
    ];
  }

  ngOnInit() {

    this.getChanges();
    this.fetchData(); // Call the fetchData method when the component initializes


  }

  getChanges() {
    this.http.get<any[]>('http://localhost:8080/changes').subscribe(
      (response) => {
        this.changes = response;
        console.log('Changes retrieved successfully:', this.changes);
      },
      (error) => {
        console.error('Failed to retrieve changes:', error);
      }
    );
  }

  fetchData() {
    this.changeService.getData().subscribe(
      (data: any[]) => {
        // Assuming there is only one table
        this.tables[0].data = data; // Assign the fetched data to the data property of the first table
        this.total = data.reduce((total, row) => total + row.cost, 0);

        //calculate data
        this.scope = data.filter(row => row.impact === 'Scope').length;
        this.resourcing = data.filter(row => row.impact === 'Resourcing').length;
        this.timeline = data.filter(row => row.impact === 'TimeLine').length;

        //calculate percentages
        const totalChanges = data.length;
        this.scopePercentage = (this.scope / totalChanges) * 100;
        this.resourcingPercentage = (this.resourcing / totalChanges) * 100;
        this.timelinePercentage = (this.timeline / totalChanges) * 100;
        const totalCost = data.reduce((sum, row) => sum + row.cost, 0);

        this.costRate = totalCost / totalChanges;
      },
      (error) => {
        console.error('Failed to fetch data:', error);
      }
    );
  }


  // Function to add a new row to the table
  addRow() {
    const newRow = {
      type: 'Fixed',
      initiator: 'Developer',
      date: '2023-05-18',
      description: 'lorem ipsum',
      impact: 'Timeline',
      cost: 16,
      status: 'In_Progress'
    };

    this.tables[0].data.push(newRow);
  }

  addNew() {
    this.isAddingNew = true
    const table = this.tables[0]; // Assuming there is only one table
    this.newRow = {
      type: '',
      initiator: '',
      date: '',
      description: '',
      impact: '',
      cost: '',
      status: ''
    };
  }

  saveNewRow(table: any) {


    // Add validation checks if required
    const newRow = { ...this.newRow, date: this.newRow.created_date }; // Update the property name to 'created_date'
    delete newRow.created_date;
    table.data.push(newRow); // Push the new row to table.data
    table.isAddingNew = false;

    // Send the new row data to the backend API
    this.http.post('http://localhost:8080/changes', { ...newRow }).subscribe(
      (response) => {
        console.log('Row added successfully:', response);

        this.fetchData();
      },
      (error) => {
        console.error('Failed to add row:', error);
      }
    );

    // Reset newRow object
    this.newRow = {
      type: '',
      initiator: '',
      createdDate: '',
      description: '',
      impact: '',
      cost: '',
      status: ''
    };

    this.isAddingNew=false;

  }




}
