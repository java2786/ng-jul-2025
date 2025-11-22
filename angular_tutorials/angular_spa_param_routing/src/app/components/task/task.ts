import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  activatedRoute = inject(ActivatedRoute);
  taskId:string = "unknown";
  constructor(){}
  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (paramObj)=>{
        console.log(paramObj)
        // this.taskId = paramObj.id;
        this.taskId = paramObj['id'];
      }
    )
  }
}
