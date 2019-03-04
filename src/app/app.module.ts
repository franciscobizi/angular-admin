//Angular core
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

//Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// App Routing Module
import { AppRoutingModule, routingComponents } from './app-routing.module';

//Componets
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersComponent } from './users/users.component';

//Services
import { UserService } from './shared/user.service';

//Interceptors and Guards
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthIntercepts } from './auth/auth.intercepts';
import { ProductsService } from './shared/products.service';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
//import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    LoginFormComponent,
    UsersComponent,
    ModalContainerComponent,
    ModalContentComponent,
    ModalContainerComponent, 
    ModalContentComponent, 
    ModalDeleteComponent, 
    PageNotFoundComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    NgbModalModule 
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthIntercepts,
    multi: true
  },AuthGuard, UserService, ProductsService],
  bootstrap: [AppComponent],
  entryComponents: [ ModalContentComponent, ModalDeleteComponent]
})
export class AppModule { }
