import { Component, inject } from '@angular/core';
import { Calc } from '../../services/calc';

@Component({
  selector: 'app-comp-b',
  imports: [],
  templateUrl: './comp-b.html',
  styleUrl: './comp-b.scss'
})
export class CompB {
  calc = inject(Calc);

  sumB(){
    this.calc.add(6,2);
  }
}
