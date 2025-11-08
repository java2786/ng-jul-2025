import { Component } from "@angular/core";
import { CompB } from "./components/comp-b/comp-b";
import { CompA } from "./components/comp-a/comp-a";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: [`app.component.scss`],
    imports: [CompA, CompB]
})
export default class AppComponent{

}