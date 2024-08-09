import { Component, OnInit } from '@angular/core';
import { ajax } from "rxjs/ajax";

@Component({
  selector: 'app-cold-observable',
  templateUrl: './cold-observable.component.html',
  styleUrls: ['./cold-observable.component.css']
})
export class ColdObservableComponent implements OnInit {

  ngOnInit(): void {

    const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name');
    
    ajax$.subscribe(
      data => console.log('Sub 1:', data.response.first_name)
    );
    
    ajax$.subscribe(
      data => console.log('Sub 2:', data.response.first_name)
    );
    
    ajax$.subscribe(
      data => console.log('Sub 3:', data.response.first_name)
    );
  }
}
