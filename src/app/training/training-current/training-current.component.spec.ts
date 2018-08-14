import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCurrentComponent } from './training-current.component';

describe('TrainingCurrentComponent', () => {
  let component: TrainingCurrentComponent;
  let fixture: ComponentFixture<TrainingCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
