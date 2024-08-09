import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatteningOperatorsComponent } from './flattening-operators.component';

describe('FlatteningOperatorsComponent', () => {
  let component: FlatteningOperatorsComponent;
  let fixture: ComponentFixture<FlatteningOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatteningOperatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatteningOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
