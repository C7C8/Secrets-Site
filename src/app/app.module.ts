import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, HComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReceivedKeyComponent } from './received-key/received-key.component';
import { SecretAnalysisComponent } from './secret-analysis/secret-analysis.component';

@NgModule({
  declarations: [
    AppComponent,
    HComponent,
    ReceivedKeyComponent,
    SecretAnalysisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ],
  entryComponents: [
    HComponent,
    ReceivedKeyComponent,
    SecretAnalysisComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
