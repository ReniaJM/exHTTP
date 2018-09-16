import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

export class SpyInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('zapytanie wykonano:', new Date());
    console.log('zapytanie na adres:', req.url);
    return next.handle(req);
    // musi byc tutaj return aby request dalej poszedł
    // dodatkowo Iterceptor musimy umiescic w app.module
  }

}
