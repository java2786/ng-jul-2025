import { Component, inject } from '@angular/core';
import { Calc } from '../../services/calc';

@Component({
  selector: 'app-comp-a',
  imports: [],
  templateUrl: './comp-a.html',
  styleUrl: './comp-a.scss'
})
export class CompA {
  calc = inject(Calc);

  addA(){
    this.calc.add(5, 10);
  }

}
