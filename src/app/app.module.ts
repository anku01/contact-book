import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider
} from "angular-6-social-login";

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AddComponent } from './contacts/add/add.component';
import { ToastComponent } from './toast/toast.component';
import { HeaderComponent } from './header/header.component';


const appRoutes: Routes = [
	{ path: '', component: SigninComponent },
	{ path: 'contact/:id', component: AddComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'addContact', component: AddComponent },
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("46366196449-dfn3c7hgv8gdjmkt8tl8tqfnngk5uj8s.apps.googleusercontent.com")
        }
      ];
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ContactsComponent,
    AddComponent,
    ToastComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
  	{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
