import {Component, OnInit} from '@angular/core';
import {BLOG} from '../../../config/config';
import {Blog, Category, Post} from '../../model/blog';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute) {
    this.page = 1;
    this.categoryParams = [];
    this.posts = this.getPostsFromConfig();
    this.recentPosts = this.posts.slice(0, BLOG.recentPostsMax);
  }

  private getPostsFromConfig() {
    return BLOG.posts.filter(post => post.active).sort((post1, post2) => {
      const date1 = new Date(post1.date);
      const date2 = new Date(post2.date);
      if (date1 > date2)      return -1;
      else if(date1 < date2)  return  1;
      else                    return  0;
    });
  }

  posts : Post[];

  recentPosts : Post[];
  categories : Category[] = [];
  page: number;
  categoryParams: string[];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.page = params['page'];
    });

    this.route.queryParams.subscribe(queryParams => {
      const category = queryParams['category'];
      if (category) this.categoryParams = category.split(',');
    });

    this.categories = this.getCategories(BLOG, this.categoryParams);

    this.filterByCategory()

    this.navigate();
  }

  getCategories(blog : Blog, categoryParams: string[]) : Category[]{
    const categories : Category[] = [];
    blog.posts.forEach(post => post.tags.forEach(tag => {
      const category = categories.find(category => category.name === tag);
      category ? category.count++ : categories.push({name: tag, count: 1, selected: categoryParams.includes(tag)});
    }));
    return categories;
  }

  selectPost(post: Post) {
    this.router.navigate(['/blog/' + post.id])
  }

  getPosts() {
    const start = (this.page * BLOG.pageSize) - BLOG.pageSize;
    const end = this.page * BLOG.pageSize;
    return this.posts.slice(start, end);
  }

  decrementPage() {
    this.page--;
    this.navigate();
  }

  incrementPage() {
    this.page++;
    this.navigate();
  }

  private navigate() {
    const totalPages = Math.ceil(this.posts.length/BLOG.pageSize);
    if (this.page < 1) this.page = 1;
    if (this.page > totalPages) this.page = 1;
    if (this.categoryParams.length > 0) {
      this.router.navigate(['/blog/page/' + this.page], { queryParams: { category: this.categoryParams.join(',') } });
    } else {
      this.router.navigate(['/blog/page/' + this.page], { queryParams: undefined });
    }
  }

  isPreviousDisabled() {
    return this.page == 1;
  }

  isNextDisabled() {
    const totalPages = Math.ceil(this.posts.length/BLOG.pageSize);
    return this.page == totalPages;
  }

  selectCategory(selected: Category) {
    selected.selected ? selected.selected = false : selected.selected = true;
    const categoryNamesSelected = this.categories.filter(category => category.selected).map(category => category.name);
    this.filterByCategory();
    this.scrollToTop();

    if (categoryNamesSelected.length > 0) {
      this.router.navigate(['/blog/page/1'], { queryParams: { category: categoryNamesSelected.join(',') } });
    } else {
      this.router.navigate(['/blog/page/1'], { queryParams: undefined });
    }
  }

  private filterByCategory() {
    const categoryNamesSelected = this.categories.filter(category => category.selected).map(category => category.name);
    const allActive = this.getPostsFromConfig();
    const selectedPosts : Post[] = [];
    allActive.forEach(post => {
      post.tags.forEach(tag => {
        if (categoryNamesSelected.includes(tag) && !selectedPosts.includes(post)) {
          selectedPosts.push(post)
        }
      })
    })

    if (selectedPosts.length > 0) this.posts = selectedPosts;
    else this.posts = allActive;
  }

  navigateToBlog() {
    this.posts = this.getPostsFromConfig();
    this.categories.forEach(category => category.selected = false);
    this.router.navigate(['/blog/page/1'], { queryParams: undefined });
    this.scrollToTop();
  }

  private scrollToTop() {
    (function smoothScroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}
