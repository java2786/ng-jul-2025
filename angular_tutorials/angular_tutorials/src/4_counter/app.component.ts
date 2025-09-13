import { Component } from "@angular/core";
import CounterComponent from "./counter.component";

@Component({
    selector: "app-root",
    templateUrl:"app.component.html",
    imports: [CounterComponent]
})
export default class AppComponent{

}