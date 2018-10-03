import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'secrets-received-key',
  templateUrl: './received-key.component.html',
  styleUrls: ['./received-key.component.scss']
})
export class ReceivedKeyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public key: string, public ref: MatDialogRef<ReceivedKeyComponent>) { }

  ngOnInit() {
  }

  close(): void {
    // Technique taken from a StackOverflow post, unfortunately...
    const keyBox = document.createElement('textarea');
    keyBox.style.position = 'fixed';
    keyBox.style.left = '0';
    keyBox.style.top = '0';
    keyBox.style.opacity = '0';
    keyBox.value = this.key;
    document.body.appendChild(keyBox);
    keyBox.focus();
    keyBox.select();
    document.execCommand('copy');
    document.body.removeChild(keyBox);
    this.ref.close();
  }
}
