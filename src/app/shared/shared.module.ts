import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputControlComponent } from './input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputIconComponent } from './input-icon/input-icon.component';
import { MultiInputListComponent } from './multi-input-list/multi-input-list.component';
import { InputRefDirective } from './input-control/input-ref.directive';
import { PhoneValidator } from './validators/telefone-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InputControlComponent,
    InputIconComponent,
    MultiInputListComponent,
    InputRefDirective,
    PhoneValidator
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InputControlComponent,
    MultiInputListComponent,
    InputRefDirective,
    PhoneValidator
  ]
})
export class SharedModule { }
