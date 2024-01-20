import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadUserComponent } from './components/user/read-user/read-user.component';
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ShopComponent } from './components/shop/shop.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReadAuthorityComponent } from './components/authority/read-authority/read-authority.component';
import { CreateAuthorityComponent } from './components/authority/create-authority/create-authority.component';
import { DeleteAuthorityComponent } from './components/authority/delete-authority/delete-authority.component';
import { ReadItemComponent } from './components/item/read-item/read-item-component';
import { DeleteItemComponent } from './components/item/delete-item/delete-item.component';
import { CreateItemComponent } from './components/item/create-item/create-item.component';
import { UpdateItemComponent } from './components/item/update-item/update-item.component';
import { UniquePipe } from './unique.pipe';
import { StockComponent } from './components/item/stock/stock.component';
import {NgOptimizedImage} from "@angular/common";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},

  {path: 'admin', component: AdminComponent},
  // Next paths belong to parent path "admin", so they all contain admin
  {path: 'admin/user/read', component: ReadUserComponent},
  {path: 'admin/user/read/create', component: CreateUserComponent},
  {path: 'admin/user/read/update', component: UpdateUserComponent},
  {path: 'admin/user/read/delete', component: DeleteUserComponent},

  {path: 'admin/authority/read', component: ReadAuthorityComponent},
  {path: 'admin/authority/read/create', component: CreateAuthorityComponent},
  {path: 'admin/authority/read/delete', component: DeleteAuthorityComponent},

  {path:'admin/item/read', component: ReadItemComponent},
  {path: 'admin/item/read/create', component: CreateItemComponent},
  {path: 'admin/item/read/update', component: UpdateItemComponent},
  {path: 'admin/item/read/delete', component: DeleteItemComponent},
  {path: 'admin/item/read/stock/:id', component: StockComponent},





]
@NgModule({
  declarations: [
    AppComponent,
    ReadUserComponent,
    ShopComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    AdminComponent,
    ReadAuthorityComponent,
    CreateAuthorityComponent,
    DeleteAuthorityComponent,
    ReadItemComponent,
    DeleteItemComponent,
    CreateItemComponent,
    UpdateItemComponent,
    UniquePipe,
    StockComponent,
    HomeComponent,
  ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgOptimizedImage,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
