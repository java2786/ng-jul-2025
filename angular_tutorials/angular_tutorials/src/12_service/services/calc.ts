import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Calc {
  data = {
    output: 0
  }
  
  add(x:number, y:number):void{
    console.log("in service- adding ")
    console.log(x+", "+y)
    this.data.output = x+y;
  }

}
