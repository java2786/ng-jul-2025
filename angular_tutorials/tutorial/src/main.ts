// console.log("hello");

import { ApplicationConfig, Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import StartApp from "./my_app/start";


const myConfig: ApplicationConfig = {providers: []}
bootstrapApplication(StartApp, myConfig)