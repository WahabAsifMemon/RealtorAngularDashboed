import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationComponent } from './notification/notification.component';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'home',
      //   component: HomeComponent,
      // },
      {
        path: 'terms&condition',
        component: TermsConditionComponent,
      },
      {
        path: 'privacy_policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'about_us',
        component: AboutUsComponent,
      },
      {
        path: 'notifications',
        component: NotificationComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'faqs',
        component: FaqsComponent,
      },
      {
        path: '**',
        redirectTo: 'notifications',
      },
      
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
