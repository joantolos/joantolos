I am always trying to manifest the benefits of TDD (see: <a href="http://www.joantolos.com/blog/the-real-reason-why-you-dont-like-tdd/" target="_blank" alt="The real reason why you don't like TDD">The real reason why you don't like TDD</a> and <a href="http://www.joantolos.com/blog/tdd-all-in/" target="_blank" alt="TDD: All in">TDD: All in</a>). Most of the times when I find colleges that “can’t” do it right away it is because their software is not “TDD ready” meaning that it is difficult to test.
Solving that pitfall alone is going to improve your software because good code is easy to test, generally speaking.
That is why I create these “seeds” from time to time so people can clone a layout or template which is already “TDD ready”.
Of course this is going to depend on the system requirements, but I try to make examples with the most common needs.

I already did an approximation for Javascript <a href="http://www.joantolos.com/blog/6-tools-to-help-you-do-tdd-with-node-js/" target="_blank" alt="(6 tools to help you do TDD with NodeJS)">(6 tools to help you do TDD with NodeJS)</a> and now I am going to try for Java with Spring Cloud.

Technical requirements:

*  The microservice will register on eureka to consume data from other microservice
*  Also, it will have to consume data from an external api, not registered to eureka, like a third party service
*  It has to connect to a relational database to retrieve and store data.

These three technical requirements will force us to put some solutions in place in order to make tests comfortably:

*  It has to be able to mock responses from a service registered in Eureka
*  It has to be able to mock responses for the external API
*  We will have to deal with the connection to database on test execution

These kind of dependencies are just and example of what makes difficult to start with TDD. I always spend some time trying to set up a test friendly environment, making sure that I can add and modify tests easily.

I will also introduce a layout proposal that will allow us to test on several levels: acceptance, integration and performance.

# A little of business requirements

We have to build a REST API to deal with songs and song information. The Typical CRUD end points will be the following:

* POST add a song
* PUT Edit an existing song
* GET get info from a song
* GET get all songs info

These endpoints are going to make us implement INSERT, UPDATE and SELECT into our database access.

Then, some other end points to deal with the other services' connection:

* GET to get all the songs from a peer API connected to Eureka
* GET to get the lyrics from an existing song. The lyrics are provided from an external API

# Overview

![Overview](/assets/images/6ToolsToHelpYouDoTddWithJavaAndSpringCloud/kataSongsAPIOverview.png#postImageMedium)

We are going to deploy two instances of the same API, one dedicated to expose "generic" songs info and another just for country songs. This is just to illustrate consuming data from different microservices on your app but normally these service won't be just different instances of the same code. But, technically, it requires the same implementation so I am not creating a new different service just for that.

As proper microservices, each one of them has its own data domain, so a dedicated database containing the songs.

On the other hand, we have a third party provider that exposes songs lyrics from an artist and song name.

# Localhost pre requirements

Database and Eureka ready on local environment.

## Database

You need to run an instance of PostgresSQL on localhost:5432

You can download Postgres from: https://www.postgresql.org/

Once you run the Postgres server on your local machine, the values for default are:

* Host: localhost
* Database: postgres
* User: postgres
* Password: 123

Now you can connect with your Database IDE of choice (for this simple stuff I recommend <a href="https://dbeaver.io" target="_blank" alt="DBeaver">DBeaver</a>) and execute the following SQL script:

```javascript
DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
	name	VARCHAR(30) NOT NULL,
	artist	VARCHAR(30) NOT NULL,
	album	VARCHAR(30) NOT NULL,
	release_year	VARCHAR(30) NOT NULL
);

ALTER TABLE songs ADD CONSTRAINT p_songs PRIMARY KEY (name);

INSERT INTO songs (name, artist, album, release_year) VALUES('Yellow', 'Coldplay', 'Parachutes', '2000');
INSERT INTO songs (name, artist, album, release_year) VALUES('Master of puppets', 'Metallica', 'Master of puppets', '1986');
INSERT INTO songs (name, artist, album, release_year) VALUES('Cocaine', 'Eric Clapton', 'Slowhand', '1977');
```    

This will create the bare minimum for the app to work: just a songs table and three songs added.

## Eureka

Run an instance of eureka on localhost:8761

You can clone this code and run it: <a href="https://github.com/joantolos/kata-eureka-spring" target="_blank" alt="kata-eureka-spring repository">kata-eureka-spring repository</a>

    ./gradlew clean build

And then:

    ./gradlew bootRun

## Bypassing localhost requirements

You can skip setting up the database if you copy the configuration from the test environment to the production code environment. Test are using H2 as in-memory database (explained later on), so no external connection is required. If you configure your production code to use it, and uncomment the database creation script "createDatabase.sql" located on the resources file, you can get away without a Postgres instance on your localhost. Is not as accurate scenario as it would be with a real application, but I suppose it can do the trick.

You can ignore setting up your local eureka instance or

## Starting the service on localhost

Clone the repo <a href="https://github.com/joantolos/kata-songs-api" target="_blank" alt="kata-songs-api repository">kata-songs-api repository</a> and execute:

    ./gradlew clean build

This will build the code and also generate the coverage report. You will find the report on _kata-songs-api/build/reports/jacoco/rootReport/html/index.html_

You can run the SongsAPI class on your IDE or by console:

    java -jar kata-songs-api-src/build/libs/kata-songs-api-1.0.0.jar

This is a Spring Cloud application, so you can also run the Gradle task that comes from the plugin:

    ./gradlew bootRun

Then you can access the Swagger UI and test the endpoints:

http://localhost:8080/swagger-ui.html#/

![Overview](/assets/images/6ToolsToHelpYouDoTddWithJavaAndSpringCloud/swagger.png#postImageMedium)

**Remember:** You need to start Postgres and Eureka previously.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-construction-tools-hammer-screwdriver-wrench-tape-measure-paint-brush-wooden-background-space-copy-image55906387" target="_blank">55906387</a> © <a href="https://www.dreamstime.com/flynt_info" target="_blank">Flynt</a> | <a href="https://www.dreamstime.com/photos-images/tools.html" target="_blank">Dreamstime.com</a>_
* _<a href="http://www.joantolos.com/blog/the-real-reason-why-you-dont-like-tdd/" target="_blank" alt="The real reason why you don't like TDD">The real reason why you don't like TDD</a>_
* _<a href="http://www.joantolos.com/blog/tdd-all-in/" target="_blank" alt="TDD: All in">TDD: All in</a>_
* _<a href="http://www.joantolos.com/blog/6-tools-to-help-you-do-tdd-with-node-js/" target="_blank" alt="6 tools to help you do TDD with NodeJS">6 tools to help you do TDD with NodeJS</a>_
* _<a href="http://www.mock-server.com" target="_blank" alt="Mock Server">Mock Server</a>_
* _<a href="http://spockframework.org/" target="_blank" alt="Spock framework">Spock framework</a>_
* _<a href="https://cucumber.io/" target="_blank" alt="Cucumber framework">Cucumber framework</a>_
* _<a href="https://junit.org/junit4/" target="_blank" alt="JUnit framework">JUnit framework</a>_
* _<a href="https://gatling.io/open-source/" target="_blank" alt="Gatling">Gatling</a>_
* _<a href="https://www.heroku.com/platform" target="_blank" alt="Heroku">Heroku</a>_
