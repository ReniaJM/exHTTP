import {HttpHeaders, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";


export class AuthInterceptor implements HttpInterceptor{
  private headers = new HttpHeaders().set('Authorization', 'token');
  // tutaj jest token ale najpeije jakbysmy pobierali go z jakiegos serwisu, albo wstrzyknac przez kosntruktor
  intercept(req: HttpRequest<any>, next: HttpHandler):any {
// teraz musimu dobrac sie do naszego zapytnia, zmodyfikowac mu heders i wyslac dalej tam gdzie miała isc, nasze zapytanie nie mozemy zmodyfikowac, jest obiekt imutable, ale mmay dostep do metody clone, mozmey sklonowac wszytko co sie zanjduje w zapytaniu, czyli klonuje request i w trakcie klonowania chce mu podmienic headers, i ta nowa wersje zapyatnia wysyłamy na serwer, teraz kazda metoda ma token autoryzacyjny 
    const reqCloned = req.clone({headers: this.headers});
    return next.handle(reqCloned);
  }

}
// tzreba oamietac ze te informacje musza byc zaimportowane w app.module
