import { CommonModule, NgClass, NgFor, } from '@angular/common';
import { Component, input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/authServe';


import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';



export interface TodoItem {
  taskName: string;
  dueDate: string;
  isCompleted: boolean;
  isEditable: boolean;
  itemId: number;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  toDoList: TodoItem[] = [];
  newTaskName: string = '';
  newDueDate: string = '';
  constructor( 
    private authService: AuthService) {
  }  

  newTags: string = '';
  selectedTodoItem: TodoItem | null = null;


  newTodoItem1: any = {
    "itemId": 0,
    "taskName": "",
    "taskDescription": "",
    "dueDate": "",
    "createdOn": "",
    "isCompleted": true,
    "tags": "string",
    "completedOn": ""
  }

  http = inject(HttpClient);
  isLogin = false;

  ngOnInit() {
    this.authService.currentLoginStatus.subscribe((status) => {
      this.isLogin = status; });
      if(this.isLogin){
        this.fetchTasks()
      }
      
  }



  addTask() {
    const existingTask = this.toDoList.find(task => task.taskName === this.newTaskName.trim() && task.dueDate === this.newDueDate.trim());
    if (existingTask) {
      alert("This task already exists.");
      return;
    } 
    if (this.newTaskName.trim() !== '' && this.newDueDate.trim() !== '' ) {
      const newTodoItem: TodoItem = {
        taskName: this.newTaskName,
        dueDate: this.newDueDate,
        isCompleted: false,
        isEditable: false,
        itemId: this.toDoList.length + 1
      };
      this.newTodoItem1.taskName = this.newTaskName;
      this.newTodoItem1.taskDescription = this.newTaskName;
      this.newTodoItem1.dueDate = this.newDueDate;
      this.newTodoItem1.createdOn = new Date().toISOString();
      this.newTodoItem1.tags = this.newTags
      this.newTodoItem1.completedOn = this.newDueDate;
      this.newTodoItem1.itemId = 0;
      this.newTodoItem1.isComplated = false;

      this.http.post("https://freeapi.miniprojectideas.com/api/JWT/CreateNewTask", this.newTodoItem1).subscribe((res: any) => {
        if (res.result === true) {
          // alert("Task created successfully!");
          // console.log("Task created successfully!")
          this.resetFields();
        } else {
          alert("Failed to create task. Please try again.");
        }
      }, error => {
        console.error("Error:", error);
        alert("An error occurred while creating the task.");
      });
      const url = 'https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList'
      this.http.get(url).subscribe((res: any) => {
        if (res && res.data) {
          const tasks = res.data;
          tasks.forEach((task: any) => {
            let fetchTodoItem: TodoItem = {
              taskName: task.taskName,
              dueDate: task.dueDate,
              isCompleted: task.isCompleted,
              isEditable: true,
              itemId: task.itemId
            };
          });
        }
      }, error => {
        console.error('Error fetching tasks:', error);
        alert('Failed to fetch tasks. Please try again later.');
      });


      this.toDoList.push(newTodoItem);
      this.resetFields();
    }
  }

  editTask(index: number) {
    this.toDoList[index].isEditable = true;
  }

 

  updateTask(index: number, updatedTask: Partial<TodoItem>) {
    const taskToUpdate = this.toDoList[index];
  

    if (taskToUpdate) {
      const updatePayload = {
        itemId: taskToUpdate.itemId,
        taskName: updatedTask.taskName || taskToUpdate.taskName,
        dueDate: updatedTask.dueDate || taskToUpdate.dueDate,
        isCompleted: updatedTask.isCompleted !== undefined ? updatedTask.isCompleted : taskToUpdate.isCompleted,
        taskDescription:  taskToUpdate.taskName, 
        createdOn: new Date().toISOString(), 
        tags:  "string", 
        completedOn: taskToUpdate.isCompleted ? new Date().toISOString() : "" 
      };
  
      this.http.put("https://freeapi.miniprojectideas.com/api/JWT/UpdateTask", updatePayload).subscribe(
        (res: any) => {
          if (res.result === true) {
            alert("Task updated successfully!");
            this.toDoList[index] = {
              ...taskToUpdate,
              ...updatedTask,
              isEditable: false 
            };
          } else {
            alert("Failed to update task. Please try again.");
          }
        },
        error => {
          console.error("Error updating task:", error);
          alert("An error occurred while updating the task.");
        }
      );
    }
  }
  

  resetFields() {
    this.newTaskName = '';
    this.newDueDate = '';
  }
  fetchTasks() {
    const url = 'https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList'
    this.http.get(url).subscribe((res: any) => {
      if (res && res.data) {
        const tasks = res.data;
        tasks.forEach((task: any) => {
          let fetchTodoItem: TodoItem = {
            taskName: task.taskName,
            dueDate: task.dueDate,
            isCompleted: task.isCompleted,
            isEditable: false,
            itemId: task.itemId
          };
          this.selectedTodoItem = fetchTodoItem;
          this.toDoList.push(fetchTodoItem);
          console.log(fetchTodoItem)
        });
      }
    }, error => {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks. Please try again later.');
    });
  }
  isComplated(index: number) {
    this.toDoList[index].isCompleted = !this.toDoList[index].isCompleted;
    // console.log(this.selectedTodoItem?.itemId)
  }
  deleteTask1(itemId: number) {
    const url = `https://freeapi.miniprojectideas.com/api/JWT/DeleteTask?itemId=${itemId}`;
    console.log(itemId)
    this.http.delete(url).subscribe((res: any) => {
      if (res && res.result) {
        // this.toDoList.splice(itemId, 1);
        this.toDoList = this.toDoList.filter(task => task.itemId !== itemId);
        console.log('Task deleted successfully');
      } else {
        alert('Failed to delete task');
      }
    }, error => {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again later.');
    });
    const url1 = 'https://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList'
    this.http.get(url1).subscribe((res: any) => {
      if (res && res.data) {
        const tasks = res.data;
        tasks.forEach((task: any) => {
          let fetchTodoItem: TodoItem = {
            taskName: task.taskName,
            dueDate: task.dueDate,
            isCompleted: task.isCompleted,
            isEditable: true,
            itemId: task.itemId
          };
        });
      }
    }, error => {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks. Please try again later.');
    });
  }

}
