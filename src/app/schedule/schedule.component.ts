import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Epic } from '../models/epic';
import { EpicService } from '../services/epic.service';
import {TableService} from "../services/table-service.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent{
  public total = 0;
  public planned = 0;
  public inprogress = 0;
  public delivered = 0;

  public epicNumber: number = 1;
  public tables: Epic[] = [];
  public nextEpicNumber: number = 1;
  public task: any = {}; // Declare the task property
  showForm: boolean = false;
  public epic: any = {};
  public taskForm!: FormGroup;

  @ViewChild('addTaskDialog') addTaskDialog!: TemplateRef<any>;
  @ViewChild('addEpicDialog') addEpicDialog!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private epicService: EpicService,
    private tableService: TableService
  ) {
    this.taskForm = this.formBuilder.group({
      action: ['', Validators.required],
      date: ['', Validators.required],
      effort: ['', Validators.required],
      status: ['', Validators.required],
      epic: ['', Validators.required],
    });
  }


  public addTask(): void {
    this.openAddTaskModal();
  }

  public addEpic(): void {
    this.openAddEpicModal();
  }

  public openAddTaskModal(): void {
    this.showForm = true;
    this.dialog.open(this.addTaskDialog);
  }

  public openAddEpicModal(): void {
    this.showForm = true;
    this.dialog.open(this.addEpicDialog);
  }

  public getStatusColorClass(status: string): string {
    if (status === 'Pending') {
      return 'status-pending';
    } else if (status === 'In_Progress') {
      return 'status-in-progress';
    } else if (status === 'Delivered') {
      return 'status-delivered';
    }
    return '';
  }

  public closeAddTaskModal(): void {
    this.showForm = false;
    this.dialog.closeAll();
  }

  public closeAddEpicModal(): void {
    this.showForm = false;
    this.dialog.closeAll();
  }

  public registerTask(): void {
    if (this.taskForm.invalid) {
      // Prevent registering the task if the form is invalid
      return;
    }

    const newTask = {
      description: this.taskForm.value.action,
      effort: this.taskForm.value.effort,
      status: this.taskForm.value.status,
      epic: {
        id: this.taskForm.value.epic,
      },
    };

    this.http.post('http://localhost:8080/actions', newTask).subscribe(
      (response) => {
        console.log('Task added successfully:', response);

        this.total++;
        if (newTask.status === 'Pending') {
          this.planned++;
        } else if (newTask.status === 'In_Progress') {
          this.inprogress++;
        } else if (newTask.status === 'Delivered') {
          this.delivered++;
        }

        this.taskForm.reset();

        const selectedEpicId = this.taskForm.value.epic;
        const tableIndex = this.tables.findIndex((table) => table.id === selectedEpicId);

        if (tableIndex !== -1) {
          const table = this.tables[tableIndex];
          table.data.push(newTask);
        }

        this.closeAddTaskModal();
      },
      (error) => {
        console.error('Failed to add task:', error);
      }
    );
  }

  public registerEpic(): void {
    const newEpic: Epic = {
      id: this.nextEpicNumber,
      name: this.epic.name,
      deadline: this.epic.deadline,
      data: []
    };

    this.http.post('http://localhost:8080/epics', newEpic).subscribe(
      (response) => {
        console.log('Epic added successfully:', response);
        this.nextEpicNumber++;
        this.epic = {};
        this.closeAddEpicModal();

        // Update the tables data using the TableService
        const currentTables = this.tables.slice();
        currentTables.push(newEpic);
        this.tableService.setTables(currentTables);
      },
      (error) => {
        console.error('Failed to add epic:', error);
      }
    );
  }




}
