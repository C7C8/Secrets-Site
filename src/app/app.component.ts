import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'secrets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  sha1(): void {
    this.dialog.open(HComponent);
  }
}

@Component({
  selector: 'secrets-h',
  template: '<code>43fbcb37b4dc73c071b05fd5d66c6fc1302b8098</code>'
})
export class HComponent { }
