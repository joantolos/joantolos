# The conference

This conference has been growing year by year and now is one of the referents. I have been lucky enough to be able to attend to all the editions until now.

The JBCNConf is a meeting point for programmers, developers and development professionals, who meet to do networking and learn about the Java world and its latest developments.

The event is organised by <a href="https://www.barcelonajug.org" target="_blank">Barcelona JUG (Barcelona Java Users Group)</a>, a non-profit association made up of programmers, engineers and other technology lovers. At the head stand <a href="https://twitter.com/icougil" target="_blank">Nacho Cougil</a>, software engineer from Barcelona and founder of Barcelona JUG, and <a href="https://twitter.com/vilojona" target="_blank">Jonathan Vila</a>, senior software engineer at Ocado Technology specialising in the design and development of Java applications.

Together with them, the Barcelona JUG association and a large group of volunteers will work to convert the JBCNConf into the state reference in Java and JVM.

# Ideas

These are some of the conclusions that I reached and a few ideas that I want to try and incorporate to my day-to-day work.

## More functional Programming

I have been including functional programming paradigm for a while on my code, and I am very happy with the outcome. A couple of talks of this year's conference made me more confident that I am on the right path.

Not entering the war about _"object-oriented versus functional programming"_, I am happy to see how the mixing approach that I have been implementing is considered a good practice. The talk by <a href="https://twitter.com/mariofusco" target="_blank">Mario Fusco</a> titled _"From object-oriented to functional and back: the pursuit of pragmatic programming"_ was really enlighten:

>_Object-Oriented Programming dominated the software development landscape in the last decade of XX century and in the first of XXI. In more recent years, even as a consequence of the advent of multicore CPUs, Functional Programming and its principles started attracting more interest, becoming at least equally relevant in our industry. The biggest mistake made by programmers nowadays is considering OOP and FP as two mutually exclusive paradigms. This misconception is also the product of a misunderstanding about what OOP actually means and its founding principles. The biggest pros of OOP are polymorphism and encapsulation while FP strengths are immutability and its declarative style, but these features are orthogonal and there's no reason why they cannot coexist in the same program. The final purpose of this talk is twofold: debunking the misconceptions on OOP and showing that OOP and FP are actually complementary techniques that can happily coexist in the same codebase. It is the duty of experienced developers to fill their toolbox with both OOP and FP tools and to know from time to time how to choose and employ the tool that is the best fit for the problem at hand._

Going a little into detail, another talk performed by <a href="https://twitter.com/BrianGoetz" target="_blank">Brian Goetz</a> titled _"FP vs OOP: Choose two"_ went into a little more detail on the technical aspects and different approaches in mixing both:

_The talk is about the fictitious divisions we invent, and how they harm the progress of our industry. In particular, we'll look at the supposed tension between Functional Programming and Object-Oriented Programming, and hopefully see that the tension is all in our heads._

My approach for my projects has been dealing with the "final" business logic (like algorithmic stuff and so), using functional programming and leaving the design and "structure" of the program with object-oriented. When dealing with data manipulation and algorithmic complexity, functional programming looks better because of immutability and the ability to test the code easier, just to mention two of the benefits. Object-oriented, on the other hand, feels more natural to me when structuring the program and creating separation of concerns and modularity because of inherence for example.

You can argue just the opposite, and it can work just fine, the above is just the approach that has worked for me.

## Graal VM

<a href="https://www.graalvm.org" target="_blank">GraalVM</a> is a new alternative virtual machine that has the ability to create native executables from the jar created by your building tool. That alone has benefits enough to consider its use. The final binary executable is highly optimised. Not only that, a couple of frameworks take advantage of this new virtual machine and offer some interesting options:

* **Quarkus:** <a href="https://quarkus.io" target="_blank">Quarkus.</a>
* **Micronaut:** <a href="https://micronaut.io" target="_blank">Micronaut.</a> I would like to think about Micronaut as an alternative to Spring Boot for microservices. That is how I understand it and that is what I am going to try. I have a couple of pet projects that I want to migrate from Spring to Micronaut and try for myself the gain.

## Testing on production

We are currently creating a dual deployment environment for production which means that we can deploy 'silently' on one version of production while the other continues serving the users. Then once the release is done, we can switch to the new version redirecting the traffic. Whatever we do once the new environment is ready until we decide to redirect the traffic is 'testing on production'.

After the talk by <a href="https://twitter.com/alexsotob" target="_blank">Alex Soto</a>, gave a lot of ideas and insight on what to do to ensure that your new environment is ready. Techniques like blue/green deployment, canary release or dark launches and even tools like <a href="https://lordofthejars.github.io/diferencia-docs-site/diferencia/0.6.0/index.html" target="_blank">Diferencia</a> or <a href="https://grafana.com" target="_blank">Grafana.</a>

I really want to get more involved in the deployment process in order to achieve more speed and reliability.

## Switch from Java 8 to Java 11

Java 11 is the highest version of Java with LTS (Long Term Support). The last one was Java 8 which I am currently using. I have been reading about the benefits from Java 9 and above for quite some time and I think that it is a good time to upgrade.

In order to do that, it is a good practice to install <a href="https://sdkman.io" target="_blank">SDK Man</a> as a tool to manage different SDK installed on your machine, so you can switch between them easily. My idea is to try with some simple katas that I have develop on Java 8 to confront all the possible problems derived from the upgrade and then gradually try to introduce the new version on the projects at work.

# Tools

Some peer told me at the conference, in a casual conversation: "let's keep using the proper tool for the proper problem". The project where I am working on right now has a backend written 80% with nodeJS, the other 20% is Java. I am still using IntelliJ for everything just by the force of habit. My goal after this edition is start using <a href="https://code.visualstudio.com" target="_blank">Visual Studio Code</a> for the nodeJS services and UI.

I have been delaying this for some time, but now I am convinced that is the way to go. Some people at the office already use it, and they are really happy. Hopefully it won't be painful.

# The best of all

As all the other editions of this conference, the general idea that I have in my head when everything is finished is that we are very lucky to be involved in the software industry. The community is strong and active and the people involved is really engaged.

I leave the event eager to grab the laptop and start trying new thinks or redoing the old ones. This is the best take out of all, the motivation to keep improving and learning. The guys from JBCNConf accomplish that every year, and this will be my fifth time.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-meeting-seminar-conference-business-teamwork-concept-image50283604" target="_blank">50283604</a> © <a href="https://www.dreamstime.com/rawpixelimages_info" target="_blank">Rawpixelimages</a> | <a href="https://www.dreamstime.com/photos-images/conference.html" target="_blank">Dreamstime.com</a>_
* _<a href="http://www.jbcnconf.com" target="_blank">JBCN Conf</a>_
