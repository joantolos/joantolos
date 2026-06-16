I have been lucky enough to attend to this year's edition of <a href="http://www.jbcnconf.com/" target="_blank" alt="JBCN Conf">JBCN Conf.</a> These are some thoughts and take-outs I want to share.

# The conference

The JBCNConf is a meeting point for programmers, developers and development professionals, who meet to do networking and learn about the Java world and its latest developments.

The event is organised by <a href="https://www.barcelonajug.org" target="_blank" alt="Barcelona JUG (Barcelona Java Users Group)">Barcelona JUG (Barcelona Java Users Group)</a>, senior software engineer specialising in the design and development of Java applications.

Together with them, the Barcelona JUG association and a large group of volunteers will work to convert the JBCNConf into the state reference in Java and JVM.

Next year, they plan to move on into an even bigger event losing the "Java" prefix in the name. They will come back with more days, more tracks, more speakers and of course, more topics. The conference will be named **DevBCN** and they will open to more general topics a part from Java.

# Women in tech

This year, they wanted to do a shout-out to the big figures of women in tech. Just to mention a few, they made emphasis into Margaret Hamilton, Ada Lovelace, Grace Hopper, Katherine Johnson, Barbara Liskov.

Margaret Heafield Hamilton is an American computer scientist, systems engineer, and business owner. She was director of the Software Engineering Division of the MIT Instrumentation Laboratory, which developed on-board flight software for NASA's Apollo program.

![Margaret Heafield Hamilton](/assets/images/jbcnConf2022/margaretHeafieldHamilton.png#postImageSmall)

Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation, and to have published the first algorithm intended to be carried out by such a machine. As a result, she is often regarded as the first computer programmer.

![Ada Lovelace](/assets/images/jbcnConf2022/adaLovelace.png#postImageSmall)

Grace Brewster Murray Hopper was an American computer scientist and United States Navy rear admiral. One of the first programmers of the Harvard Mark I computer, she was a pioneer of computer programming who invented one of the first linkers. Hopper was the first to devise the theory of machine-independent programming languages, and the FLOW-MATIC programming language she created using this theory was later extended to create COBOL, an early high-level programming language still in use today.

![Grace Hopper](/assets/images/jbcnConf2022/graceHopper.png#postImageSmall)

Katherine Johnson was an American mathematician whose calculations of orbital mechanics as a NASA employee were critical to the success of the first and subsequent U.S. crewed spaceflights. During her 33-year career at NASA and its predecessor, she earned a reputation for mastering complex manual calculations and helped pioneer the use of computers to perform the tasks. The space agency noted her "historical role as one of the first African-American women to work as a NASA scientist".

![Katherine Johnson](/assets/images/jbcnConf2022/katherinJohnson.png#postImageSmall)

Barbara Liskov is an American computer scientist who has made pioneering contributions to programming languages and distributed computing. Her notable work includes the development of the Liskov substitution principle which describes the fundamental nature of data abstraction, and is used in type theory and in object-oriented programming.

![Barbara Liskov](/assets/images/jbcnConf2022/barbaraLiskov.png#postImageSmall)

These are photos taken at the actual venue talk rooms. Big women were presiding the sessions.

# The talks

I am going to compile some conclusions, information that I gathered and thoughts from the talks I saw.

About artificial intelligence I learnt that there is a big need for Backend and DevOps profiles to complete the work the data scientist are doing. Some times they have trouble going quick to market because they lack the knowledge or expertise to deploy to the world the mathematical models that have been working on hard. There is a good opportunity for developers on that field.

I attended a really nice gentle introduction to machine learning where I saw a presentation of the most common algorithms used right now on data science. We were introduced to the concept of deep neural networks and as an example, we saw the proposal from Google: <a href="https://alphafold.ebi.ac.uk/" target="_blank" alt="AlphaFold">AlphaFold</a> that it is used for protein structure prediction.

![Protein prediction by AlphaFold](/assets/images/jbcnConf2022/proteinPrediction.png#postImageBig)

I learnt about the way Java deals with ByteCode and followed several examples with detail. We work at a very high level of abstraction day to day, thinking about our business objects and needs. Sometimes it is useful to take a step back and remember how the compiler is going to deal with the hardware and how our code can be more efficient (or far worse) just taking that into account.

I also had the opportunity to take a deep dive into the importance of **security** when we are coding on our day to day. We saw a lot of examples of seemingly harmless, simple code being attacked with actually very simple methods. We explored several vulnerabilities of the past (like <a href="https://en.wikipedia.org/wiki/Log4Shell" target="_blank" alt="Log4Shell">Log4Shell</a> and <a href="https://www.itpro.co.uk/security/33242/the-equifax-effect-explaining-the-biggest-security-disaster-of-the-21st-century" target="_blank" alt="Equifax">Equifax</a>), how they worked and how to avoid them.

Cloud technologies were a big part of the conference as you can imagine. I attended a talk about how you can't buy your way to native cloud. Meaning that there is no profitable way to hack a legacy application that is not thought for the cloud into the cloud just by throwing money at it. <a href="https://hollycummins.com/why-you-cant-buy-cloud-native-codecamp/" target="_blank" alt="It was one of the most voted talk by the way.">It was one of the most voted talk by the way.</a> You can see an old performance of that talk <a href="https://www.youtube.com/watch?v=q8apHY9q7tc" target="_blank" alt="here.">here.</a> It is very worth your time.

I explored a few Java frameworks that could potentially substitute Spring like <a href="https://quarkus.io/" target="_blank" alt="Quarkus">Quarkus</a> or <a href="https://jakarta.ee/" target="_blank" alt="Jakarta  EE">Jakarta  EE</a>. Although I appreciate the novelties that Quarkus introduces and the efforts of a solid old school framework like Jakarta to be up-to-date, I don't see any reason to move from Spring at this time.
Another nice framework is <a href="https://download.eclipse.org/microprofile/microprofile-lra-1.0-M1/microprofile-lra-spec.html" target="_blank" alt="MicroProfile LRA">MicroProfile LRA</a> that proposes the introduction of annotations and APIs to coordinate long-running time activities. But again, I don't see a short-term need to include that technology.

I attended a couple sessions about functional programming and freshened up important concepts like mutability, declarative and imperative styles. I personally found this representation of **"flatMap"** very inspired:

(🟧, 🟨, 🟩, 🟦).flatMap(⬜ -> (🤍, ⚪)) => (🧡, 🟠, 💛, 🟡, 💚, 🟢, 💙, 🔵)

Finally, I attended a very nice talk about the future of the development career and the different new roles other than the classical path "from developer to manager", like:

- Staff engineers: Design, build, and test structures, products, systems, services, or equipment, depending on their area of specialty. They are employed in a variety of sectors and mainly specialize in civil, mechanical, industrial, or electrical engineering.
- Principal engineer: A leadership role where they guide staff to ensure an engineering team completes projects on time and within budgets.
- Distinguished Engineers: Individual contributors (meaning they don't manage anyone directly) who are members of engineering or tech architecture teams. On the distinguished engineer career path, they are able to continue evolving into increasing levels of seniority without becoming people leaders.

They also explained the importance of creating a personal brand to be seen in the community.

# Take over and direct output to my day to day

I have gathered several ideas from the talks and conversations that we can apply right away to my current projects.

## From H2 to testcontainers

I have a few projects using <a href="https://www.h2database.com/html/main.html" target="_blank" alt="H2 in-memory database">H2 in-memory database</a> for testing. I am going to switch that to <a href="https://www.testcontainers.org/" target="_blank" alt="Testcontainers">Testcontainers</a> which provides a better approach. Maintaining the H2 database is kind of expensive, and also is a simulation for many databases so you may have incompatibility on the syntax depending on the database you are using. <a href="https://www.testcontainers.org/" target="_blank" alt="Testcontainers">Testcontainers</a> solves that problem: as it is based on Docker, you can use an image of the actual database engine that you are using on your application, so no compatibility problems anymore.

## Analysing WebSockets for asynchronous operations

After seeing several talks about asynchronous communications, queues and even GraphQL; I reach the conclusion that may be interesting to explore the possibility of using <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" alt="WebSockets">WebSockets</a> for that kind of communications.

I will try to create a POC for some business related use case, so it can be valued.

## New API for Java futures

Java has included <a href="https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html" target="_blank" alt="Completable Futures">Completable Futures</a> to the futures API. It makes it very easy to use for the simple use cases. We are going to include this simple implementation to create parallel executions, for example, making more than one query to Elasticsearch and waiting for the results.

I have used Futures to make this simple operations but the code is a bit verbose and ugly. This change is going to improve very much the code. Look at this example for completable futures, and how simple it is:

```javascript
public static void main(String[] args) {
    ExecutorService e = Executors.newFixedThreadPool(2);

    CompletableFuture<Integer> cf1 = CompletableFuture.supplyAsync(() -> 1, e);
    CompletableFuture<Integer> cf2 = CompletableFuture.supplyAsync(() -> 2, e);

    CompletableFuture<Integer> future = cf1.applyToEither(cf2, i -> i);

    System.out.println(future.join());
}
```

## From JPA to Micronaut data

I have several Java applications accessing Postgres databases with the simple specification JPA which works fine. At the conference, I have discovered <a href="https://micronaut-projects.github.io/micronaut-data/latest/guide/" target="_blank" alt="Micronaut Data">Micronaut Data</a> which proposes a new and better way to deal with data. I want to keep a lightweight framework to access relational databases and Micronaut looks like a natural next step as the improvements are obvious.

## Do I need asynchronous access to database?

<a href="https://r2dbc.io/" target="_blank" alt="R2DBC">R2DBC</a> is an asynchronous database framework that can be added to your current ecosystem. I would like to create a POC with the framework in action, just so everybody knows that it can be done.

# Conclusion

This year's edition has been way better than the other ones. Maybe the pandemic pause has been useful for the organisers to gather more ideas and have more time to discuss.

The atmosphere was very nice and the general feeling was that everyone was having a good time. The speakers were always available to answer your questions whenever you find them. The organisers were on point and decisive.

Technically speaking, the conclusion I can reach is that **Java** is in good shape. The new features prepared for the next releases are very promising.

## References:
* _Photo <a href="https://www.dreamstime.com/two-people-coding-code-program-programming-developer-computer-web-development-coder-working-design-software-desk-office-image139990440" target="_blank">139990440</a> © <a href="https://www.dreamstime.com/wutzkoh_info" target="_blank">Wutthichai Luemuang</a> | <a href="https://www.dreamstime.com/photos-images/java.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://www.h2database.com/html/main.html" target="_blank" alt="H2 in-memory database">H2 in-memory database</a>_
* _<a href="https://www.testcontainers.org/" target="_blank" alt="Testcontainers">Testcontainers</a>_
* _<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" alt="WebSockets">WebSockets</a>_
* _<a href="https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html" target="_blank" alt="Completable Futures">Completable Futures</a>_
* _<a href="https://micronaut-projects.github.io/micronaut-data/latest/guide/" target="_blank" alt="Micronaut Data">Micronaut Data</a>_
* _<a href="https://r2dbc.io/" target="_blank" alt="R2DBC">R2DBC</a>_
