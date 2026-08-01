import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PostComponent} from './components/post/post.component';
import {BlogComponent} from './components/blog/blog.component';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {PodcastComponent} from './components/podcast/podcast.component';
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import {TermsAndConditionsComponent} from "./components/terms-and-conditions/terms-and-conditions.component";
import {CookiePolicyComponent} from "./components/cookie-policy/cookie-policy.component";
import { StoreComponent } from './components/store/store.component';
import { FinanceLoginComponent } from './components/finance-login/finance-login.component';
import { FinanceComponent } from './components/finance/finance.component';
import { AuthGuard } from './guards/auth.guard';
import { ExtrasComponent } from './components/extras/extras.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'blog/page/:page',
      component: BlogComponent
    },
    {
      path: 'blog',
      redirectTo: 'blog/page/1',
      pathMatch: 'full'
    },
    {
      path: 'blog/:id',
      component: PostComponent
    },
    {
      path: 'podcast',
      redirectTo: 'podcast/page/1',
      pathMatch: 'full'
    },
    {
      path: 'podcast/page/:page',
      component: PodcastComponent
    },
    {
      path: 'store',
      component: StoreComponent
    },
    {
      path: 'finance/login',
      component: FinanceLoginComponent
    },
    {
      path: 'finance',
      component: FinanceComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'extra',
      component: ExtrasComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'extras',
      component: ExtrasComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'privacy-policy',
      component: PrivacyPolicyComponent
    },
    {
      path: 'terms-and-conditions',
      component: TermsAndConditionsComponent
    },
    {
      path: 'cookie-policy',
      component: CookiePolicyComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ], {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
