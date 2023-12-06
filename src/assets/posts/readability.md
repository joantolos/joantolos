# Less is more... but really?

I always struggle to find an example where less code is not necessarily better, because it usually is. But recently I stumble upon an example. **Clean Code** ask for readability over anything else because code is more often read than written. That sometimes may mean to be a little more verbose on the code. Let's see an example:

# The context

I have to paint a simple plot, x and y-axis. It does not matter what the x or y values represent. Think of the following as an illustration:

![Simple plot example](/assets/images/readability/plot.png#postImageSmall)

To make it more fun, business has a couple of restrictions:

* Both x or y values **can be null** as that has some business meaning (it will be painted with a different color)
* When both **x and y are zero**, then both must be null (again, to use a specific color)

# At first draw

The experienced coder bangs the keys and BAM! Solved:

```javascript
if(x != null && y != null && x.equals(0d) && y.equals(0d)){
    this.x = null;
    this.y = null;
}
```

It checks that x and y are not null (because they can be by business rule), and then both of them being zero.

Works as a charm.

# The new coder in town

Image the next day, a new coder joins the team and looks at that if statement. Ok... there are a several checking conditions and then we "set" the x and y value to zero. But why? Let's hope there are some illustrative tests, so I can figure it out. But why let the poor man **figure out** the behavior when he or she can simply **read it**?

Let's consider the following solution:

```javascript
if(axesAreNotNull(x, y) && pointIsOrigin(x, y)){
    this.x = null;
    this.y = null;
}
private boolean axesAreNotNull(Double x, Double y) {
    return x != null && y != null;
}

private boolean pointIsOrigin(Double x, Double y) {
    return x.equals(0d) && y.equals(0d);
}
```

From a **readability** point of view, we can easily read that the values of both x and y will be null when _“axes are not null and point is origin”_. Even we don't care of the exact implementation of those methods, with the if statement we can understand what it means.

Yes, it is more verbose.

# The devil is in the details

Avoid the temptation.

It is hard to resist to just inline that two separated methods. After all, it is clear what they do right? Well, it is clear now but in a few months not even the coder that did that if statement will remember these two simple business rules by hearth. So, let's stick with the methods which names help us to **read the story** that the code should tell.

Remember, we are writing in a _language_. Yes, the code is compiled or interpret by a machine, but it is intended for humans to read. Let's use the language to express the business. We are writing the rules of our application in a very sophisticated language. Let's write a nice, simple story to read.

# Java disclaimer

I know you would probably implement that couple of features in a single beautiful code line in another language because _"Java is unnecessary verbose"_ and that's fine. Good for you and your flawless technique. Go have fun and conquer the world with your lovely language... but you are missing the point which is to illustrate a case. I happen to be coding in Java nowadays so that's what I use for my examples. I am not interested in the _language war_. As I said before _<a href="http://www.joantolos.com/blog/test-driven-architecture" target="_blank">on this very blog</a>_, it is our responsibility as coders to find the correct tool for the correct problem. I don't wear the Java t-shirt or any other for that matter.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-child-reading-book-outdoor-city-roof-happy-girl-kid-read-dr-dream-children-books-image97795889" target="_blank">97795889</a> © <a href="https://www.dreamstime.com/inarik_info" target="_blank">Inara Prusakova</a> | <a href="https://www.dreamstime.com/photos-images/read.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://amzn.to/2Rl3AWi" target="_blank">Clean Code, Robert C. Martin</a>_
