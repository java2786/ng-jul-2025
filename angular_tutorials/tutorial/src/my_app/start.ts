import { Component } from "@angular/core";

// decorator
@Component({
  selector: "app-root",
  template: "<h1>My App</h1>",
  styles: ['h1{text-align: center;color: red}']
})
export default class StartApp{
  constructor(){
    console.log("this is my first component");
  }
}
