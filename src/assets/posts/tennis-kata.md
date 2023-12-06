For those not familiar with the concept of _kata_ in programming, I can not make a better definition that the one on <a href="http://codekata.com" target="_blank">Code Kata:</a>

> _A kata is an exercise in karate where you repeat a form many, many times, making little improvements in each. The intent behind code kata is similar. Each is a short exercise (perhaps 30 minutes to an hour long). Some involve programming, and can be coded in many different ways. Some are open ended, and involve thinking about the issues behind programming. These are unlikely to have a single correct answer._

> _The point of the kata is not arriving at a correct answer. The point is the stuff you learn along the way. The goal is the **practice**, not the solution._

I have some recurrent katas that I repeat from time to time, you can find a lot of proposals on the Internet to have fun with. This post is about my implementation of the Tennis kata.

# Instructions (taken from Coding Dojo):

This Kata is about implementing a simple tennis game. The scoring system is rather simple:

1. Each player can have either of these points in one game 0 15 30 40

1. If you have 40, and you win the ball you win the game, however there are special rules.

1. If both have 40 the players are deuce.
  1. If the game is in deuce, the winner of a ball will have advantage and game ball.
  1. If the player with advantage wins the ball he wins the game
  1. If the player without advantage wins they are back at deuce.

1. A game is won by the first player to have won at least four points in total and at least two points more than the opponent.

1. The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.

1. If at least three points have been scored by each player, and the scores are equal, the score is “deuce”.

1. If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “advantage” for the player in the lead.

# Testing framework

I want to learn more and more about the **<a href="http://spockframework.org/" target="_blank">Spock testing framework</a>** combined with Java on the production code. Due to the nature of the tennis score problem, I would need some kind of testing repetition for cover all the score combinations, and test the production code for each one of them. Using JUnit that would be using _run with parameters_ which does the job, but it is kind of verbose. Spock uses Groovy as a language so I figure that should be another simple, direct way to do it and I come up with this:

![Score spec file](/assets/images/tennisKata/scoreSpec.png#postImageBig)

These implementations follow the bdd-like layout: _given, then, when_ which I particularly like. Let's take a look to the GIVEN block:

```javascript
given: "A new game"
Game game = new Game(new UserInterface(), "Joan", "Finner")
```

Just creates a new game with two players, Joan and Finner. Then on the _then_ block:

```javascript
expect: 'Should match the expected pretty score'
playerOneScore.times{game.scorePoint(1)}
playerTwoScore.times{game.scorePoint(2)}
game.getScore() == expectedPrettyScore
```

That is the part that I love, in groovy you can do loops like this:

```javascript
5.times {
   println "Groovy Rules!"
}
```    

Which will print "Groovy Rules!" five times.

So, what I want is for the player one to score n times and the player two to score another n times, and then ask for the pretty score, so I can check if it is the expected.

```javascript
playerOneScore.times{game.scorePoint(1)}
playerTwoScore.times{game.scorePoint(2)}
game.getScore() == expectedPrettyScore
```

so, "playerOneScore" and "playerTwoScore" are defined on the _when_ block, as:

```javascript
playerOneScore  | playerTwoScore    | expectedPrettyScore
0 				| 0 				|| "Love - All"
1 				| 1 				|| "Fifteen - All"
2 				| 2 				|| "Thirty - All"
3 				| 3 				|| "Deuce"
4 				| 4 				|| "Deuce"
1 				| 0 				|| "Fifteen - Love"
0 				| 1 				|| "Love - Fifteen"
2 				| 0 				|| "Thirty - Love"
0 				| 2 				|| "Love - Thirty"
3 				| 0 				|| "Forty - Love"
0 				| 3 				|| "Love - Forty"
4 				| 0 				|| "Win for Joan"
0 				| 4 				|| "Win for Finner"
2 				| 1 				|| "Thirty - Fifteen"
1 				| 2 				|| "Fifteen - Thirty"
3 				| 1 				|| "Forty - Fifteen"
1 				| 3 				|| "Fifteen - Forty"
4 				| 1 				|| "Win for Joan"
1 				| 4 				|| "Win for Finner"
3 				| 2 				|| "Forty - Thirty"
2 				| 3 				|| "Thirty - Forty"
4 				| 2 				|| "Win for Joan"
2 				| 4 				|| "Win for Finner"
4 				| 3 				|| "Advantage Joan"
3 				| 4 				|| "Advantage Finner"
5 				| 4 				|| "Advantage Joan"
4 				| 5 				|| "Advantage Finner"
6 				| 4 				|| "Win for Joan"
4 				| 6 				|| "Win for Finner"
```

So, for each possible pair of player one / player two combination, we have the expected score. What Spock does, is for each one of these combinations, runs the code on expect. For example, for the combination playerOneScore = 2, playerTwoScore = 3, expectedPrettyScore = Thirty - Forty the code will be:

```javascript
2.times{game.scorePoint(1)}
3.times{game.scorePoint(2)}
game.getScore() == Thirty - Forty
```

This piece of code score 2 points for player one, scores 3 points for player two and then asserts the final score. This is repeated for each score combination.

I find this approach simple and beautiful. You can see what the code does simply read this test. Then the Score class implementation almost becomes trivial.

# Score Implementation

What I did then, is focusing on the different score "groups" that you can identify on the combinations: implement all the ties, then implement all the wins, then all the "regular scoring" situations and so on.

My final version after several refactors is this one:

![Score file](/assets/images/tennisKata/score.png#postImageBig)

Again, really simple implementation. The only thing that I can point out is that I went again for a solution a little more verbose but easier to read. Most on the private methods can be inlined, resulting in a more small solution, less code lines. But <a href="http://www.joantolos.com/blog/readability/" target="_blank">as I said on other occasions, lees is not always more.</a> I prefer a bit more code if it is easier to read.

# Let's make it play

I went a little over the top and made the game play itself. With a simple console user interface, given a player one name and a player two game; the application can run a game where the _Luck_ decides which player scores on each turn.

```javascript
public static Integer randomPointWinner() {
  return new Random().nextInt(2) + 1;
}
```    

This method on the Luck class returns 1 or 2 referring to player one or player two and it is called in a loop like this:

```javascript
public void start() {
    do {
        Integer winnerPointPlayerId = scoreRandomPoint();
        if (winnerPointPlayerId == 1) {
            ui.print("Point " + playerOneName);
        } else {
            ui.print("Point " + playerTwoName);
        }
        ui.print("Score: " + getScore());
    } while (!getScore().startsWith("Win"));
}

public Integer scoreRandomPoint() {
    Integer randomUserId = Luck.randomPointWinner();
    rawScore[randomUserId - 1] = rawScore[randomUserId - 1] + 1;
    return randomUserId;
}
```

It speaks for itself. If we run the application we will see something like this on the console:

![Random game example](/assets/images/tennisKata/randomGame.png#postImageMedium)

# The code

You can take a look at my implementation of the kata on github: <a href="https://github.com/joantolos/kata-tennis" target="_blank">https://github.com/joantolos/kata-tennis</a>

Any feedback about the code, or ideas for different implementations are welcome!

## References:

* _Photo <a href="https://www.dreamstime.com/stock-illustration-abstract-tennis-player-blue-background-image65662242" target="_blank">65662242</a> © <a href="https://www.dreamstime.com/cornelius20_info" target="_blank">Cornelius20</a> | <a href="https://www.dreamstime.com/photos-images/tennis.html" target="_blank">Dreamstime.com</a>_
