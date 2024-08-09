import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  subscribe: Subscription = new Subscription;


  ngOnInit(): void {

    const observable$ = new Observable(subscribe => {
      subscribe.next('Alice');
      setTimeout(() => subscribe.next('Ben'), 2000);
      setTimeout(() => subscribe.next('charlie'),4000);
    });

    // const observer = {
    //   next: (value:any) => console.log(value)
    // }

    // observable$.subscribe(observer);

    this.subscribe = observable$.subscribe(value => console.log(value));

    /** For  multiple subscription => each subscription run independently. */ 
    
    // console.log('subscription start 1');
    // this.subscribe = observable$.subscribe(value => console.log('subscribe 1', value));

    setTimeout(() => {
      // this.subscribe = observable$.subscribe(value => console.log('subscribe 2', value));
    },1000);


    /** unsubscribe() ==> used for cancel the subscription */

    setTimeout(() => {
      this.subscribe.unsubscribe()
    }, 3000);
  }
 

}
