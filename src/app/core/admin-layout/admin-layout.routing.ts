import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { ImportOrdersComponent } from '../../pages/import-orders/import-orders.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { SendMessageComponent } from 'src/app/pages/send-message/send-message.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'send-message',         component: SendMessageComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'import-orders',  component: ImportOrdersComponent }
];
