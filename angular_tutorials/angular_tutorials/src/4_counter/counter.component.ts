import { Component } from "@angular/core";
import ButtonComponent from "./button.component";

@Component({
    selector: "app-counter",
    templateUrl: "counter.component.html",
    imports: [ButtonComponent]
})
export default class CounterComponent{
    number:number = 5;

    increment(){
        if(this.number<10){
            this.number = this.number + 1;
            console.log("after inc number: "+this.number)
        }
    }

    decrement(){
        if(this.number>0){
            this.number = this.number - 1;
        }
    }
    updateNumber(inputNumber:number){
        
            this.number = inputNumber;
        
    }

    reset(){
        this.number = 5;
    }
}