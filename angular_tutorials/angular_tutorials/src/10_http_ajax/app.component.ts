import { Component } from "@angular/core";
import { AjaxDemo } from "./components/ajax-demo/ajax-demo";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    imports: [AjaxDemo]
})
export default class AppComponent{
    
}

// HttpclientModule -> HttpClient -> 