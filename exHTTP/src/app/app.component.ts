import { Component } from '@angular/core';
import {HttpService} from "./http-service";
import {Post} from "./app.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/index";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exHTTP';

  allPosts$: Observable<Array<Post>>;

  // to jest observable typu observable

  constructor(private httpService: HttpService) {}

  getPosts() {
    this.allPosts$ = this.httpService.post$;
  }
  //   },
  //   // to jest druga funkcja z komunikatem błędu
  //     (error: HttpErrorResponse) => {
  //     console.log(error.status);
  //     }
  //   );
  //   // dzieki subskrypcji otzrymamy informacje w naszym komponnecie, opisujemy ja funkcja co chcemy z nia zrobic
  // }

  getPost() {
    this.httpService.getPost(1).subscribe(post => {
      console.log(post);
    });
  }

  getPostByUser() {
    this.httpService.getPostByUser(1).subscribe(posts => {
      console.log(posts);
    });

  }

  // to jest zapytanie POST
  addPost() {
    const p: Post = ({
      "userId": 1,
      "id": null,
      "title": 'moj post',
      "body": "pierwszy post w kochanym Angularze",
    });

    this.httpService.addPost(p).subscribe(post => {
      console.log(post);
    });

  }

  // pomieniamy/aktualizujemy post

  updatePost() {
    const p: Post = ({
      "userId": 1,
      "id": 1,
      "title": 'super',
      "body": "nowy wpis",
    });

    this.httpService.updatePost(p).subscribe(post => {
      console.log(post)
    });
  }

// usuwana post metoda DELETE
  deletePost() {
    this.httpService.deletePost(1).subscribe(post => {
      console.log(post)

    });
  }

// zmienia post metoda PATCH, różni sie tym od PUT ze zastepuje tylko czesc, jedna wartosc reszta pozostaje bez zmian

  changePost() {
    const p: Post = ({
      "id": 1,
      "body": "zmieniam tylko wpis",
    });
    this.httpService.changePost(p).subscribe(post => {
      console.log(post)
    });
  }
}

  export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}



 //
 // zapytanie PUT oznacza zastapienie znjadujaccego sie obiektu na serwerze w bazie danych lub twoerzenie nowego. Jesli mam post  i go zmodyfikuje to za pomoca PUT podmieni sie, ten post który  jest na serwerze
