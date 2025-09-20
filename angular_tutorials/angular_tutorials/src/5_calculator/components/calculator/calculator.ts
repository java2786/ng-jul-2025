import { Component, input } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  result: string = "";
  isDotAvailable: boolean = true;

  update(event: any) {
    let inputValue: String = event.target.innerText;
    console.log("btn clicked: " + inputValue);

    if (inputValue == "=") {
      this.result = eval(this.result);
      if (!this.result) {
        this.result = "";
      }
    }
    else {
      if (inputValue == ".") {
        if (this.isDotAvailable) {
          this.result = this.result + inputValue;
          this.isDotAvailable = false;
        }
      } else {
        if(inputValue=='+'||
        inputValue=='-'||
        inputValue=='*'||
        inputValue=='/'){
          this.isDotAvailable = true;
        }
        if (this.result.length == 0 &&
          (inputValue == '+' ||
            inputValue == '-' ||
            inputValue == '*' ||
            inputValue == '/')) {
          // do nothing

        } else {
          this.result = this.result + inputValue;
        }
      }
    }


  }

  reset() {
    this.result = "";
  }
}
