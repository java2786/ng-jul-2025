import { Component } from "@angular/core";

// component = logic + view (html+css)
@Component({
  selector: "app-root",
  // view
  template: "<h1>Hello App</h1>",
  styles: [
    `h1{text-align: center;}`
  ]
})
export default class AppComponent{
  // logic
  constructor(){
    console.log("In app component")
  }

}