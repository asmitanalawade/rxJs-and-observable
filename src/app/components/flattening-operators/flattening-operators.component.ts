import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, EMPTY, fromEvent, map, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-flattening-operators',
  templateUrl: './flattening-operators.component.html',
  styleUrls: ['./flattening-operators.component.css']
})
export class FlatteningOperatorsComponent implements OnInit {
  ngOnInit(): void {
      
    /** concat */

    const source$ = new Observable(subscriber => {
      setTimeout(() => subscriber.next('A'), 2000);
      setTimeout(() => subscriber.next('B'), 5000);
    });
    
    console.log('App has started');
    source$.pipe(
      concatMap(value => of(1, 2))
    ).subscribe(value => console.log(value));




    const endpointInput: any = document.querySelector('input#endpoint');
    const fetchButton:any = document.querySelector('button#fetch');

    fromEvent(fetchButton, 'click').pipe(
      map(() => endpointInput.value),
      concatMap(value =>
        ajax(`https://random-data-api.com/api/${value}/random_${value}`)
      ),
      catchError(() => EMPTY)
    ).subscribe({
      next: value => console.log(value),
      error: err => console.log('Error:', err),
      complete: () => console.log('Completed')
    });
  }
}
