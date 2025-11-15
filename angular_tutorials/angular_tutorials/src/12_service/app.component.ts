import { Component, inject } from "@angular/core";
import { CompA } from "./components/comp-a/comp-a";
import { CompB } from "./components/comp-b/comp-b";
import { Calc } from "./services/calc";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: [`app.component.scss`],
    imports: [CompA, CompB]
})
export default class AppComponent{
    myCalcService = inject(Calc)
}