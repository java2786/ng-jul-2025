import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from 'src/app/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count$:Observable<number>;


  constructor(private store: Store<{count : number}>) {
    this.count$ = store.pipe(select('count'));
  }

  increase(){
    this.store.dispatch(increment());
  }
  decrease(){
    this.store.dispatch(decrement());
  }
  reset(n:number=0){
    this.store.dispatch(reset(
    {
      payload: { num: n }
    }
    ));
  }

}
