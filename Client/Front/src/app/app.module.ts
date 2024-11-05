import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/login.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SettingsComponent } from './settings/settings.component';
import { EffectsModule } from '@ngrx/effects';
import { userSettingsReducer } from './reducers/userSettings.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserSettingsEffects } from './effects/user.settings.effects';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogChangeEmailComponent } from './dialog-change-email/dialog-change-email.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { SearchTravelComponent } from './search-travel/search-travel.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    SettingsComponent,
    DialogErrorComponent,
    DialogChangeEmailComponent,
    MapComponent,
    SearchTravelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatDialogModule,
    GoogleMapsModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    StoreModule.forRoot({
      'auth':loginReducer,
      'settings':userSettingsReducer
    },{}),
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true // If set to true, the connection is established outside the Angular zone for better performance
    }),
    EffectsModule.forRoot(UserSettingsEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
