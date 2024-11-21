import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MapComponent } from './map/map.component';
import { SearchTravelComponent } from './search-travel/search-travel.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ListPersonalTravelComponent } from './list-personal-travel/list-personal-travel.component';
import { PersonalTravelViewComponent } from './personal-travel-view/personal-travel-view.component';

const routes: Routes = [
  {path:'Login',component:LoginComponent},
  {path:'UserProfile',component:UserProfileComponent},
  {path:'Settings',component:SettingsComponent},
  {path:'mapa',component:MapComponent},
  {path:'searchTravel',component:SearchTravelComponent},
  {path:'',component:HomePageComponent},
  {path:'aboutUs',component:AboutUsComponent},
  {path:'personalTravels',component:ListPersonalTravelComponent},
  {path:'personalTravelView',component:PersonalTravelViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
