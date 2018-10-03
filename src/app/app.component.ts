import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../environments/environment';
import { ApiDataAnalysis, ApiMessage, ApiResponse } from '../data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReceivedKeyComponent } from './received-key/received-key.component';
import { SecretAnalysisComponent } from './secret-analysis/secret-analysis.component';

@Component({
  selector: 'secrets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  secretControl = new FormControl('', [
    Validators.required
  ]);
  keyControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Za-z0-9]{12}')
  ]);

  secret: string;
  key: string;

  constructor(private dialog: MatDialog, private http: HttpClient, private snackbar: MatSnackBar ) { }

  h(): void {
    this.dialog.open(HComponent);
  }

  new(): void {
    // Add a new secret
    const message: ApiMessage = { secret: this.secret };
    this.http.post<ApiResponse>(environment.url, message)
      .pipe(catchError((error: HttpErrorResponse): Observable<ApiResponse> => of(error.error)))
      .subscribe((response: ApiResponse) => {

        // Clear the user's secret, but only if the operation succeeded
        if (response.status === 'success') {
          this.dialog.open(ReceivedKeyComponent, { data: response.key, disableClose: true });
          this.secretControl.reset();
        } else {
          this.snackbar.open(response.message, '', {duration: 2500});
        }
      });
  }

  add(): void {
    // Add to existing secret
    const message: ApiMessage = { secret: this.secret, key: this.key };
    this.http.post<ApiResponse>(environment.url, message)
      .pipe(catchError((error: HttpErrorResponse): Observable<ApiResponse> => of(error.error)))
      .subscribe((response: ApiResponse) => {
        this.snackbar.open(response.message, '', {duration: 2500});

        // Clear the secret field if the operation succeeded. If it didn't, assume a faulty key and reset that field instead.
        if (response.status === 'success') {
          this.secretControl.reset();
        } else {
          this.keyControl.reset();
        }
      });
  }

  anl(): void {
    this.http.get<ApiDataAnalysis>(environment.url + '?key=' + this.key)
      .pipe(catchError((error: HttpErrorResponse): Observable<ApiResponse> => of(error.error)))
      .subscribe((response: ApiDataAnalysis) => {
        if (response.status === 'success') {
          this.dialog.open(SecretAnalysisComponent, {data: response});

          this.http.delete<ApiResponse>(environment.url + '?key=' + this.key)
            .pipe(catchError((error: HttpErrorResponse): Observable<ApiResponse> => of(error.error)))
            .subscribe((resp: ApiResponse) => {
              if (resp.status !== 'success') {
                this.snackbar.open('Failed to delete secret: ' + resp.message);
              }
            });
        } else {
          this.snackbar.open(response.message, '', {duration: 2500});
        }
      });
  }
}

@Component({
  template: '<code>43fbcb37b4dc73c071b05fd5d66c6fc1302b8098</code>'
})
export class HComponent { }
