import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiDataAnalysis } from '../../data';

@Component({
  selector: 'secrets-secret-analysis',
  templateUrl: './secret-analysis.component.html',
  styleUrls: ['./secret-analysis.component.scss']
})
export class SecretAnalysisComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ApiDataAnalysis, public ref: MatDialogRef<SecretAnalysisComponent>) { }

  close(): void {
    this.ref.close();
  }

}
