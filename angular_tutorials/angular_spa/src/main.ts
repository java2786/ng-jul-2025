// console.log("in main file")

import { ApplicationConfig, Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
// import AppComponent from "./10_http_ajax/app.component";
import myConfig from "./app.config";
import AppComponent from "./13_spa/app.component";

bootstrapApplication(AppComponent, myConfig);
