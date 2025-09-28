import { CommonModule, NgClass } from "@angular/common";
import { Component } from "@angular/core";
import { DirectivesDemo } from "./components/directives-demo/directives-demo";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    imports: [DirectivesDemo]
})
export default class AppComponent{


}
