import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Post} from "../../model/blog";
import {BLOG} from "../../../config/config";

@Component({
  selector: 'app-blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  blogPost$: Observable<any> | undefined;
  post: Post | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => this.post = BLOG.posts.find(post => post.id === params['id']));
  }

}
