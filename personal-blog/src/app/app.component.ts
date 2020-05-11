import { Component } from "@angular/core";

@Component({
  selector: "pb-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "personal-blog";
  getOutlet(o) {
    return o.activatedRouteData.routeState;
  }
}
