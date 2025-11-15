// console.log("in main file")

import { ApplicationConfig, Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
// import AppComponent from "./10_http_ajax/app.component";
import myConfig from "./app.config";
import AppComponent from "./12_service/app.component";
// import AppComponent from "./11_service/app.component";
// import AppComponent from "./9_backend_api/app.component";
// import AppComponent from "./8_login_form/app.component";
// import AppComponent from "./7_directives/app.component";
// import AppComponent from "./6_login_form/app.component";
// import AppComponent from "./5_calculator/app.component";
// import AppComponent from "./4_counter/app.component";
// import AppComponent from "./3_binding/app.component";
// import AppComponent from "./2_greet/app.component";
// import AppComponent from "./1_app/AppComponent";


// const myConfig:ApplicationConfig = {providers: []}
// bootstrapApplication(AppComponent, myConfig)

// bootstrapApplication(AppComponent);
bootstrapApplication(AppComponent, myConfig);
