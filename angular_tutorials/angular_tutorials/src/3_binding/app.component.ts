import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    // template: `
    // <h1>Greet Component</h1>
    // <h3>I am {{name}} from {{address}}.</h3>
    // `,
    templateUrl: "app.component.html",
    styleUrls: [`app.component.scss`]
})
export default class AppComponent{
    name:String = "Mukesh";
    address:String = "Pune";

  greet(val:String){
    console.log("Input is "+val);
    this.name = val;
  }

}