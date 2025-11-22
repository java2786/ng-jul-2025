import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routing";

const myConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(routes)
    ]
}

export default myConfig;
