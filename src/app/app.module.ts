import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    ThemeSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
