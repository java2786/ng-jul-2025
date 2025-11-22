// console.log("in main file")

import { ApplicationConfig, Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import myConfig from "./app.config";
import AppComponent from "./app/app.component";

bootstrapApplication(AppComponent, myConfig);
