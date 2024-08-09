import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationFunctionComponent } from './creation-function.component';

describe('CreationFunctionComponent', () => {
  let component: CreationFunctionComponent;
  let fixture: ComponentFixture<CreationFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationFunctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
