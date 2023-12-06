import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogComponent} from './blog.component';
import {Category} from '../../model/blog';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('Blog component', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ BlogComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories', () => {
    const testBlog : any = {
      "posts": [
        {"tags": ["code"]},
        {"tags": ["code","life"]},
        {"tags": ["code"]},
        {"tags": ["business","code"]},
        {"tags": ["code"]},
        {"tags": ["business"]},
        {"tags": ["life","business"]},
        {"tags": ["code"]},
        {"tags": ["code"]}
      ]
    };
    const expectedCategories : Category[] = [
      {
        name: "code",
        count: 7,
        selected: false
      },
      {
        name: "life",
        count: 2,
        selected: false
      },
      {
        name: "business",
        count: 3,
        selected: false
      }
    ];
    expect(component.getCategories(testBlog, [])).toEqual(expectedCategories);
  });
});
