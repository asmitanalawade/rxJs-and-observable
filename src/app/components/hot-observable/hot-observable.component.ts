import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hot-observable',
  templateUrl: './hot-observable.component.html',
  styleUrls: ['./hot-observable.component.css']
})
export class HotObservableComponent implements OnInit{

  ngOnInit(): void {
      const helloButton =  document.getElementById('hello');
      // const helloButton = document.querySelector('button#hello');

      const helloButton$ = new Observable<MouseEvent>(subscriber => {
        helloButton?.addEventListener('click', (event: MouseEvent) => {
          subscriber.next(event);
        });
      });

      helloButton$.subscribe(event => console.log('sub1:', event.type, event.x, event.y));
      helloButton$.subscribe(event => console.log('sub2:', event.type, event.x, event.y));
  }
}
