import { Injectable } from '@angular/core';
import {Post} from "./app.component";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs/index";

// HttpClient jest do zapytań http
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private postsObs= new BehaviorSubject<Array<Post>>([]);

  // tworzymy pole ktore przetrzymuje te wszystkie pobrane posty, to jest sposób operowania danymi aby móc przyjmować łątwo błędy itp, daj emozliwosc modyfikcji

  post$= this.postsObs.asObservable();

  // BehaviorSubject został zmieniony na Observable post$ ma dostęp już ogólny nie prywatny, post$ to jest serwis
// binduje sie w moim observable w komponencie do observable w serwisie, on juz te dane tam trzymał bo sie zaincjalizował  this.getPosts(); przy wywołąni http, po zbindowaniu od razu otrzymałąm dane allPosts$, które są wyswitlane za pomoca pipe asyc

  private headers = new HttpHeaders().set('Authorization', 'token');

  // zamiast doklejać do kazdej sciezki requesta {headers:this.headers} moze to zrobic authinterceptor bedzie doklejał sam

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  // pobieramy wszytskie posty link ze strony, zwraca cala listę postów
  // zwraca observable,
  //
  // to zapytanie zwroci listę postów do naszego komponentu, metoda GET

  getPosts(){
    // tutaj wczesniej był zwracany obervable
    return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts').subscribe(posts =>{
      // teraz tutaj przeszły posty i musimy je dalej wyslac do naszego aobserbale w app
      this.postsObs.next(posts);
      // posty sa pobierane bezposrednio i beda obsługiwane jakies błędy
       },err =>{
      console.log(err)
      }
    );

    // jak zminiło sie observe na response wtedy otrzymuje nie array ale obiekt typu response, teraz odpowiedzie z serweru nie jest jasonem, moze byc tez {responseType: 'text'} przy observable piszemy <any> i kasujemy <Response>, ogolnie metota get ma rozne opcje pokazywania danych z serwera metoda options
  }

  // zwraca jednego posta

  getPost(id:number): Observable<Post> {

    return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/' + id);

  }
 // pobieramy wszystkie posty usera podajac w parametrze jego userID, metoda GET
  getPostByUser(userId: number): Observable<Array<Post>>{
    const param = new HttpParams().set('userId', userId + '');
    return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts', {params: param
      // metodą get przekazujemy te params czyli parametr
    });
  }

  // dodajemy nowy post, to jest zapytanie POST

  addPost(post: Post): Observable<Post> {
  return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post)
// tutaj musimy podac parametr wywołania czyli post
  }

  // zmieniamy post, metoda PUT, dynamicznie przypisujemy IDposta, którego modyfikujemy i wysyłamy tego posta którego chemy zmodyfikowac
  updatePost(post:Post): Observable<Post>{
    return this.http.put<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);

  }
  // usuwamy post, jest podobny do zapytanie o jedngo posta
  deletePost(id:number): Observable<Post>{
    return this.http.delete<Post>('https://jsonplaceholder.typicode.com/posts/' + id);
  }
  changePost(post: Post): Observable<Post>{
    return this.http.patch<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);

  }

}

