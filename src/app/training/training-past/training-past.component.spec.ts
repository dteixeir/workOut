import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPastComponent } from './training-past.component';

describe('TrainingPastComponent', () => {
  let component: TrainingPastComponent;
  let fixture: ComponentFixture<TrainingPastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
