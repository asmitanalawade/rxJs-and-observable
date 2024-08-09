import { Component, OnInit } from '@angular/core';
import { forkJoin, from, fromEvent, Observable, of, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-creation-function',
  templateUrl: './creation-function.component.html',
  styleUrls: ['./creation-function.component.css']
})
export class CreationFunctionComponent implements OnInit{

  timeoutId: any;

  ngOnInit(): void {

    /** of() creation function */

      of('Alice', 'Ben', 'Charlie').subscribe({
        next: (value: any) => console.log(value),
        complete: () => console.log('complete')
      });

      // Hard coded
      ourOwnOf('a', 'b', 'c', 'd').subscribe({
        next: (value: any) => console.log(value),
        complete: () => console.log('complete')
      });

      function ourOwnOf(...args: string[]): Observable<string> {
        return new Observable<string>(subscriber => {
          for(let i = 0; i < args.length; i++) {
            subscriber.next(args[i])
          }
          subscriber.complete();
        });
      }

      ///////////////////////////////////////////////////////////////////////////////////

      /** from() */

      // Array
      from(['Asmita', 'Smita', 'Vikram']).subscribe({
        next: value => console.log('value', value),
        complete: () => console.log('Completed')
      });


      // Promises

      const somePromise = new Promise((resolve, reject) => {
        // resolve('Resolved!');
        reject('Rejected!!');
      });

      const observableFromPromise$ = from(somePromise);

      observableFromPromise$.subscribe({
        next: value => console.log(value),
        error: (err) => console.log(err),
        complete: () => console.log('Complete')
      })


       ///////////////////////////////////////////////////////////////////////////////////

      /** fromEvent() */

      const triggerButton = document.querySelector('button#trigger');

      // const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
      //   event => console.log(event.type, event.x, event.y)
      // );


      const triggerClick$ = new Observable<MouseEvent>(subscriber => {
        const clickHandlerFn = (event: any) => {
          console.log('Event callback executed');
          subscriber.next(event);
        };

        triggerButton?.addEventListener('click', clickHandlerFn);

        return () => {
          triggerButton?.removeEventListener('click', clickHandlerFn);
        };
      });

      const subscription = triggerClick$.subscribe(
        event => console.log(event.type, event.x, event.y)
      );

      setTimeout(() => {
        console.log('Unsubscribe');
        subscription.unsubscribe();
      }, 5000);


      ///////////////////////////////////////////////////////////////////////////////////

      /** timer */

      const timer$ = new Observable<number>(subscriber => {
        this.timeoutId = setTimeout(() => {
          console.log('initial observable');
          subscriber.next(0);
          subscriber.complete();
        }, 1000);

        return () => clearTimeout(this.timeoutId);
      });

      const subscrip = timer$.subscribe({
        next: value => console.log('val', value),
        complete: () => console.log('Completed!')
      })

      setTimeout(() => {
        subscrip.unsubscribe();
      }, 2000);


      ///////////////////////////////////////////////////////////////////////////////////

      /** interval */

      const interval$ = new Observable<number>(subscriber => {
        let counter = 0;
        
        const intervalId = setInterval(() => {
          // console.log('Timeout!');
          subscriber.next(counter++);
        }, 1000);

        return () => clearInterval(intervalId);
      });

      const subscri = interval$.subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed')
      });

      setTimeout(() => {
        subscri.unsubscribe();
        // console.log('Unsubscribe');
      }, 5000);


      ///////////////////////////////////////////////////////////////////////////////////

      /** forkJoin() */

      const randomName$ = ajax('https://random-data-api.com/api/name/random_name');

      const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');

      const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

      // randomName$.subscribe(ajaxResponse => console.log(ajaxResponse.response.first_name));
      // randomNation$.subscribe(ajaxResponse => console.log(ajaxResponse.response.capital));
      // randomFood$.subscribe(ajaxResponse => console.log(ajaxResponse.response.dish));

      forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
        ([nameAjax, nationAjax, foodAjax]) => {
          // console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`)
        });


     ///////////////////////////////////////////////////////////////////////////////////

      /** forkJoin() error */

      const a$ = new Observable(subscriber => {
        setTimeout(() => {
          subscriber.next('A');
          subscriber.complete();
        }, 5000);
      
        return () => {
          console.log('A teardown');
        };
      });
      
      const b$ = new Observable(subscriber => {
        setTimeout(() => {
          subscriber.error('Failure!');
        }, 3000);
        
        return () => {
          console.log('B teardown');
        };
      });
      
      forkJoin([a$, b$]).subscribe({
        next: value => console.log(value),
        error: err => console.log('Error:', err)
      });
      
  }
}
