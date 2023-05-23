import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  public total = 123;
  public planned = 3;
  public inprogress = 2;
  public delivered = 1;

  public epicNumber: number = 1;
  public tables: any[] = [];
  public nextEpicNumber: number = 1;
  public task: any = {}; // Declare the task property
  showForm: boolean = false

  @ViewChild('addTaskDialog') addTaskDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog) {}

  public addTask(): void {
    this.openAddTaskModal();
  }

  public addEpic(): void {
    const newEpic = {
      id: this.nextEpicNumber,
      data: []
    };
    this.tables.push(newEpic);
    this.nextEpicNumber++;
  }

  public openAddTaskModal(): void {
    this.showForm = true;
    this.dialog.open(this.addTaskDialog);

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

  public registerTask(): void {
    const newTask = {
      action: this.task.action,
      date: this.task.date,
      effort: this.task.effort,
      status: this.task.status
    };

    const epic = Number(this.task.epic);
    const selectedEpic = this.tables.find(table => table.id === epic);
    if (selectedEpic) {
      selectedEpic.data.push(newTask);
    }

    this.task = {}; // Clear the task object
    this.closeAddTaskModal();
  }
}
