import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../../modals/modal.module';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromTraining from '../training.reducer';

enum ButtonState {
  Stop = 'Stop',
  Done = 'Done'
}

@Component({
  selector: 'app-training-current',
  templateUrl: './training-current.component.html',
  styleUrls: [ './training-current.component.scss' ]
})

export class TrainingCurrentComponent implements OnInit {
  progress: number = 0;
  timer: number;
  isStopped: boolean;
  buttonText: string = ButtonState.Stop;

  constructor(
    private store: Store<fromTraining.State>,
    private trainingService: TrainingService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.continue();
  }

  continue() {
    this.store.select(fromTraining.getActiveExcersize)
      .pipe(take(1))
      .subscribe(excersize => {
      this.isStopped = false;
      const step = excersize.duration / 100 * 1000;

      this.timer = window.setInterval(() => {
        if (this.progress >= 100 || this.isStopped) {
          clearInterval(this.timer);
        } else {
          this.progress += 1;

          if (this.progress >= 100) {
            this.buttonText = ButtonState.Done;
          }
        }
      }, step);
    });
  }

  buttonClick() {
    this.isStopped = !this.isStopped;

    switch (this.buttonText) {
      case 'Done':
        this.trainingService.completeExcersize();
        break;

      case 'Stop':
      default:
        this.openModal();
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Are you sure?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      result ? this.trainingService.cancelExcersize(this.progress) : this.continue();
    });
  }
}
