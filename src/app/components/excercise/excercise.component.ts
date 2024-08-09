import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.css']
})
export class ExcerciseComponent implements OnInit{
  subscribe: Subscription = new Subscription;

  ngOnInit(): void {
       
    const observable$ = new Observable<string>(subscriber =>  {
      subscriber.next('Alice');
      subscriber.next('Charlie');
      setTimeout(() => {
        subscriber.next('Ben');
        // subscriber.complete();
      }, 2000);
      // setTimeout(() => subscriber.complete(), 3000);
      setTimeout(() => subscriber.error(new Error('Failure')), 4000);
      return () => {
        console.log('TearDown');
      }
    });

    this.subscribe = observable$.subscribe({
      next: value => console.log('value', value),
      error: (err) => console.log(err.message),
      complete: () => console.log('completed'),
      
    });

    setTimeout(() => {
      this.subscribe.unsubscribe();
    }, 7000);
  }
}
