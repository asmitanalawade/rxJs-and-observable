import { Component, OnInit } from '@angular/core';
import { fromEvent, map, Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  ngOnInit(): void {
    const emitButton:any = document.querySelector('button#emit');
    const inputElement: any = document.querySelector('#value-input');
    const subscribeButton:any = document.querySelector('button#subscribe');
    
    const value$ = new Subject<string>();
    
    fromEvent(emitButton, 'click').pipe(
      map(() => inputElement.value)
    ).subscribe(value$);
    
    fromEvent(subscribeButton, 'click').subscribe(
      () => {
        console.log('New Subscription');
        value$.subscribe(value => console.log(value));
      }
    );
  }
}
