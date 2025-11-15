import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: [`app.component.scss`],
    imports: [RouterOutlet, RouterLink]
})
export default class AppComponent{
    
}