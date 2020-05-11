import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WordpressService } from "../core/wordpress.service";
import { postsAnimation } from "../animation";

@Component({
  selector: "pb-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
  animations: [postsAnimation],
})
export class PostComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService
  ) {
    this.wordpressService.post$.subscribe((data) => {
      this.post = data;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.wordpressService.getPost(params.id);
    });
  }
}
