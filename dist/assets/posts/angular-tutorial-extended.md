If you follow the **<a href="https://angular.io/tutorial/" target="_blank">Angular tutorial</a>**, you will start building the **'Tour of Heroes'** App and learn the basics from Angular. I always struggle with front-end frameworks, so I decided to do the tutorial as we are switching to Angular 5 on my current project. I really recommend to do the tutorial.

Other than my usual struggle with Javascript, I have to say that TypeScript comes more natural and "logic" to me. The tutorial is pretty well-made and covers all the basics for a CRUD application that it can be used as **seed** for similar web applications.

# Fixing the tests

The problem that I found, is that the tutorial does not update the tests as you go along so the tests fail from minute one, once you do the first modification. The Angular documentation covers <a href="https://angular.io/guide/testing" target="_blank">Testing Strategy.</a> but much far along on the documentation, and it is not included on the tutorial.

I did update the tests as I went along the tutorial (my body itches if I don't) and I struggled with some difficulties that others may found:

Every time you create a component or a service following the tutorial, the Angular CLI creates as well the _'spec'_ file for each _ts_ file and also adds the new module/service at the NgModule on the app.module file. At the end of the tutorial, that file will look something like this:

```javascript
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    HeroService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

And here it comes the **first mod**, the Angular CLI adds the dependency on the app.module but doesn't at the _add.component.spec.ts_ which has the following tests by default:

```javascript
it('should create the app', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app).toBeTruthy();
}));

it(`should have as title 'Tour of Heroes'`, async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.debugElement.componentInstance;
  expect(app.title).toEqual('Tour of Heroes');
}));

it('should render title in a h1 tag', async(() => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  const compiled = fixture.debugElement.nativeElement;
  expect(compiled.querySelector('h1').textContent).toContain('Tour of Heroes');
}));
```

Please note the change on the name expected (Tour of Heroes) instead of the default 'Welcome app'. If you want those tests to run you should add the dependencies needed to it. All of them are included on the AppModule class, so you have to include here as well according to the tests needs. The final _beforeEach_ section of the tests will look like this:

```javascript
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [
      AppComponent,
      HeroesComponent,
      HeroDetailComponent,
      MessagesComponent,
      DashboardComponent,
      HeroSearchComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      RouterTestingModule.withRoutes([]),
      HttpClientModule
    ],
    providers: [
      HeroService,
      MessageService
    ]
  }).compileComponents();
}));
```

That way you are replicating the dependencies needed on the production code, but before each test execution. Notice one important change, **the trick number two:** On the main module you add the _RouterModule_ and on the test module you add the _RouterTestingModule._

You will have to repeat this operation for each pair, production/test code whether they are components or services. For example the production code for the Heroes component include this imports:

```javascript
import { Component, OnInit } from '@angular/core';
import { Hero } from "../../domain/hero";
import { HeroService } from '../../services/hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit { ... }
```

So, the test should include the following imports:

```javascript
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [
      HeroesComponent,
      HeroSearchComponent
    ],
    imports: [
      FormsModule,
      RouterTestingModule.withRoutes([]),
      HttpClientModule
    ],
    providers: [
      HeroService,
      MessageService
    ]
  })
  .compileComponents();
}));
```

Notice that you also have to import the **MessageService** because the HeroService has injected it on its constructor. So, you have to include all imports necessary for that code to work 'standalone'. That will make your test fail any time you add some new dependency but it assures the test to run independently.

Without adding any new tests, if you run

```javascript
ng test
```

You have to see the following:

![Tests passing](/assets/images/angularTutorialExtended/tests.png#postImageMedium)

These are the default tests _'should create'_ that the Angular CLI define, all passing. Doing this practice of adding the dependency on the test and keep them aligned with the production code, you can start coding TDD style right away.

## End-to-end Tests

The angular client creates a default app with some end-to-end testing framework set in place using <a href="http://www.protractortest.org/#/" target="_blank">Protractor.</a> The tests live on the folder e2e, and you can configure Protractor using the file _protractor.conf.js_. You will have to change again the application name, which is the default test defined:

```javascript
import { AppPage } from './app.po';

describe('angular-tour-of-heroes App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Tour of Heroes');
  });
});
```

This is a very cool feature overall because, how I see it, this could be used to define the **behaviour** of the application, or the BDD tests definition. And the other specific test spec will be the unit testing of that specific piece of code. Now you can add a new layer of abstraction to code meaningful tests from a product point of view.

To execute, just type:

    ng e2e

And if you modify the name of the application defined on the test, you can see the success:

![End to end tests](/assets/images/angularTutorialExtended/e2e.png#postImageBig)

# Using WebPack instead of Angular cli to make the build

Webpack is bundler for Javascript that uses a **dependency graph** to bundle all your assets (scripts, images, fonts, css). For this Tour of Heroes application, using Webpack is a little overkill because webpack is thought for complex applications with a lot of **non code static assets**. I plan to use this app as a seed of a much more complex app, so I will add Webpack at this point in time knowing that the team will benefit from it in the future.

In fact, as we can see on the ng serve, the Angular CLI uses webpack underneath:

![Angular using WebPack](/assets/images/angularTutorialExtended/angularUsingWebpack.png#postImageBig)

But explicitly adding the webpack configuration on your project, will allow to refine how to use it. I really recommend <a href="https://blog.andrewray.me/webpack-when-to-use-and-why/" target="_blank">this short article</a> to get a general idea of what Webpack does.

You can actually install the dependency of webpack on your _package.json_ and write the _webpack.config.js_ file which define how the build will be done, and it will work. But if you want webpack to do the same that the Angular CLI is doing, you can use:

    ng eject

Which will "eject" the _webpack.config.js_ file used by Angular CLI _as is_. Now you can tweak that file if you need, and bypass "the magic" that the angular CLI was doing.

# Deployment on Heroku

**<a href="http://www.heroku.com" target="_blank">Heroku</a>** is a Platform As A Service that lets you build and deploy apps in a very easy and direct way. I use Heroku for almost every proof of concept that I do, in fact, this very site is hosted there.

The original tutorial application used the Angular CLI to make the build and the deployment on your localhost. Then we have separated the webpack building process from the client, so we can run it independently. Now we have a way to run the build on Heroku.
But on the server side, you will need some embedded server to serve the pages. The most used is <a href="https://expressjs.com/" target="_blank">Express for NodeJS.</a> So, first of all let's include the dependency (and fix some others):

On your _package.json:_

```json
{
  "name": "angular-tour-of-heroes",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "test": "karma start ./karma.conf.js",
    "e2e": "protractor ./protractor.conf.js",
    "build": "webpack",
    "pree2e": "webdriver-manager update --standalone false --gecko false --quiet",
    "start": "node server.js",
    "postinstall": "webpack -p --progress"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^5.0.0",
    "@angular/cli": "^1.6.3",
    "@angular/compiler": "^5.0.0",
    "@angular/compiler-cli": "^5.0.0",
    "@angular/common": "^5.0.0",
    "@angular/core": "^5.0.0",
    "@angular/forms": "^5.0.0",
    "@angular/http": "^5.0.0",
    "@angular/platform-browser": "^5.0.0",
    "@angular/platform-browser-dynamic": "^5.0.0",
    "@angular/router": "^5.0.0",
    "angular-in-memory-web-api": "^0.5.2",
    "core-js": "^2.4.1",
    "css-loader": "^0.28.8",
    "express": "^4.16.2",
    "file-loader": "^1.1.6",
    "html-loader": "^0.5.4",
    "rxjs": "^5.5.2",
    "style-loader": "^0.19.1",
    "ts-loader": "^3.2.0",
    "ts-node": "~3.2.0",
    "tslint": "~5.7.0",
    "tslint-loader": "^3.5.3",
    "typescript": "~2.4.2",
    "webpack": "^3.10.0",
    "zone.js": "^0.8.14"
  },
  "devDependencies": {
    "@angular/language-service": "^5.0.0",
    "@types/jasmine": "~2.5.53",
    "@types/jasminewd2": "~2.0.2",
    "@types/node": "~6.0.60",
    "codelyzer": "^4.0.1",
    "jasmine-core": "~2.6.2",
    "jasmine-spec-reporter": "~4.1.0",
    "karma": "~1.7.0",
    "karma-chrome-launcher": "~2.1.1",
    "karma-cli": "~1.0.1",
    "karma-coverage-istanbul-reporter": "^1.2.1",
    "karma-jasmine": "~1.1.0",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.1.2",
    "webpack-dev-server": "~2.9.3",
    "webpack": "~3.10.0",
    "autoprefixer": "^6.5.3",
    "css-loader": "^0.28.1",
    "cssnano": "^3.10.0",
    "exports-loader": "^0.6.3",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.29.0",
    "less-loader": "^4.0.5",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.1.2",
    "raw-loader": "^0.5.1",
    "sass-loader": "^6.0.3",
    "source-map-loader": "^0.2.0",
    "istanbul-instrumenter-loader": "^2.0.0",
    "style-loader": "^0.13.1",
    "stylus-loader": "^3.0.1",
    "url-loader": "^0.6.2",
    "circular-dependency-plugin": "^4.2.1",
    "copy-webpack-plugin": "^4.1.1",
    "uglifyjs-webpack-plugin": "^1.1.5"
  },
  "engines": {
    "node": "7.5.0",
    "npm": "4.1.2"
  }
}
```

Please note the following changes/additions:

1. Moving angular client and compiler from _devDependecies_ to _dependencies_: Heroku will read the package.json and will recognise the application as a NodeJS App but will ignore the dependencies on development and only import the ones on dependencies.
1. Adding the express dependency.
1. Changes on the _scripts_ section:
1. The command _ng start_ that we used on localhost to run the application did both the start and the build of the code. Now we are going to use Express to start the app and Webpack to build it, so we need to explicit configure to use Webpack to do the build. This we do on the **postinstall** section like this: _"webpack -p --progress"_. Now Heroku will execute this command (the build) after the installation of the application.
   We have made the build, now we have to serve the pages.
2. The "start" section was set at _"ng start"_ but now we want to use Express to serve the application, so we change it to: _"start": "node server.js"_. Which simply tells to execute the _server.ts_ content. Now let's create that file:

```javascript
'use strict';
/*jshint esversion: 6 */
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080, function(){
  console.log('Server started at http://localhost:8080/');
});

app.get('/', function(req, res) {
  res.sendFile(require('path').join(__dirname + '/dist/index.html'))
});
```

This simple redirect all requests to _index.html_ which exists before the build on the _dist_ folder. Now, Heroku can run the command "node serve.ts" without problems. This is the actual application running on Heroku:

<a href="https://ng-tour-of-heroes-tutorial.herokuapp.com/" target="_blank">https://ng-tour-of-heroes-tutorial.herokuapp.com/</a>

Now on your localhost you can do the same thing that Heroku will do which is, run the build:

    webpack -p --progress

And then, serve the app:

    node server.ts

The app will deploy with the specifications of _server.ts,_ so you look for your app at: localhost:8080

# Adding the tests to the build

I like to add the test execution to the build when it does not take a long time, just to make sure that everyone on the team keep the tests updated. Using the Angular approach we can just run:

    karma start ./karma.conf.js

And the tests will run and pass. As you can see, a web browser (set as Chrome on the configuration file) will open and serve the tests results. This is useful to keep it running while developing because every time you save the code, the browser will refresh, and you can see right away if you broke something. But this approach is not good for running on the build because the browser will start listening and block everything else. In fact, the simple solution should be added this to the start script on the _package.json_:

    "start": "karma start && node server.js"

If you try it, you will see in fact, that the tests run but the browser blocks the execution so the build is never done. We need a way to configure <a href="https://karma-runner.github.io/2.0/index.html" alt="Angular Tutorial" target="_blank">Karma (the testing framework)</a> to use something else other than an actual browser to run the tests. This is where <a href="https://developers.google.com/web/updates/2017/04/headless-chrome" alt="Headless Chrome" target="_blank">Headless Chrome</a> comes into play.

We have to modify the _test_ script on the package.json module in order to use the Headless chrome:

    "test": "karma start --single-run --browsers ChromeHeadless karma.conf.js",

Now we can run the tests like:

    npm run tests

And the results will be printed on the console, which is suited for building the application. But we can still run:

    karma start

Which will open the whole Chrome, so you can continue developing and seeing the tests results on real time.

Now if you include the test run on the build script:

    "build": "webpack -p --progress && npm test"

And execute:

    npm run build

You will run the build, then the tests, and then you can start the application:

    npm run start

# Summary:

* We have completed the Angular tutorial.
* We have fixed the tests both unit and end to end.
* We have substitute angular cli for raw WebPack to build the application.
* We have deployed the application on Heroku
* We have included the tests on the build.

The code including all the modifications is available on my GitHub:

<a href="https://github.com/joantolos/angular-tour-of-heroes" target="_blank">https://github.com/joantolos/angular-tour-of-heroes</a>

# Thanks:

Special thanks to <a href="https://www.linkedin.com/in/pedromosquerat/" alt="Pedro Mosquera" target="_blank">Pedro Mosquera</a> who helped me a lot with Angular.

## References:

* _<a href="https://angular.io/tutorial/" alt="Angular Tutorial" target="_blank">Angular Tutorial</a>_
* _<a href="https://www.youtube.com/watch?v=0bOJjAUXjhI" alt="Deploy Angular CLI App to Heroku by Wes Doyle" target="_blank">Deploy Angular CLI App to Heroku by Wes Doyle</a>_
* _<a href="https://devcenter.heroku.com/articles/heroku-cli" alt="Heroku CLI" target="_blank">Heroku CLI</a>_
* _<a href="https://www.typescriptlang.org/" alt="TypeScript" target="_blank">TypeScript</a>_
* _<a href="https://blog.andrewray.me/webpack-when-to-use-and-why/" alt="Webpack: When to use and why" target="_blank">Webpack: When to use and why</a>_
* _<a href="https://devcenter.heroku.com/articles/heroku-ci-browser-and-user-acceptance-testing-uat" alt="Heroku CI: Browser and User Acceptance Testing (UAT)" target="_blank">Heroku CI: Browser and User Acceptance Testing (UAT)</a>_
