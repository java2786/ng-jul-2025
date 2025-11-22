import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  router = inject(Router);
  taskId:string = '0';
  update(value:string){
    this.taskId = value;
  }
  changeUrl(){
    this.router.navigate(['/tasks', this.taskId]); // /tasks/32
  }
}
