import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'secrets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  secretControl = new FormControl('', [
    Validators.required
  ]);
  codeControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z0-9]{6}')
  ]);

  secret: string;
  code: string;

  constructor(private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  h(): void {
    this.dialog.open(HComponent);
  }

  new(): void {

  }

  add(): void {
  }

  anl(): void {
  }
}

@Component({
  selector: 'secrets-h',
  template: '<code>43fbcb37b4dc73c071b05fd5d66c6fc1302b8098</code>'
})
export class HComponent { }
