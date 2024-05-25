import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './user/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginDialogComponent } from './shared/dialogs/login-dialog/login-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import { RegisterDialogComponent } from './shared/dialogs/register-dialog/register-dialog.component';
import {TokenInterceptor} from "./shared/interceptors/token.interceptor";
import { LcButtonComponent } from './shared/components/lc-button/lc-button.component';
import { LcInputComponent } from './shared/components/lc-input/lc-input.component';
import {ResetPasswordDialogComponent} from "./shared/dialogs/reset-password-dialog/reset-password-dialog.component";
import {ResetPasswordDialogWrapperComponent} from "./shared/dialogs/reset-password-dialog/wrapper/reset-password-dialog-wrapper.component";
import { LcLinkButtonComponent } from './shared/components/lc-link-button/lc-link-button.component';
import { LcHeaderComponent } from './shared/components/lc-header/lc-header.component';
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from "@angular/material/core";
import { LcFloatingButtonComponent } from './shared/components/lc-floating-button/lc-floating-button.component';
import { LcItemSectionComponent } from './shared/components/lc-item-section/lc-item-section.component';
import { ImageViewComponent } from './shared/dialogs/image-view/image-view.component';
import { ShopComponent } from './user/shop/shop.component';
import { LcSubheaderComponent } from './shared/components/lc-subheader/lc-subheader.component';
import { LcFilterSectionComponent } from './shared/components/lc-subheader/lc-filter-section/lc-filter-section.component';
import { LcDropdownComponent } from './shared/components/lc-dropdown/lc-dropdown.component';
import { LcBadgeComponent } from './shared/components/lc-badge/lc-badge.component';
import { LcDropdownSectionComponent } from './shared/components/lc-dropdown-section/lc-dropdown-section.component';
import { LcDropdownSectionContentComponent } from './shared/components/lc-dropdown-section/lc-dropdown-section-content/lc-dropdown-section-content.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    ResetPasswordDialogComponent,
    ResetPasswordDialogWrapperComponent,
    LcButtonComponent,
    LcInputComponent,
    LcLinkButtonComponent,
    LcHeaderComponent,
    LcFloatingButtonComponent,
    LcItemSectionComponent,
    ImageViewComponent,
    ShopComponent,
    LcSubheaderComponent,
    LcFilterSectionComponent,
    LcDropdownComponent,
    LcBadgeComponent,
    LcDropdownSectionComponent,
    LcDropdownSectionContentComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {
        disabled: true,
        animation: {
          enterDuration: 300,
          exitDuration: 0
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
