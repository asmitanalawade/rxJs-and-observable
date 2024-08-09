import { Component, OnInit } from '@angular/core';
import { filter, forkJoin, map, Observable, of, tap, debounceTime, catchError, EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { fromEvent } from "rxjs";

interface NewsItem {
  category: 'Business' | 'Sports';
  content: string;
}

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit{

  ngOnInit(): void {

    /** Filter */

    const newsFeed$ = new Observable<NewsItem>(subscriber => {
      setTimeout(() => 
        subscriber.next({ category: 'Business', content: 'A' }), 1000);
      setTimeout(() => 
        subscriber.next({ category: 'Sports', content: 'B' }), 3000);
      setTimeout(() => 
        subscriber.next({ category: 'Business', content: 'C' }), 4000);
      setTimeout(() => 
        subscriber.next({ category: 'Sports', content: 'D' }), 6000);
      setTimeout(() => 
        subscriber.next({ category: 'Business', content: 'E' }), 7000);
    });
    
    const sportsNewsFeed$ = newsFeed$.pipe(
      filter(item => item.category === 'Sports')
    );
    
    newsFeed$.subscribe(
      item => console.log(item)
    );

    ///////////////////////////////////////////////////////

    /** map */

    const randomFirstName$ = ajax<any>('https://random-data-api.com/api/name/random_name').pipe(
      map(ajaxResponse => ajaxResponse.response.first_name)
    );

    const randomCapital$ = ajax<any>('https://random-data-api.com/api/nation/random_nation').pipe(
      map(ajaxResponse => ajaxResponse.response.capital)
    );

    const randomDish$ = ajax<any>('https://random-data-api.com/api/food/random_food').pipe(
      map(ajaxResponse => ajaxResponse.response.dish)
    );

    forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
      ([firstName, capital, dish]) =>
        console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`)
    );

/////////////////////////////////////////////////////////////////////////////

      /** tap */

    of(1, 7, 3, 6, 2).pipe(
      filter(value => value > 5),
      map(value => value * 2),
      tap({
        next: value => console.log('Spy:', value)
      }),
    ).subscribe(value => console.log('Output:', value));



      /////////////////////////////////////////////////////////////////////////////

      /** debounceTime */

      const sliderInput: any = document.getElementById('slider');

      fromEvent(sliderInput, 'input').pipe(
        debounceTime(2000),
        map((event: any) => event.target['value'])
      ).subscribe(value => console.log(value));


        /////////////////////////////////////////////////////////////////////////////

      /** catchError */


      const failingHttpRequest$ = new Observable(subscriber => {
        setTimeout(() => {
          subscriber.error(new Error('Timeout'));
        }, 3000);
      });
      
      console.log('App started');
      
      failingHttpRequest$.pipe(
        catchError(error => EMPTY)
      ).subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed')
      });












  }
}
