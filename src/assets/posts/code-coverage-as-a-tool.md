I want to explain how I use the code coverage as a tool when I code. I don't really care for the final number of test coverage, if you code using TDD this number will be very high anyway. I don't think that we can trust the quality of our code by some test coverage percentage, we all know that figures can be easily hacked, so there is no point on taking much attention at the final count.

However, the majority of tools that provides test coverage, include some final report where you can see the results. This report usually comes as HTML or JSON file (and others). I use the html to navigate through the code and see the coverage. The JSON file is usually used by third party applications (like Jenkins) to feed some plugin.

These are the two test coverage tool that I use:

* **<a href="http://www.mojohaus.org/cobertura-maven-plugin/" target="_blank" alt="Cobertura">Cobertura</a>** (I usually use it with Maven)
* **<a href="http://www.eclemma.org/jacoco/" target="_blank" alt="Jacoco">Jacoco</a>** (I usually use it with Gradle)
* **<a href="https://istanbul.js.org/" target="_blank" alt="Istanbul">Istanbul</a>** (for Javascript)

To illustrate the point, I will use one of the katas that I do, this time will be the Mars Rover Kata.

# Introducing katas

For those not familiar with the concept of _kata_ in programming, I can not make a better definition that the one on <a href="http://codekata.com" target="_blank" alt="Code Kata:">Kata Log: Mars Rover</a>

> _A kata is an exercise in karate where you repeat a form many, many times, making little improvements in each. The intent behind code kata is similar. Each is a short exercise (perhaps 30 minutes to an hour long). Some involve programming, and can be coded in many different ways. Some are open ended, and involve thinking about the issues behind programming. These are unlikely to have a single correct answer._

> _The point of the kata is not arriving at a correct answer. The point is the stuff you learn along the way. The goal is the **practice**, not the solution._

I have some recurrent katas that I repeat from time to time, you can find a lot of proposals on the Internet to have fun with.

# Kata Mars Rover

Implementation of the original kata posted on <a href="http://kata-log.rocks/mars-rover-kata" target="_blank" alt="Kata Log: Mars Rover">Kata Log: Mars Rover</a>

## Your Task

You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

## Requirements

* You are given the initial starting point (x, y) of a rover and the compass (N,S,E,W) it is facing.
* The rover receives a character array of commands.
* Implement commands that move the rover forward/backward (f, b).
* Implement commands that turn the rover direction north/south/east/west (n, s, e, w).
* Implement wrapping from one edge of the grid to another. (planets are spheres after all)
* Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

## Added functionality

I have added more restrictions and features to make it more fun:

* The size of the planet should be parametrised
* The number of obstacles on the planet should be parametrised
* The obstacles should be placed on the planet randomly
* The position on the planet and the obstacles should be represented on console
* The rover should move like a real vehicle where you can also change it's orientation. The movement you choose (forwards, backwards) will depend on the orientation of the rover, which you can change.
* Simple user interface added, based on console.

# The implementation

I code using TDD (<a href="http://www.joantolos.com/blog/tdd-all-in/" target="_blank" alt="and only using TDD">and only using TDD</a>) so the first test to build may be the one defining the rover's movement. Something like this (using Spock testing framework):

```javascript
def 'Mars Rover should move forwards when facing north' () {

  given: 'Moving a new rover forwards'
  Rover rover = new Rover(1, 1, Compass.NORTH)
  rover.move(Movements.FORWARD)

  expect: 'The correct position'
  rover.getPosition().x == 1
  rover.getPosition().y == 2
}
```

There are some assumptions on this snippet, is not the first test that I made by far, but for the point of the article is useful. This post is not about coding the Mars Rover Kata but about how I use the test code coverage while coding.

The code above, assumes that the rover gets an initial position (1, 1 on the example) and an orientation (north on the example).

Great, then the production code to fulfil this requirements, should look something like this (in Java):

```javascript
public class Rover {

    private Position currentPosition;
    private Compass currentDirection;

    public Rover(Integer x, Integer y, Compass direction){
        this.currentPosition = new Position(x, y);
        this.currentDirection = direction;
    }

    protected Boolean move(Movements movement){
        Position positionProposal = this.currentPosition;
        switch (movement) {
            case FORWARD:
                switch (currentDirection){
                    case NORTH:
                        positionProposal = new Position(this.currentPosition.getX(), this.increment(this.currentPosition.getY()));
                        break;
                }
                break;
        }
        this.currentPosition = positionProposal;
        return true;
    }

    private Integer increment(Integer point) {
        return point + 1;
    }

    public Position getPosition() {
        return this.currentPosition;
    }
}
```    

Now we run the build and take a look to the html test report:

    ./gradlew clean build jacocoTestReport

![Rover move north test](/assets/images/codeCoverageAsATool/roverMoveNorthTest.png#postImageMedium)

Then, if we navigate to the package with less test coverage, we can examine the rover class and look for the places where there is no test coverage:

![Rover coverage](/assets/images/codeCoverageAsATool/roverCoverage.png#postImageMedium)

This report is super useful because you can navigate it with a browser, and that offers the possibility of see the code in a different way that you see it on the IDE. Browsing the site is more similar at "reading" the code as a book, as a story. And that is super useful to see possible refactors.

Now, what we can see in this particular instance, is that all the code is tested, but some branches are missing (marked in yellow). We are testing one movement (forward) and one direction (north), so we have to **write more tests** to cover all the possibilities. The next natural step should be to add more directions on the test before and then do the same for the backwards movement. So, we have used the test coverage report to see that **we need more tests.**

If you want to see the final implementation of the kata, you can find it here: <a href="https://github.com/joantolos/kata-mars-rover" target="_blank" alt="Mars Rover kata repository">Mars Rover kata repository</a>

# The technique

If you code using TDD, you virtually have to see a hundred percent coverage, that is what the theory tells us. So, when you don't see a hundred percent coverage there is only two possibilities:

* More tests needed
* Useless code needs to be deleted

Most of the time is the second option. And that's where I can do <a href="http://www.joantolos.com/blog/the-code-that-should-not-be/" target="_blank" alt="one of my favourite things">one of my favourite things</a> which is delete code. The reasoning is simple: if every feature is represented with a battery of tests, any code that is not executed during the tests, is not implementing any feature so that code has no place on the application.

The first possibility (more tests needed) is also very useful because most of the time, the tests needed to cover that specific place are **very hard to do** and that is a code smell. That points out to a faulty design. Don't forget that TDD is not about coding, but about **design.**

# The habit

I have developed this habit, where I start implementing a feature, which means writing some tests, and browse the test coverage report from time to time while implementing. The report allows me to identify possible points where I need more tests (which usually leads to a change on the design), and to detect code that is not used, which usually means that this specific implementation can be improved. Like the existence of mutable variables, change a loop into a stream and things like that.

This is how I use the test coverage, forget the final number. Just browse through your code and seek ways to improve it.

## References:

* _Photo <a href="https://www.dreamstime.com/programmer-working-computer-office-typing-data-coding-software-checking-code-screen-image167465163" target="_blank">167465163</a> © <a href="https://www.dreamstime.com/pichsakul_info" target="_blank">Pichsakul Promrungsee</a> | <a href="https://www.dreamstime.com/photos-images/code.html" target="_blank">Dreamstime.com</a>_
* _<a href="http://kata-log.rocks/mars-rover-kata" target="_blank" alt="Kata Log: Mars Rover">Kata Log: Mars Rover</a>_
