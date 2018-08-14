import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})

export class ConfirmModalComponent {
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.title = data.title;
  }
}
