import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableComponent } from './components/observable/observable.component';
import { ExcerciseComponent } from './components/excercise/excercise.component';
import { ColdObservableComponent } from './components/cold-observable/cold-observable.component';
import { HotObservableComponent } from './components/hot-observable/hot-observable.component';
import { CreationFunctionComponent } from './components/creation-function/creation-function.component';
import { OperatorsComponent } from './components/pipeable-operators/operators.component';
import { FlatteningOperatorsComponent } from './components/flattening-operators/flattening-operators.component';
import { SubjectsComponent } from './components/subjects/subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    ExcerciseComponent,
    ColdObservableComponent,
    HotObservableComponent,
    CreationFunctionComponent,
    OperatorsComponent,
    FlatteningOperatorsComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
