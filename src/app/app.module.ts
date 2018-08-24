import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatDialogModule } from '@angular/material';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { NewRequestFormComponent } from './new-request-form/new-request-form.component';
import { DemandsService } from './service/demands.service';
import { RequestListComponent } from './request-list/request-list.component';
import { ConfirmModalComponent } from './request-list/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NewRequestFormComponent,
    RequestListComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NoopAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    // MatButtonModule,
    // MatSliderModule
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  providers: [DemandsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
