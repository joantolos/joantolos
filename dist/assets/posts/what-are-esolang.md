There is a full community of coders working on what are called _Esoteric languages_ or **esolang** for short. This is one of those perks of the profession that makes me love it even more. The fact that this exists is awesome. It makes me proud to enjoy "the party" and being able to understand what they are doing.

# What are esolangs

An esoteric programming language, is a computer programming language designed to experiment with weird ideas, to be hard to program in, or as a joke, rather than for practical use.

It does not matter if the syntax is obfuscated and obscure, in fact, it can be its sole goal. Before exploring what are actually the motivations to build such a language, I think it is relevant to clarify a concept that you will see again and again when looking into esolangs.

## What it means for a language to be _Turing complete_?

A programming language is Turing complete when you can implement any possible algorithm with it. It gets its name from Alan Turing the great mathematician, computer scientist, logician, cryptanalyst, philosopher and theoretical biologist that coined the famous term "Turing machine": The mathematical model defining an abstract machine that manipulates symbols on a strip of tape according to a bunch of rules.

If you think about HTML for example... you can't implement Quick Sort in it. Same thing happens with SQL. Those languages are not Turing complete (I am not going to entertain the war with HTML being or not a programming language, it doesn't matter). Non Turing complete languages are designed to perform a very specific task (like talking to a database or a browser), and not for being used in a generic way.

Most programming languages are Turing complete, sometimes are referred as "universal language" as well. When talking about Esolangs, it is important to point out if the language is Turing complete or not, so you can have an idea of what you can do with it.

**Big picture:** if the language contains loops, some form of functions, recursion, variable assignment... all the perks of a regular language, it probably is Turing complete. In fact, if you try to design a language right now, it would probably end up being Turing complete.

## What are stack based languages?

Stack-oriented languages operate on one or more stacks, each of which may serve a different purpose. Some stack-oriented languages operate in postfix or Reverse Polish notation. Any arguments or parameters for a command are stated before that command. For example, postfix notation would be written 2, 3, multiply instead of multiply, 2, 3

Stack-based algorithms consider data, by utilising one piece of data from atop the stack, and returning data back atop the stack. The need for stack manipulation operators, allow for the stack to manipulate data. To emphasise the effect of a statement, a comment is used showing the top of the stack before and after the statement. This is known as the stack effect diagram. The most notorious example are **assembly languages.**

Stack based languages are often verbose and difficult to read, but they provide a good framework to experiment if you want to create a brand-new language by yourself. You have to substitute the table commands and operations to manipulate the stacks with whatever is your idea for the language.

# Classes of Esolangs

There is a little but very active community online designing these new languages for all kind of purposes:

1. Recreation
2. Comedy
3. Computationally interesting
4. Multi coding o multi purpose

# Examples:

## Brainfuck

<a href="https://esolangs.org/wiki/Brainfuck" target="_blank" alt="Brainfuck">Brainfuck</a> was invented by Urban Müller in 1993, in an attempt to make a language for which he could write the smallest possible compiler for the Amiga OS, version 2.0. He managed to write a 240-byte compiler. The language was inspired by FALSE, which had a 1024-byte compiler. Müller chose to name the language brainfuck (with the initial letter in lower case, although it is now often capitalised).

Hello World in Brainfuck:

	++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.

## Whitespace

<a href="https://esolangs.org/wiki/Whitespace" target="_blank" alt="Whitespace">Whitespace</a>, designed in 2003 by Edwin Brady and Chris Morris, is an imperative, stack-based, esoteric programming language that uses only whitespace characters—space, tab, and linefeed—as syntax. All other characters are ignored. Whitespace got a brief moment of fame when it was posted on Slashdot on April 1st, 2003. Most people took it as an April Fool's joke, while it wasn't.

Hello World in Whitespace:

![Hello World in Whitespace](/assets/images/whatAreEsolang/whitespace.png#postImageSmall)

Where blue means tab and red means space. That's right, only whitespace characters to code in this language.

# Multi purpose esoteric languages

There is a subset of esoteric languages that serve more than one purpose, and those are the ones I find the most interesting. It is really challenging to try to create one of those.

## Shakespeare

The <a href="https://esolangs.org/wiki/Shakespeare" target="_blank" alt="Shakespeare">Shakespeare</a> Programming Language (SPL) is an esoteric programming language created by Karl Hasselström and Jon Åslund in 2001. The design goal of Shakespeare was, according to the Manual, to make a language with beautiful source code that resembled Shakespeare plays.

	Romeo, a young man with a remarkable patience.
	Juliet, a likewise young woman of remarkable grace.
	Ophelia, a remarkable woman much in dispute with Hamlet.
	Hamlet, the flatterer of Andersen Insulting A/S.

	                   Act I: Hamlet's insults and flattery.
	                   Scene I: The insulting of Romeo.
	[Enter Hamlet and Romeo]
	Hamlet:
	You lying stupid fatherless big smelly half-witted coward! You are as
	stupid as the difference between a handsome rich brave hero and thyself!
	Speak your mind!
	You are as brave as the sum of your fat little stuffed misused dusty
	old rotten codpiece and a beautiful fair warm peaceful sunny summer's
	day. You are as healthy as the difference between the sum of the
	sweetest reddest rose and my father and yourself! Speak your mind!
	You are as cowardly as the sum of yourself and the difference
	between a big mighty proud kingdom and a horse. Speak your mind.
	Speak your mind!
	[Exit Romeo]
	                   Scene II: The praising of Juliet.
	[Enter Juliet]
	Hamlet:
	Thou art as sweet as the sum of the sum of Romeo and his horse and his
	black cat! Speak thy mind!
	[Exit Juliet]
	                   Scene III: The praising of Ophelia.
	[Enter Ophelia]
	Hamlet:
	Thou art as lovely as the product of a large rural town and my amazing
	bottomless embroidered purse. Speak thy mind!
	Thou art as loving as the product of the bluest clearest sweetest sky
	and the sum of a squirrel and a white horse. Thou art as beautiful as
	the difference between Juliet and thyself. Speak thy mind!
	[Exeunt Ophelia and Hamlet]

	                   Act II: Behind Hamlet's back.
	                   Scene I: Romeo and Juliet's conversation.
	[Enter Romeo and Juliet]
	Romeo:
	Speak your mind. You are as worried as the sum of yourself and the
	difference between my small smooth hamster and my nose. Speak your
	mind!
	Juliet:
	Speak YOUR mind! You are as bad as Hamlet! You are as small as the
	difference between the square of the difference between my little pony
	and your big hairy hound and the cube of your sorry little
	codpiece. Speak your mind!
	[Exit Romeo]
	                   Scene II: Juliet and Ophelia's conversation.
	[Enter Ophelia]
	Juliet:
	Thou art as good as the quotient between Romeo and the sum of a small
	furry animal and a leech. Speak your mind!
	Ophelia:
	Thou art as disgusting as the quotient between Romeo and twice the
	difference between a mistletoe and an oozing infected blister! Speak
	your mind!
	[Exeunt]

This program prints "Hello world" when you run it with the Shakespeare interpreter. It uses a very complex way to evaluate the weight of the adjectives and other keywords to work the program stack. But the great think about this is... you can represent the play...

## Chef

Chef is a stack-based language where programs look like cooking recipes. Chef was designed by David Morgan-Mar in 2002.

This is hello world in Chef:

	Ingredients.
	72 g haricot beans
	101 eggs
	108 g lard
	111 cups oil
	32 zucchinis
	119 ml water
	114 g red salmon
	100 g dijon mustard
	33 potatoes

	Method.
	Put potatoes into the mixing bowl.
	Put dijon mustard into the mixing bowl.
	Put lard into the mixing bowl.
	Put red salmon into the mixing bowl.
	Put oil into the mixing bowl.
	Put water into the mixing bowl.
	Put zucchinis into the mixing bowl.
	Put oil into the mixing bowl.
	Put lard into the mixing bowl.
	Put lard into the mixing bowl.
	Put eggs into the mixing bowl.
	Put haricot beans into the mixing bowl.
	Liquefy contents of the mixing bowl. P
	our contents of the mixing bowl into the baking dish.

	Serves 1.

As you can see, it really looks like a recipe but if you try to eat that you will probably end up in the emergency room. So, <a href="http://www.mike-worth.com/2013/03/31/baking-a-hello-world-cake/" target="_blank" alt="Mike Worth">Mike Worth</a> wrote a hello world program that can be followed as a functional (if slightly odd) recipe for a chocolate cake:

	Ingredients.
	33 g chocolate chips
	100 g butter
	54 ml double cream
	2 pinches baking powder
	114 g sugar
	111 ml beaten eggs
	119 g flour
	32 g cocoa powder
	0 g cake mixture

	Cooking time: 25 minutes.

	Pre-heat oven to 180 degrees Celsius.

	Method.
	Put chocolate chips into the mixing bowl.
	Put butter into the mixing bowl.
	Put sugar into the mixing bowl.
	Put beaten eggs into the mixing bowl.
	Put flour into the mixing bowl.
	Put baking powder into the mixing bowl.
	Put cocoa  powder into the mixing bowl.
	Stir the mixing bowl for 1 minute.
	Combine double cream into the mixing bowl.
	Stir the mixing bowl for 4 minutes.
	Liquefy the contents of the mixing bowl.
	Pour contents of the mixing bowl into the baking dish.
	bake the cake mixture.
	Wait until baked.
	Serve with chocolate sauce.

	chocolate sauce.

	Ingredients.
	111 g sugar
	108 ml hot water
	108 ml heated double cream
	101 g dark chocolate
	72 g milk chocolate

	Method.
	Clean the mixing bowl.
	Put sugar into the mixing bowl.
	Put hot water into the mixing bowl.
	Put heated double cream into the mixing bowl.
	dissolve the sugar.
	agitate the sugar until dissolved.
	Liquefy the dark chocolate.
	Put dark chocolate into the mixing bowl.
	Liquefy the milk chocolate.
	Put milk chocolate into the mixing bowl.
	Liquefy contents of the mixing bowl.
	Pour contents of the mixing bowl into the baking dish.
	Refrigerate for 1 hour.

This looks a little more like a reasonable recipe, so he baked it:

![Chef example](/assets/images/whatAreEsolang/helloWorldChef1.png#postImageSmall)

And eat it:

![Chef example](/assets/images/whatAreEsolang/helloWorldChef2.png#postImageSmall)

You just have to love that.

## Piet

Piet is my favourite one. It is a stack-based language in which programs look like abstract paintings. It uses 20 colors, of which 18 are related cyclically through a lightness cycle and a hue cycle. A single stack is used for data storage, together with some unusual operations.

Piet was invented by David Morgan-Mar and is named after geometric abstract art pioneer Piet Mondrian.

> Piet Mondrian was a Dutch painter and art theoretician who is regarded as one of the greatest artists of the 20th century. He is known for being one of the pioneers of 20th-century abstract art, as he changed his artistic direction from figurative painting to an increasingly abstract style, until he reached a point where his artistic vocabulary was reduced to simple geometric elements.

You may be familiar with some of his later paintings:

![Mondrian example](/assets/images/whatAreEsolang/mondrian.png#postImageSmall)

Well, Piet programs looks like that, this is hello world:

![Piet example](/assets/images/whatAreEsolang/hello_world.png#postImageSmall)

And another version, a bit more artistic of, again, hello world:

![Piet another example](/assets/images/whatAreEsolang/hello_world_artistic.png#postImageSmall)

This program prints "Piet" on the console, and it **really** looks like a Mondrian painting:

![Piet another example](/assets/images/whatAreEsolang/pietPiet.png#postImageSmall)

## Sonic Pi

<a href="https://sonic-pi.net" target="_blank" alt="Sonic Pi">Sonic Pi</a> it's just an endless stream of fun. This is a language that uses familiar syntax to generate sounds using synths. The point is to create music with code... or make your code sound.

This is FizzBuzz implemented in SonicPi:

	# Welcome to Sonic Pi
	use_bpm 244

	live_loop :main do
	  use_synth :dark_ambience
	  i = 1
	  16.times do
	    if factor?(i, 15)
	      play :G4
	    elsif factor?(i, 5)
	      play :D5
	    elsif factor?(i, 3)
	      play :C5
	    else
	      play :A4
	    end
	    i = i + 1
	    sleep 1
	  end
	end

And it sounds (yes, **sounds**) like this:

<audio controls="controls">
  <source type="audio/wav" src="/assets/images/whatAreEsolang/fizzBuzz.wav"></source>
</audio>

I got this idea from a wonderful talk by <a href="https://www.youtube.com/watch?v=6avJHaC3C2U" target="_blank" alt="Dylan Beattie">Dylan Beattie</a> called "The art of code"

## References:
* _Photo by <a href="https://pixabay.com/photos/craft-tarot-divination-2728227/" target="_blank" alt="Pixabay">Pixabay</a>_
* _<a href="https://en.wikipedia.org/wiki/Turing_machine" target="_blank" alt="Wikipedia: Turing machine">Wikipedia: Turing machine</a>_
* _<a href="https://en.wikipedia.org/wiki/Piet_Mondrian" target="_blank" alt="Wikipedia: Piet Mondrian">Wikipedia: Piet Mondrian</a>_
* _<a href="https://www.youtube.com/watch?v=6avJHaC3C2U" target="_blank" alt="The Art of Code - Dylan Beattie">The Art of Code - Dylan Beattie</a>_
