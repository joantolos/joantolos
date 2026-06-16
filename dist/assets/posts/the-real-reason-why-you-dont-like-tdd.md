Have you ever read somebody's code and thought: _"that is just beautiful, I wish I could code like this"_? The answer is simple: nobody codes like this at first attempt. Good code is always the result of several refactoring, iterations, reviews and improvements. Most of the time made by more than one person.

So the goal as developers should be to write the best code that we can. In order to do that we should consider has many tools and techniques as possible. I always recommend Extreme Programming and Test Driven Development.

# About TDD

Let's just remind a little the basics of the TDD algorithm:

![TDD Lifecycle](/assets/images/theRealReasonWhyYouDontLikeTDD/tddLifecycle.png#postImageMedium)

The following sequence is based on the book Test-Driven Development by Example by Kent Beck and extracted and summarised from Wikipedia:

* **Add a test:**
  Write a test that defines a feature, which should be very succinct. To write a test, the developer must clearly understand the feature's specification and requirements. The developer can accomplish this through use cases and user stories to cover the requirements and exception conditions, and can write the test in whatever testing framework is appropriate to the software environment. **This makes the developer focus on the requirements before writing the code.**

* **Run all tests and see if the new test fails:**
  This validates that the test harness is working correctly, shows that the new test does not pass without requiring new code because the required behaviour already exists, and it rules out the possibility that the new test is flawed and will always pass. **The new test should fail for the expected reason.** This step increases the developer's confidence in the new test.

* **Write the code:**
  The next step is to write some code that causes the test to pass. The new code written at this stage is not perfect and may, for example, pass the test in an inelegant way. That is acceptable because it will be improved and honed in Step 5.
  At this point, the only purpose of the written code is to pass the test. The programmer must not write code that is beyond the functionality that the test checks.

* **Run tests:**
  If all test cases now pass, the programmer can be confident that the new code meets the test requirements, and does not break or degrade any existing features. If they do not, the new code must be adjusted until they do.

* **Refactor**

Since I've been coding with TDD, each time I try to convince others to do it as well, I face the same reasons over and over again. Reasons that I call **excuses:**

# Excuse #1: I don’t believe in it

Good, you don’t have to. TDD is not a matter of faith, it is a tool. I don’t need to believe in screwdrivers, they just are. Of course, I can solve all of my problems with a hammer. Maybe if I hit hard enough, I can fix a screw into a wall with a hammer. But just because I am familiar with my hammer and know how to use it, doesn't mean that it is the correct tool for every situation.

![Nail](/assets/images/theRealReasonWhyYouDontLikeTDD/nail.png#postImageMedium)

_"I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail."_ (Abraham Maslow, 1966, <a href="https://en.m.wikipedia.org/wiki/Law_of_the_instrument" alt="Law of the instrument" target="_blank">Law of the instrument</a>)

It is our responsibility to expand our toolbox and use whatever is appropriate for each problem. It is irresponsible to say “I don’t believe in it” and use that as excuse to deliver bad (or not good enough code) code.

Don’t believe in it, just test it, give it a go, make your own conclusions.

That is not the reason why you don’t like TDD

# Excuse #2: It does not work for my project

A large amount of high profile companies use TDD on daily basis, but your project is so unique and your requirements so special that you can not use that technique...

Most of the time you don’t have a proper test environment set up and when you deal with a class with some external dependency,  (like a database, a queue system or something like this) you can’t find a proper way to test. That itself is a code smell and something that should make you rethink the code: **good code is easy to test.**

If you have to inject many dependencies, recreate a complex “context” or mock half the world to write a test... maybe your code design is not the best.

That would not happen when you start a project from scratch using TDD, but most of the time you will have to adapt to existing code. In that case the way to proceed is configure the tools necessary to do TDD comfortable. Normally that include:

* Some BDD or asserting framework
* Some Code Coverage framework
* Some mocking device

I try to compile seed projects with all these tools set up so next time I have to deal with existing code without these tools, I can easily add them. Take a look at some seeds that I made myself:

* <a href="https://github.com/joantolos/kata-ping-pong" alt="Java Spring cloud seed for coding with TDD" target="_blank">Java Spring cloud seed for coding with TDD</a> (using <a href="https://github.com/joantolos/kata-ping-pong" alt="http://spockframework.org" target="_blank">Spock</a> instead of JUnit)
* <a href="http://www.joantolos.com/blog/6-tools-to-help-you-do-tdd-with-node-js/" alt="Javascript seed for coding with TDD" target="_blank">Javascript seed for coding with TDD</a>

That is not the reason why you don’t like TDD

# Excuse #3: It takes too much time, makes the team go slower

You may have the feeling that you are going slower and at the beginning you are, no doubt about it. You have to set up all the engines and mechanisms to be able to test everything with guaranties and that takes time. Only if you spend that time and commit to the technique, you will see that in the long term you are far quicker than you would be otherwise.

The code base can assume modifications and improvements a lot better when it is code with TDD, and that makes you quicker on adding features:

![Features versus time](/assets/images/theRealReasonWhyYouDontLikeTDD/featuresVsTime.png#postImageSmall)

And of course, to convince product owners and stakeholders, you can always argue that time cost money:

![Cost versus time](/assets/images/theRealReasonWhyYouDontLikeTDD/costVsTime.png#postImageSmall)

Taking into consideration those metrics, it is really responsible to adapt TDD as a development technique because it will allow you to grow and maintain the project. So, resist the temptation of code "fast" and do things right instead.

That is not the reason why you don’t like TDD

# The real reason why you don’t like TDD

You don’t like TDD because is **hard**.

# Don’t feel bad: TDD is hard

I said all those things as well, at the beginning, every single one. Then I started to do katas and exercises and I thought, “well, this is good as an exercise or code gymnastics” but never had the guts to use it on real work situations. Then I started to read opinions and follow interesting people like <a href="https://twitter.com/jasongorman" alt="Jason Gorman" target="_blank">Jason Gorman</a>. Look at his take about katas and "real world code":

![Jason Gorman](/assets/images/theRealReasonWhyYouDontLikeTDD/jasonGorman.png#postImageMedium)

Then I spoke with my peer Finner at work, told him the situation, and he suggested me to sit with him to develop his next feature using TDD. And all of a sudden, all was clear with that little pair programming moment.
Later I decided to <a href="http://www.joantolos.com/blog/tdd-all-in/" alt="always code with TDD" target="_blank">always code with TDD</a> until I find a new better way to code. I am always open to improve.

TDD is one of that strategies that are simple, not easy. The algorithm is easy to understand (red, green, refactor), but extremely difficult to implement correctly. The first attempts are always frustrating because is a counterintuitive practice.

It forces you to think about the design of the code before the code even exists and that prevents you to do what coders love to do: code. When coding with TDD you can not jump over the keyboard and start typing, you are forced to think how do you want your final code to look like, and even then, iterate several times until you reach the final implementation. And even then, that implementation will change in time, for sure.

Remember Sensei Miyagi: _"Concentrate. Think only tree. Make perfect picture down to last leaf. Wipe mind clean, everything but tree. Nothing exists in the whole world. Just tree.
Make like picture."_

![Mr Miyagi](/assets/images/theRealReasonWhyYouDontLikeTDD/miyagi.jpg#postImageSmall)

Make the perfect picture of how do you want your code to look like and go on and on until you reach that picture.

# Don’t panic when things are red on the IDE

It creates a great deal of stress and anxiety when the code is not compiling or plain incomplete. The IDE creates alerts and mark the code as wrong and you feel the need of fix it right away. Just resist that wave, let the IDE complain and go ahead and let the code not compile for a while. Here an example of TDD test:

```javascript
Circle circle = ShapeBuilder.CIRCLE;
Assert.assertNotNull(circle.area());
```

Pretty self-explanatory. The thing is that Circle class and ShapeBuilder class does not exist yet and the IDE will complain. It is hard to resist to implement them before you write the actual test: **_Assert.assertNotNull(circle.area());_**

The IDE will scream with _circle.area()_ because not even the class exist, so how the area method should work?. Take a deep breath. Use auto complete, or generate code (whatever your IDE calls it) and create the class circle. Make it, so it implements the interface Shape (that does not exist), and so on...

Don't panic when things are red, use the IDE suggestions, and you will discover that most of the time, it suggests the creation of whatever is failing.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-human-head-silhouette-mental-health-symbol-puzzle-jigsaw-piece-cut-out-white-background-image69418294" target="_blank">69418294</a> © <a href="https://www.dreamstime.com/catwoman10_info" target="_blank">Catwoman10</a> | <a href="https://www.dreamstime.com/photos-images/reason.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://en.m.wikipedia.org/wiki/Law_of_the_instrument" alt="Law of the instrument" target="_blank">Law of the instrument</a>_
* _<a href="http://www.awesomefilm.com/script/karatekid.pdf" alt="The Karate Kid Script" target="_blank">The Karate Kid Script</a>_
* _<a href="https://amzn.to/2RkG1N7" alt="Test Driven Development. By Example (The Addison-Wesley Signature Series)" target="_blank">Test Driven Development. By Example (The Addison-Wesley Signature Series)</a>_
* _<a href="https://medium.freecodecamp.org/isnt-tdd-test-driven-development-twice-the-work-why-should-you-care-4ddcabeb3df9" alt="Test-driven development might seem like twice the work, but you should do it anyway" target="_blank">Test-driven development might seem like twice the work, but you should do it anyway</a>_
* _<a href="https://en.wikipedia.org/wiki/Test-driven_development" alt="Test-driven development wikipedia page" target="_blank">Test-driven development wikipedia page</a>_
