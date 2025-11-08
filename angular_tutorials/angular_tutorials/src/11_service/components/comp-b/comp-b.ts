import { Component, inject } from '@angular/core';
import { Calc } from '../../calc';

@Component({
  selector: 'app-comp-b',
  imports: [],
  templateUrl: './comp-b.html',
  styleUrl: './comp-b.scss'
})
export class CompB {
  n1:number = 5;
  n2:number = 15;
  output:number = 20;

  calc:Calc = inject(Calc);

  setNum1(num:string){
    this.n1 = parseInt(num);
  }
  setNum2(num:string){
    this.n2 = parseInt(num);
  }

  doSumTask(){
    this.output = this.calc.add(this.n1, this.n2);
  }

}
