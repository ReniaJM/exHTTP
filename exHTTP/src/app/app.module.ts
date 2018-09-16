import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpService} from "./http-service";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SpyInterceptor} from "./spy.interceptor";
import {AuthInterceptor} from "./auth.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpyInterceptor,
      multi:true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
