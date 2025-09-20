import { Component } from "@angular/core";
import { Calculator } from "./components/calculator/calculator";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    imports: [Calculator]
})
export default class AppComponent{}
