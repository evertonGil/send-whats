import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AddressService } from './services/address.service';
import { AuthTokenInterceptor } from './core/auth.interceptor';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { clientReducer } from './redux/reducers/client.reducer';
import { hydrationMetaReducer } from './redux/meta-reducers/hydrationMetaReducer';

export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ client: clientReducer }, {metaReducers})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    AuthService, 
    AddressService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
