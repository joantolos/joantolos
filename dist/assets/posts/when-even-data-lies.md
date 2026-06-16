I have a natural inclination towards analytical thinking. I find myself frequently leaning on data-driven approaches to decision-making, consciously steering clear of allowing emotions to influence my judgment. This tendency has earned me a certain reputation, particularly with my wife, who affectionately refers to me as a 'robot.' However, when it comes to significant, long-term commitments, I firmly believe that adhering to this strategic mindset pays off.

That means that I pay attention to the facts, trying to gather as much as possible to make an assessment of the situation. While this method appears reasonable, its efficacy diminishes when the reliability of the facts comes into question. I mean, a fact is a fact, you can always trust a fact. But sometimes, some facts disguise as others and it is easy to draw the wrong conclusion. I recently stumbled upon a situation like this in my job where two contradicting facts were true at the same time.

# The set up

A peer of mine was fixing a bug in the code. The bug was not easy to fix, but it was easy to test, meaning you could easily go to a web app and with a couple of clicks reproduce it (or not) and check if it was fixed. There was a brief moment where the two of us didn't overlap in front of the computer. I left early that evening while he was still working on the code, and I came in early the next day and he still wasn't there.

When I left, the bug was still ongoing, and when I joined the next day, I read on the team chat that he already fixed it and tested it on the proper environments. Cool, nicely done. I started working on my task, and I could not start the application because the bug was still there. Wait a minute... he said yesterday that he fixed it and tested it on the same environment that I am in, what is happening?

After discarding the obvious reasons (Am I looking at the proper environment? Is the VPN connected? Are my eyes still closed from sleep?), I reached the conclusion that the bug was not fixed. That is the first fact. If you test the functionality in the proper environment, the bug was still reproducible. That fact does not lie; anyone can do the two clicks and check it.

The second contradicting fact was obviously my peer's claim that he fixed and tested it on the proper environment the day before. The two things cannot be true at the same time. And since I am looking right now at fact number two with my own eyes, in front of me, the only logical conclusion is... the first fact is not true. Because, remember, the two things cannot be true at the same time.

Now, I am not saying that my colleague lied and did not fix the bug or did not test it. My impression at the moment was "well, he probably tested it in some other environment by mistake, or forgot to push the code"... any of those thousand little things that go wrong in our day-to-day. Those silly mistakes that we all are victims of.

Since he was not in yet, I placed a temporary fix so nobody was blocked, and that was it.

# The daily

In the daily stand-up meeting, we shared our two contradicting facts:

1. His: "I fixed and tested the code yesterday"
2. Mine: "The bug is not fixed"

How can that be possible? After the daily, we obviously met together to try to figure out what was happening. He was adamant as I shared my screen, and he was looking with his own eyes how the bug was still there. He was really upset because he remembered all the tests he performed the day before, with very specific details. I mean, it was not the typical "two clicks test"; he went the extra mile and tried several critical test cases, all working fine. He could not understand what he was seeing.

The obvious conclusion was the same: since fact number two is true, it can only mean that fact number one is false. Which was impossible for him to accept. Again, what is happening here? He started to doubt his own claim, thinking "maybe I mixed up environments yesterday after all..."

And then, he saw the light. He proceeded to restart the environment where we both were looking at the bug, and after the restart... The bug was not there!

# The evil casuistic

It turns out that the bug was related to some degradation over time, so the fix worked when the application started, but then the conditions degraded in a way that made the bug appear again. That was the light we were hoping for. How could those two facts be true at the same time? Because we were ignoring a _third_ fact: **time**. Time had an effect on the fix, making both original facts true at the same time:

He was obviously testing the correct environment and checking everything, so the bug was fixed, but then a whole night passed in between, and that is why I was looking at the bug the next morning.

# Beware of false positives

We found the proper fix taking in account this degradation problem and that was the end of it. Everything went down as a funny anecdote. 

I consider this instance a very good learning experience. Is not often when you found two contradicting facts being true at the same time. And these two couldn't be more true, both of them.

This example illustrates the intricate nature of relying solely on facts in decision-making processes. The analytical approach, grounded in empirical evidence, initially led to the conclusion that one fact must be false due to the contradiction between the other. However, the eventual resolution of the issue uncovered a **critical oversight.**

I learnt the lesson of considering the limitations of relying solely on immediate observations. It serves as a poignant reminder to beware of false positives and to approach problem-solving with a comprehensive understanding of all relevant factors, even those as seemingly intangible as the passage of time.

## References:

* _Illustration <a href="https://www.behance.net/nuriabalaguesola" target="_blank">Núria Balagué</a>_