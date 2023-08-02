import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CountToModule } from 'angular-count-to';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { ImageModule } from 'src/app/image/image.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FaqsComponent } from './faqs/faqs.component';
import { PackageComponent } from './package/package.component';
@NgModule({
  declarations: [
    HomeComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    NotificationComponent,
    SettingsComponent,
    FaqsComponent,
    PackageComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    DashboardRoutingModule,
    CountToModule,
    ReactiveFormsModule,
    CKEditorModule,
    ImageModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
