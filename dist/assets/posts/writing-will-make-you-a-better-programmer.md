I tell stories to my children at bedtime, I suppose every parent does that more or less. We have two different versions: **story with book** and **story without book**. For the first option, I read from a children book and on the second option, I tell a story just with my voice, not from a book.

The thing is, when I tell stories I use to invent adventures or things related with the day to day of my kids, and they really love that. Also, I try to inject some kind of "lesson", for example, if one of them did something wrong during the day, I try to introduce something similar on the story and the protagonist of the story does the right thing, and so I hope my kids get the message and don't do it again. I believe (hope) it works.

Anyway, when I invent stories, I don't remember any minor detail... in fact I can't remember practically anything from the day before story. But **they do**... specially the older one... He gets really upset when I mess up some detail from the story because he remembers everything! He says _tell us again the story about the elephant..._ and I can't remember for the life of me what elephant is he talking about.

I tried to keep some kind of track and I ended up with a complex multiverse with a couple of Smurfs traveling on time... the story got more and more complicated and I loose myself easily.

![Smurfs](/assets/images/writingWillMakeYouABetterProgrammer/smurf.png#postImageSmall)

In short... It's a mess...

To avoid this mess, I decided some time ago to write an actual story, so I can go to it if I forget something and also so I have a base schema to build from. I have been writing a pirates story where the protagonists are actually my children, and they love it. To me, it's really easy to remember because I have read so many stories like that when I was little and I know the arc stories by heart. Also, if I loose myself I always go to the hero archetype, and then it's easy to keep going.

When I started to write the story, I realised how difficult it is to write fiction but more important... since I write that story... I write better code. I have seen with my own eyes how **writing is making me a better programmer.**

# Code simplicity by Max Kanat-Alexander

I can't recommend this book enough:

![Code simplicity](/assets/images/writingWillMakeYouABetterProgrammer/codeSimplicity.png#postImageSmall)

It is really good, it reads easy, it is short and on point. Everything is gold, but I remember one concept that stuck with me: **_code is more times read than written_**

Meaning, we write code for others human beings to read, not for the machine. The compiler (or interpret) will eat almost anything that you trow at it (if it doesn't have syntax errors), but that the code compiles does not mean that it is good code. We all know that.

Do not write code for the machine, write code for your fellow peer that will have to understand that code a year from now (or yourself for that matter).

The most important lesson I took from that book is that your code is better the better it is read. If it is well written, it reads easily.

# Why writing matters for engineers

If you asked one hundred people on the street if they understand how a refrigerator works, most would respond, yes, they do. But ask them to then produce a detailed, step-by-step explanation of how exactly a refrigerator works, and you would likely hear silence or stammering. This powerful but inaccurate feeling of knowing is what Leonid Rozenblit and Frank Keil in 2002 termed, **the illusion of explanatory depth**, stating, _“Most people feel they understand the world with far greater detail, coherence, and depth than they really do.”_

If you want to experience these phenomena, just try to make a presentation about something you know about. You will discover how we believe we understand the word better than we really do. Or... you can just have kids.

My child once asked me why the sky is blue. I smiled at him thinking "how nice it's his innocence..." then I try to answer the question, and well... let's say I ended up doing a few Google searches. Don't cheat, don't go to the Internet... do you know why the sky is blue?

I bet you will know from now on.

That is why it is important to write and make presentations, in order to be aware of those knowledge gaps.

# Writing tips

There are a few writing tips that are vey useful and easy to understand (but difficult to master). I am going to explain them from the perspective of a technical document, blog post or similar. Something related to some kind of engineering pursuit.

1. When writing, provide **context** instead of **details**. Context is provided when you use _"why, what, who, how, etc"._ When writing documentation, or explaining some theory, it is way better to provide context than details. If the reader has a clear understanding of the whys, whats, etc... it can always go deeper and deeper with details.
   If you overflow the reader with details, it is easy to lose focus of the point you are trying to make. Engineers are tilted through details, that is part of the nature of the job. We have to swim deep in details in order to build something so is only natural to try to explain it the same way. Then you end up with detailed documents with long lists of lines of code that made perfect sense while writing, but are very difficult to follow to an outsider.

2. Take into consideration the curse of knowledge, there is no way to get rid of it. It states something like: **"once you know something, you can't unknown it"**. All your knowledge will be build upon your previous one, even if the previous one is wrong, you will never "unknown it". You can learn that it is wrong, but you will always build on it.
   That makes you explain things with the assumption that everyone knows what you know. And that premise is, of course, false. So, you have to have some kind of idea of what your audience is and adjust your explanation. If you want to explain how an operative system works, you can start by threads and processes, or computers and transistors, or... you can start from the Big Bang.

> _Once upon a time, a monkey grabbed a stick and some millions years later... operative systems happened._

3. Avoid jargon or complex language. This is another difficult one... as common as it is the temptation to provide unnecessary details, it is the temptation to use jargon and very specific language. It makes perfect sense when you write it, but it is easier to understand even if you have to make a longer path using common language.

4. Try to write a couple of levels below of what you can actually write.

> _<a href="https://www.wyliecomm.com/2021/08/whats-the-latest-u-s-literacy-rate/#_ftn2" target="_blank" alt="'The average American reads at the 7th- to 8th-grade level. — The Literacy Project'">'The average American reads at the 7th- to 8th-grade level. — The Literacy Project'</a>_

Part of the key to success to big "bestsellers" novels is there are actually written aiming at that 7th grade level. I am not saying that in a pejorative way, I really enjoy "page turners" novels. They require a high skill level to write them.
Simplify. Simplicity is the key. Even when you have to be a bit more verbose, trying to make the point a cross with simplicity is always a safe bet.

5. Try to tell a story. Stories make 20% more comprehensive what you are trying to say. It does not have to be like a fiction story, but try to maintain a certain structure as if it was (introduction, body and conclusion).

This has been used with children for ages. Take this book for example, <a href="https://en.wikipedia.org/wiki/The_Number_Devil" target="_blank" alt="The Number Devil: A Mathematical Adventure">The Number Devil: A Mathematical Adventure</a>

![Number Devil](/assets/images/writingWillMakeYouABetterProgrammer/numberDevil.jpg#postImageSmall)

It tries to expose the fun part of mathematics to children by means of telling a story.

5. Be concise. Avoid redundancy when possible even thought repetition is a well known tool to make a point. You have to be able to repeat your idea enough so it stays on the reader mind but without being redundant. A simple way to do that is follow these simple three steps:

- Expose what you are going to say
- Say it
- Expose what you just said

Imagine the first and last step as a bullet point list. You are stressing the idea three times without being redundant and on the last step you can add nuance and details because the theme has already been explained.

6. Practice, practice, practice. Imagine playing the violin... no matter how much you read about it, you will have to spend a thousand hours to be able to play at a certain level.

> _<a href="https://www.nytimes.com/2009/11/29/nyregion/29fyi.html" target="_blank" alt="'How do you get to Carnegie Hall?' 'Practice, practice, practice'">'How do you get to Carnegie Hall?' 'Practice, practice, practice'</a>_

# Conclusion

Write. Write a blog, write stories for your children, write a journal... whatever it is you like. What it is certain is that writing will make you a better programmer.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-quill-pen-ink-well-parchment-paper-resting-blank-copy-space-message-image53502337" target="_blank">53502337</a> © <a href="https://www.dreamstime.com/flynt_info" target="_blank">Flynt</a> | <a href="https://www.dreamstime.com/photos-images/pen.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://amzn.to/3xIMC7a" target="_blank" alt="Code Simplicity by Max Kanat-Alexander">Code Simplicity by Max Kanat-Alexander</a>_
* _<a href="https://www.edge.org/response-detail/27117" target="_blank" alt="Edge: The Illusion of Explanatory Depth">Edge: The Illusion of Explanatory Depth</a>_
* _<a href="https://en.wikipedia.org/wiki/The_Number_Devil" target="_blank" alt="The Number Devil: A Mathematical Adventure">The Number Devil: A Mathematical Adventure</a>_
* _<a href="https://www.wyliecomm.com/2021/08/whats-the-latest-u-s-literacy-rate/#_ftn2" target="_blank" alt="What’s the latest U.S. literacy rate?">What’s the latest U.S. literacy rate?</a>_
