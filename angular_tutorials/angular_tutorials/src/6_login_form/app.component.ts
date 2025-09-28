import { Component } from "@angular/core";
import { LoginForm } from "./components/login-form/login-form";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"],
    imports: [LoginForm]
})
export default class AppComponent{}
