import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../environments/environment';
import { ApiMessage, ApiResponse } from '../data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReceivedKeyComponent } from './received-key/received-key.component';

@Component({
  selector: 'secrets-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  ngOnInit(): void {
  }

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

        // Clear the form completely if the operation succeeded. If it didn't, assume a faulty key and only reset
        // the key field.
        if (response.status === 'success') {
          this.secretControl.reset();
          this.keyControl.reset();
        } else {
          this.keyControl.reset();
        }
      });
  }

  anl(): void {
  }
}

@Component({
  template: '<code>43fbcb37b4dc73c071b05fd5d66c6fc1302b8098</code>'
})
export class HComponent { }
