import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent, data: { routeState: 1 } },
  { path: "about", component: AboutComponent, data: { routeState: 2 } },
  {
    path: "post/:id/:slug",
    loadChildren: "./post/post.module#PostModule",
    data: { routeState: 3 },
  },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
