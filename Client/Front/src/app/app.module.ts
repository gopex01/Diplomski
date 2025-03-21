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
import { ImageEffects } from './effects/image.effects';
import { imageReducer } from './reducers/image.reducer';
import { DialogSuccessRegistrationComponent } from './dialog-success-registration/dialog-success-registration.component';
import { DialogLoginErrorComponent } from './dialog-login-error/dialog-login-error.component';
import { DialogSuccessChangedComponent } from './dialog-success-changed/dialog-success-changed.component';
import { DialogErrorReasonComponent } from './dialog-error-reason/dialog-error-reason.component';
import { DialogForgotPasswordComponent } from './dialog-forgot-password/dialog-forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RestAreasComponent } from './rest-areas/rest-areas.component';
import { ListRestAreasComponent } from './list-rest-areas/list-rest-areas.component';
import { PersonalTravelComponent } from './personal-travel/personal-travel.component';
import { ListPersonalTravelComponent } from './list-personal-travel/list-personal-travel.component';
import { PersonalTravelViewComponent } from './personal-travel-view/personal-travel-view.component';
import { MapForRestComponent } from './map-for-rest/map-for-rest.component';
import { KameraComponent } from './kamera/kamera.component';
import { CameraCalaComponent } from './camera-cala/camera-cala.component';
import { CameraKelebijaComponent } from './camera-kelebija/camera-kelebija.component';
import { CameraHorgosComponent } from './camera-horgos/camera-horgos.component';
import { CameraJabukaComponent } from './camera-jabuka/camera-jabuka.component';
import { CameraGostunComponent } from './camera-gostun/camera-gostun.component';
import { CameraBatrovciComponent } from './camera-batrovci/camera-batrovci.component';
import { CameraSidComponent } from './camera-sid/camera-sid.component';
import { CameraVatinComponent } from './camera-vatin/camera-vatin.component';
import { CameraKotromanComponent } from './camera-kotroman/camera-kotroman.component';
import { CameraZvornikComponent } from './camera-zvornik/camera-zvornik.component';
import { CameraRacaComponent } from './camera-raca/camera-raca.component';
import { CameraTrbusnicaComponent } from './camera-trbusnica/camera-trbusnica.component';
import { CameraVrskaCukaComponent } from './camera-vrska-cuka/camera-vrska-cuka.component';
import { CameraGradinaComponent } from './camera-gradina/camera-gradina.component';
import { CameraPresevoComponent } from './camera-presevo/camera-presevo.component';
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
    DialogSuccessRegistrationComponent,
    DialogLoginErrorComponent,
    DialogSuccessChangedComponent,
    DialogErrorReasonComponent,
    DialogForgotPasswordComponent,
    HomePageComponent,
    AboutUsComponent,
    RestAreasComponent,
    ListRestAreasComponent,
    PersonalTravelComponent,
    ListPersonalTravelComponent,
    PersonalTravelViewComponent,
    MapForRestComponent,
    KameraComponent,
    CameraCalaComponent,
    CameraKelebijaComponent,
    CameraHorgosComponent,
    CameraJabukaComponent,
    CameraGostunComponent,
    CameraBatrovciComponent,
    CameraSidComponent,
    CameraVatinComponent,
    CameraKotromanComponent,
    CameraZvornikComponent,
    CameraRacaComponent,
    CameraTrbusnicaComponent,
    CameraVrskaCukaComponent,
    CameraGradinaComponent,
    CameraPresevoComponent,
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
      'settings':userSettingsReducer,
      'image':imageReducer
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
    EffectsModule.forRoot(UserSettingsEffects,ImageEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
