I have been wanting to use Kotlin for a while now. Some colleges that I deeply respect don't stop recommending it and I finally allocated some time to play around a little bit.

To test this new language (new to me, anyway) I want to try and implement something familiar to me so I don't have to bother with the domain or anything. I am going to implement the same REST API that I did with Java sometime ago. You can find the explanation here: http://www.joantolos.com/blog/java-spring-and-hibernate-microservice-seed/

To sum up, these are the bullet points of that piece of software that I want to maintain with this new implementation with Kotlin:

- API resources for **get**, **add**, **delete** and **update** users from a database. A user is a simple entity that contains a user name and a password
- Swagger interface to easily interact with the API and manually test it
- Configuration of a local Postgres database to mess around with a real database content on local development environments
- Acceptance tests for CRUD operations of the API, loading the proper Spring test context
- Using an in-memory database for testing
- Regular plain old JUnit tests without the need of the whole Spring context
- Configuration of a remote production environment Postgres database
- Deployable directly to Heroku as production environment once a push is made to the repository
- Test coverage report created by default on build

That is a list of features that I want to have on a regular REST API. If I reach all of those points, I am comfortable coding with it and adding any feature needed. So, let's start.

# Following the tutorials

Right from Kotlin's page, there are a couple of tutorials that guide you to create a simple RESTful web service with Spring boot and also adding it the database capability. For the example, it uses the in-memory H2 database that I will substitute later with Postgres.

- <a href="https://kotlinlang.org/docs/jvm-spring-boot-restful.html" target="_blank" alt="Create a RESTful web service with Spring Boot – tutorial">Create a RESTful web service with Spring Boot – tutorial</a>
- <a href="https://kotlinlang.org/docs/jvm-spring-boot-restful-db.html" target="_blank" alt="Add a database to a Spring Boot RESTful web service – tutorial">Add a database to a Spring Boot RESTful web service – tutorial</a>

If you follow the tutorials, you will end up with a simple entity "Message" that can be inserted and reach from the database. For my example, I don't want to store messages but users, so I am going to change the sql schema script for this one:

```javascript
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	username	VARCHAR(30) NOT NULL,
	password	VARCHAR(30) NOT NULL
);

INSERT INTO users (username, password) VALUES('luke', '123');
INSERT INTO users (username, password) VALUES('vader', '456');
INSERT INTO users (username, password) VALUES('yoda', '789');
```

If we keep making changes from Message to User, we will end up with a controller looking like this:

```javascript
@RestController
class UserResource(val userService: UserService) {

    @RequestMapping(value = ["/users"], method = [RequestMethod.GET])
    @ResponseStatus(HttpStatus.OK)
    fun getUsers(): List<User> = userService.getUsers()

    @RequestMapping(value = ["/users"], method = [RequestMethod.POST])
    @ResponseStatus(HttpStatus.CREATED)
    fun addUser(@RequestBody user: User) = userService.addUser(user)

    @RequestMapping(value = ["/users"], method = [RequestMethod.DELETE])
    @ResponseStatus(HttpStatus.ACCEPTED)
    fun deleteUser(@RequestBody user: User) = userService.deleteUser(user)

    @RequestMapping(value = ["/users"], method = [RequestMethod.PUT])
    @ResponseStatus(HttpStatus.CREATED)
    fun updateUser(@RequestBody user: User) = userService.updateUser(user)
}
```

A service looking like this:

```javascript
@Service
class UserService(val userRepository: UserRepository) {

    fun getUsers(): List<User> = userRepository.findUsers()

    fun addUser(user: User) = userRepository.addUser(user.username, user.password)

    fun deleteUser(user: User) = userRepository.deleteUser(user.username)

    fun updateUser(user: User) = userRepository.updateUser(user.username, user.password)
}
```

And a repository looking like this:

```javascript
interface UserRepository : CrudRepository<User, String> {

    @Query("select * from users")
    fun findUsers(): List<User>

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO users (username, password) VALUES(:username, :password);")
    fun addUser(username: String?, password: String?)

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM users WHERE username = :username")
    fun deleteUser(username: String?)

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET password = :password WHERE username = :username")
    fun updateUser(username: String?, password: String?)
}
```

Right out of the gate, the syntax is a lot simpler than Java and it looks like you can do more stuff "out of the box" in a less verbose way. Nothing super impressive thought... if I compare the two versions, the differences are not really that relevant. I mean, they are obvious, but I am not sure if they are relevant to the point to consider swithing to Kotlin. I am going to go more deep on the language in order to extract the benefits.

# The code, the set-up, hands on

If you want to try for yourself, the code is here: <a href="https://github.com/joantolos/kata-kotling-spring" target="_blank" alt="GitHub repository">GitHub repository</a>

## Installing Postgres

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

## Setting up the database

Now, with the database started, you can type:

    psql postgres

And use the postgres CLI to interact with the database.

## Database, schema and user creation:

Using the Postgres CLI, you can create the user with the password and the database.

```javascript
CREATE USER katakotlinspringapp WITH PASSWORD 'WHATEVER_PASSWORD_YOU_WANT';
CREATE DATABASE katakotlinspringlocal OWNER katakotlinspringapp;
```

## Using DBeaver as a friendly way to interact with the local database

You can go on and use the CLI to create the table for the example to work, but at this point I recommend using a database tool like <a href="https://dbeaver.io/" target="_blank" alt="DBeaver">DBeaver</a>

Then you create a new connection with the following credentials:

* Host: localhost
* Port: 5432
* Database: katakotlinspringlocal
* Username: katakotlinspringapp
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

## Securing your data

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

## Starting the service on localhost

You need to set the environment variable _spring.profiles.active_ to local and _jasypt.encryptor.password_ to your secret phrase used before to encrypt the password. You can do it directly with the gradle task _bootRun_ that Spring provides by default.

    ./gradlew bootRun -Dspring.profiles.active=local -Djasypt.encryptor.password=YOUR_SECRET_PHRASE

## Playing with the API

Once you start the service, you can access Swagger to play with the available endpoints:

    http://localhost:8080/swagger-ui.html#/

This way you can see the three users inserted via the SQL script with the GET operation: _getUsers_ and also add new users, delete them etc.

# Kotlin vs Java

From what I can see in the literature, the impression that I get is that Kotlin is Java on steroids. There are a lot of features that you usually find in a more "modern" language or even a scripting language like resources to operate with lists and collections, iterations, accessing maps etc. The syntax is specially curated and the language looks like an improved version of Java attacking the historical flaws like Null Pointer checks or Checked Exceptions.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-spring-border-background-art-pink-blossom-beautiful-nature-scene-blooming-tree-sun-flare-image84195588" target="_blank">84195588</a> © <a href="https://www.dreamstime.com/subbotina_info" target="_blank">Subbotina</a> | <a href="https://www.dreamstime.com/photos-images/spring.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://kotlinlang.org/docs/jvm-spring-boot-restful.html" target="_blank" alt="Create a RESTful web service with Spring Boot – tutorial">Create a RESTful web service with Spring Boot – tutorial</a>_
* _<a href="https://kotlinlang.org/docs/jvm-spring-boot-restful-db.html" target="_blank" alt="Add a database to a Spring Boot RESTful web service – tutorial">Add a database to a Spring Boot RESTful web service – tutorial</a>_
* _<a href="https://kotlinlang.org/docs/comparison-to-java.html" target="_blank" alt="Comparison to Java">Comparison to Java</a>_
* _<a href="https://github.com/joantolos/kata-kotling-spring" target="_blank" alt="Example code repository">Example code repository</a>_
