
// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { authGuard } from './demo/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' 

  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard], 
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        redirectTo: 'temperature-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'temperature-dashboard',
        loadComponent: () => import('./demo/Project/temperature-dashboard/temperature-dashboard.component').then(m => m.TemperatureDashboardComponent),
        canActivate: [authGuard], 
      },
      // {
      //   path: 'dashboard',
      //   loadComponent: () => import('./demo/Project/dashboard/dashboard.component').then(m => m.DashboardComponent)
      // },
      {
        path: 'user',
        loadComponent: () => import('./demo/Project/user/user.component').then(m => m.UserComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'location-dashboard',
        loadComponent: () => import('./demo/Project/location-dashboard/location-dashboard.component').then(m => m.LocationDashboardComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'location',
        loadComponent: () => import('./demo/Project/location/location.component').then(m => m.LocationComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'assets',
        loadComponent: () => import('./demo/Project/assets/assets.component').then(m => m.AssetsComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'asset-list',
        loadComponent: () => import('./demo/Project/asset-list/asset-list.component').then(m => m.AssetListComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'ble',
        loadComponent: () => import('./demo/Project/ble/ble.component').then(m => m.BleComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'rule',
        loadComponent: () => import('./demo/Project/rule/rule.component').then(m => m.RuleComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'apply-rule',
        loadComponent: () => import('./demo/Project/apply-rule/apply-rule.component').then(m => m.ApplyRuleComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'report',
        loadComponent: () => import('./demo/Project/report/report.component').then(m => m.ReportComponent),
        canActivate: [authGuard], 
      },
      
     
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [authGuard], 
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component'),
        canActivate: [authGuard], 
      },
      // //new change
      // {
      //   path: 'location',
      //   loadComponent: () => import('./demo/location/location.component')
      // },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component'),
        canActivate: [authGuard], 
      },
      
      
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component'),
        canActivate: [authGuard], 
      },
      {
        path: 'display-asset/:siteId/:locationId',
        loadComponent: () => import('./demo/Project/display-asset/display-asset.component').then(m => m.DisplayAssetComponent),
        canActivate: [authGuard], 
      },

      {
        path: 'movement-detail/:assetId/:fromDate/:toDate',
        loadComponent: () => import('./demo/Project/movement-detail/movement-detail.component').then(m => m.MovementDetailComponent),
        canActivate: [authGuard], 
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component'),
         canActivate: [authGuard], 
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
