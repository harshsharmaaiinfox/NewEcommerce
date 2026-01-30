import { Routes } from "@angular/router";
import { AuthGuard } from "./../../core/guard/auth.guard";
import { Error404Component } from './../../components/page/error404/error404.component';

export const content: Routes = [
  {
    path: "",
    loadChildren: () => import("../../components/themes/themes.module").then((m) => m.ThemesModule),
    title: 'FelunorWear Premium Mens and Womens Fashion Online'
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('../../privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
    title: 'Privacy Policy – How We Use Your Data | FelunorWear'
  },
  {
    path: 'return-policy',
    loadChildren: () =>
      import('../../return-exchange/return-exchange.module').then((m) => m.ReturnExchangeModule),
    title: 'Easy 7-Day Return Policy – Shop Risk-Free | FelunorWear'
  },
  {
    path: 'refund-and-cancellation',
    loadChildren: () =>
      import('../../refund-and-cancellation/refund-and-cancellation.module').then((m) => m.RefundAndCancellationModule),
    title: 'Refund & Cancellation Policy – Smooth Shopping | FelunorWear'
  },
  {
    path: "Contact-Us",
    loadChildren: () => import("../../contact-us/contact-us.module").then((m) => m.ContactUsModule),
    title: 'Contact FelunorWear – We’re Here to Help You 24/7'
  },
  {
    path: 'about-us',
    loadChildren: () => import('../../about-us-page/about-us-page.module').then(m => m.AboutUsPageModule),
    title: 'About Us | FelunorWear'
  },
  {
    path: 'term-condition',
    loadChildren: () =>
      import('../../term-condition/term-condition.module').then((m) => m.TermConditionModule),
    title: 'Terms & Conditions – Rules of Using FelunorWear'
  },
  {
    path: "shipping-policy",
    loadChildren: () => import("../../shipping-delevary/shipping-delevary.module").then((m) => m.ShippingDelevaryModule),
    title: 'Shipping & Delivery Information – Fast & Safe | FelunorWear'
  },
  {
    path: "auth",
    loadChildren: () => import("../../components/auth/auth.module").then((m) => m.AuthModule),
    canActivateChild: [AuthGuard],
    title: 'Login or Register Your FelunorWear Account Securely'
  },
  {
    path: "account",
    loadChildren: () => import("../../components/account/account.module").then((m) => m.AccountModule),
    canActivate: [AuthGuard],
    title: 'Manage Your Orders & Profile | FelunorWear Account'
  },
  {
    path: "",
    loadChildren: () => import("../../components/shop/shop.module").then((m) => m.ShopModule),
    title: 'Browse Fashion Clothing Categories – Shop Online | FelunorWear'
  },
  {
    path: "",
    loadChildren: () => import("../../components/blog/blog.module").then((m) => m.BlogModule),
    title: 'FelunorWear Blog – Latest Fashion News, Tips & Trends'
  },
  {
    path: "",
    loadChildren: () => import("../../components/page/page.module").then((m) => m.PagesModule),
    title: 'Explore FelunorWear Info Pages – Learn More About Us'
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component,
    title: '404 Error – Page Not Found | FelunorWear Fashion Store'
  }
];
