I am frequently doing posts about TDD and trying to facilitate code seeds with everything in  place to work with TDD, for example <a href="http://www.joantolos.com/blog/6-tools-to-help-you-do-tdd-with-java-and-spring-cloud" target="_blank" alt="here">here</a> or <a href="http://www.joantolos.com/blog/6-tools-to-help-you-do-tdd-with-node-js" target="_blank" alt="here">here</a>{

This time I want to provide a step-by-step guide for a microservice that will work with Java, Spring, Hibernate and Postgres that will be TDD ready from localhost all the way up to production. The challenge here, is to set up a comfortable way to test when dealing with a database and Spring.

These are the bullet points I want to cover:

* Regular plain JUnit Test
* Replicating Spring context on test
* Test using an in memory real database
* Test mocking the database results

With all of those examples you will be able to cover all your testing needs.

# Installing Postgres

First of all, we need to install Postgres. With a Mac computer, you can use HomeBrew:

    brew install postgres

Then, you need to create the folder PostgresData into your /Users/{your_user} folder:

    mkdir /Users/joan/PostgresData

Then, you set up the folder for Postgres to use it:

    initdb PostgresData/

Now you can start the database:

    pg_ctl -D PostgresData/ -l logfile start

Or stop it:

    pg_ctl -D PostgresData/ -l logfile stop    

# Setting up the database

Now, with the database started, you can type:

    psql postgres

And use the postgres CLI to interact with the database.

## Database, schema and user creation:

Using the Postgres CLI, you can create the user with the password and the database.

```javascript
CREATE USER kataspringdbapp WITH PASSWORD 'WHATEVER_PASSWORD_YOU_WANT';
CREATE DATABASE kataspringdblocal OWNER kataspringdbapp;
```

## Using DBeaver as a friendly way to interact with the local database

You can go on and use the CLI to create the table for the example to work, but at this point I recommend using a database tool like <a href="https://dbeaver.io/" target="_blank" alt="DBeaver">DBeaver</a>

Then you create a new connection with the following credentials:

* Host: localhost
* Port: 5432
* Database: kataspringdblocal
* Username: kataspringdbapp
* Password: WHATEVER_PASSWORD_YOU_USED_BEFORE

This credentials will be used on the configuration file for the Spring app. Once you are connected to the database, you can execute the script:

```javascript
CREATE TABLE users (
     username	VARCHAR(30) NOT NULL,
     password	VARCHAR(30) NOT NULL
);

INSERT INTO users (username, password) VALUES('luke', '123');
INSERT INTO users (username, password) VALUES('vader', '456');
INSERT INTO users (username, password) VALUES('yoda', '789');
```    

# Setting the code on localhost

First, clone the code: https://github.com/joantolos/kata-spring-db

    git clone https://github.com/joantolos/kata-spring-db.git

Then, build the code:

    ./gradlew clean build

# Securing your data

We are going to use a simple encryption library in Java to deal with the database password and the encryption of sensible data into the database. To do that, we need to get the password you created before, encrypted so we can safely put it into the properties file of the application. We are using <a href="http://www.jasypt.org/" target="_blank" alt="Jasypt">Jasypt</a> library to deal with the encryption. After building the code, you already have it on your machine. You need to locate the cddi-storage.zip on the folder /build/distributions of your local project. Then, unzip the package, inside the libs folder you will have the jar: jasypt-1.9.3.jar

Now, you have located your Jasypt jar that will help you encrypt your database password.

## Encrypting your database password

You need to create an scrambled string for your database password. Here is how you do it:

Locate the jasypt-1.9.3.jar on you machine after building the code and execute the encryption command:

    java -cp ~/jasypt-1.9.3.jar org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI input="WHATEVER_PASSWORD_YOU_USED_BEFORE" password="YOUR_SECRET_PHRASE" algorithm=PBEWITHMD5ANDDES

If everything goes well, you should see something like:

    ----ENVIRONMENT-----------------

    Runtime: Oracle Corporation Java HotSpot(TM) 64-Bit Server VM 25.251-b08

    ----ARGUMENTS-------------------

    algorithm: PBEWITHMD5ANDDES
    input: WHATEVER_PASSWORD_YOU_USED_BEFORE
    password: YOUR_SECRET_PHRASE

    ----OUTPUT----------------------

    xOCNEJG0UTpAm5xznOlD4yB7Etktr1cP+qXmD5ZFpic=

Take notice on the string you use as "YOUR_SECRET_PHRASE" which can be a random text. The library uses this text to encrypt and decrypt. You will have to configure this phrase on your application later on.

## Configure the encrypted password on the application.properties file

Now you can put your encrypted password into the /src/main/resources/application-local.properties between the brackets ENC(HERE)

Notice these two properties that Spring needs to use the Jasypt library:

    jasypt.encryptor.iv-generator-classname=org.jasypt.iv.NoIvGenerator
    jasypt.encryptor.algorithm=PBEWithMD5AndDES

# Starting the service on localhost

You need to set the environment variable _spring.profiles.active_ to local and _jasypt.encryptor.password_ to your secret phrase used before to encrypt the password. You can do it directly with the gradle task _bootRun_ that Spring provides by default.

    ./gradlew bootRun -Dspring.profiles.active=local -Djasypt.encryptor.password=YOUR_SECRET_PHRASE

## Playing with the API

Once you start the service, you can access Swagger to play with the available endpoints:

    http://localhost:8080/swagger-ui.html#/

This way you can see the three users inserted via the SQL script with the GET operation: _getUsers_ and also add new users, delete them etc.

# Project structure and tests cases

I am not going to go into detail about how JPA works. I am just going to match every test case scenario with the classes on the code, so you can take a look and use that scenario as example for other projects.

* End to end test: UserControllerTest
* Replicating Spring context on test: UserServiceTest
* Test using an in memory real database: UserServiceTest
* Test mocking the database results: GetUsersPageTest
* Plain JUnit test: SortTest

## End to end with real in memory data base

On the test _UserControllerTest_ you have an example of how to test an actual call to the API. Using MockMVC you can perform actual requests to the service and then make assertions, like this:

```javascript
this.mockMvc
            .perform(get("/users").param("username", "luke"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("luke"))
            .andExpect(jsonPath("$.password").value("123"));
```                

As you can see, we are doing a GET request to the endpoint "/users" with a username as a param and expecting the response to be OK and some actual values for user and password that coincide with what we inserted early on the in memory database.

Notice that this class extends InMemoryTestDataBase, that means that this test is going to go against the in memory H2 database configured. This class receives the location of an SQL script and execute it into the database. Then, on your test, you have to execute the creation database script at the beginning and the destroy script at the end. We do that on the Before and After phases of the unit test:

```javascript
@Before
public void setUp() throws IOException {
    this.executeStatement("/user/createUser.sql");
}

@After
public void tearDown() throws IOException {
    this.executeStatement("/user/dropUser.sql");
}
```    

That way you can create a dedicated specific database state for each unit test. There is no intention of replicating a database in memory that looks like the one in production but just create whatever specific tables and inserts you need to test whatever it is you want to test. That way, there is no need to "maintain" the in memory database or even keep it consistent with the one on production. Just create on the fly your relevant content and test your code.

Finally, in order to this script execution to work, the method that executes the script, in that case, the actual test, needs to be annotated as a transactional modifying operation in order for Spring to work:

```javascript
@Test
@Modifying
@Transactional
public void shouldGetAllUsers()
```    

## Unit test with real in memory data base

The example above is end to end. If you want to use the in memory database but test some specific code and not the whole API operation, you can use as example the test _UserServiceTest_ which uses the same extensions and techniques, but the asserts are more traditional, for example:

    Assert.assertEquals("123", userService.getUser("luke").getPassword());

This is very useful, because you can test specific methods with some data inside the database but you don't need to execute the whole operation to reach your expected results.

## Unit test with mocked results from data base

We have another scenario where you don't even need real data on the in memory database, but you can get away with your test just mocking some results. This is useful when you need to test features that require big size results from the database like pagination. To test the pagination, we could just insert on hundred users on the in memory database and then check that we get the proper pages, but that would mean to make a creation script with one hundred inserts... it's a bit ugly. Instead, we can just mock the response from the database when getting the list of users so we receive one hundred fake users and then test over that.

Take a look at the test _GetUsersPageTest_ which creates a dedicated list of one hundred users and then just serve it to the mock. Notice that there is no need to insert anything on the in memory database and no need to use the transactional annotations.

## Plain and simple JUnit test without any data base interaction

Finally, an example of simple JUnit test without need to create any Spring context or interaction with database of any kind. These are the most comfortable tests and the ones that you should try to use the most. The example is the class _SortTest_

# Test complexity hierarchy

These are the tests cases available from more complex and sophisticated, to more simple. You may want to choose the most simple case to test your feature, and if you need more resources, go up one step on the hierarchy:

1. End to end with real in memory database
2. Unit test with real in memory database
3. Unit test with mocked results from database
4. Plain and simple JUnit test without any database interaction

I believe that with all these examples, we can cover most (if not all) scenarios that we are going to face when creating a Spring service using JPA. Now you have all the tools ready to code with TDD.

# Deploying on Heroku

<a href="https://www.heroku.com" target="_blank" alt="Heroku">Heroku</a> is awesome. I use it for all of my little pet projects and every time that I try some need language or... well, everything that I do, I try to deploy it to production on <a href="https://www.heroku.com" target="_blank" alt="Heroku">Heroku</a>. That way I deal with the problems and difficulties of pushing the code to production environment and that makes the whole learning experience way more real. Everything works on localhost, always. When you have to deal with a real database and a real environment, you will face problems that will provide you very useful skills.

1. Create an account on Heroku if you don't already have one.
2. Create the app "kata-spring-db" (or any other name that you like but it will have to be consistent with the one on the code)
3. Add the Postgres add-on to your app. Heroku will provide you with the credentials to access to the database. Configure that "production" database on your DBeaver. Execute the creation script
4. Connect your app to your github repo where you have the code. You can configure it to build and deploy on every push. There are a lot of continuous delivery and integration that Heroku offers out of the box
5. Configure the way that your app starts. For a java service, this is the one: _web: java $JAVA_OPTS -jar build/libs/kata-spring-db*.jar_ This is defined on a Procfile on the root of your project.
6. Enjoy your code deployed on production

<a href="https://www.heroku.com" target="_blank" alt="Heroku">Heroku</a> offers a lot of cool features like logging, a bunch of add-ons and a lot of them go for free. Don't miss it.

## References:
* _Photo <a href="https://www.dreamstime.com/stock-photo-spring-scenery-pink-cherry-blossoms-panoramic-beautiful-bokeh-background-sun-blue-sky-image87381137" target="_blank">87381137</a> © <a href="https://www.dreamstime.com/smileus_info" target="_blank">Smileus</a> | <a href="https://www.dreamstime.com/photos-images/spring.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://github.com/joantolos/kata-spring-db" target="_blank" alt="GitHub code repository">GitHub code repository</a>_
* _<a href="https://www.heroku.com" target="_blank" alt="Heroku">Heroku</a>_
