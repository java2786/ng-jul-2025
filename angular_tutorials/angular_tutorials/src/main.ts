// console.log("in main file")

import { ApplicationConfig, Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import AppComponent from "./5_calculator/app.component";
// import AppComponent from "./4_counter/app.component";
// import AppComponent from "./3_binding/app.component";
// import AppComponent from "./2_greet/app.component";
// import AppComponent from "./1_app/AppComponent";


// const myConfig:ApplicationConfig = {providers: []}
// bootstrapApplication(AppComponent, myConfig)

bootstrapApplication(AppComponent);
