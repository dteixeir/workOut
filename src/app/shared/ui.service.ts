import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  _loadingStateChanged = new Subject<boolean>();

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showSnackBar(message, duration: null | number): void {
    const time: number = duration || 3000;

    this.snackBar.open(message, null, { duration: time });
  }
}
