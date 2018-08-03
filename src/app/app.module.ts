import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TramService } from './services/tram.service';

import { AppComponent } from './app.component';
import { ControlTramComponent } from './components/control-tram/control-tram.component';

const appRoutes: Routes = [
  {path: '', component: ControlTramComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ControlTramComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [TramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
