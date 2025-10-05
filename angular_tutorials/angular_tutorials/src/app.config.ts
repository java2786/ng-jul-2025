import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";

const myConfig:ApplicationConfig = {providers: [
    provideHttpClient(),
]}

export default myConfig;
