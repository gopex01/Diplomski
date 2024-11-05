import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MapComponent } from './map/map.component';
import { SearchTravelComponent } from './search-travel/search-travel.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'UserProfile',component:UserProfileComponent},
  {path:'Settings',component:SettingsComponent},
  {path:'mapa',component:MapComponent},
  {path:'searchTravel',component:SearchTravelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
