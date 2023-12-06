Some thoughts about the amount of code you write that never see production and how to take it.

# The context

We were asked to implement a new feature, let's say, selling apples. Not groceries, not fruits, just apples. Well, maybe on the next Sprint we will add bananas to sell as well. But that's it, apples now and bananas later.

We all love to code for lists instead of instances, so the coder assigned to the task designed a beautiful code supporting a whole list of fruits, even it was clear from the start that business just needed apples _for now_. The shipping day arrived and the code was delivered on time, nice and easy. Apples were sold, happy days.

When planning the next Sprint, business tells the team that the users kind-of/sort-of like the apple feature but not as much as they thought. Besides, the team responsible to prepare the bananas to sell, is raising their hand saying that they won't be ready for the near future. Bananas are really hard (and expensive) to grown and collect, so business is clearly thinking about letting go the idea of adding bananas. But you know how business is... they won't say _"we won't sell bananas ever"_ because they don´t want to close any door, they say _"right now, it is not necessary"_.

# Dealing with frustration

The developer that made the feature was furious. He was also truly frustrated as his code will never be used on production. He keep repeating to me _"that was a waste of time"_.

Was it really?

* First of all, we were told to ship the feature **Sell apples** with the possibility of adding bananas as well _in the future_. We did not have to add the possibility for bananas nor the fancy **Sell fruits** feature. It was cool, sure, but not needed at the moment and as it turn out to be, completely unnecessary.

* Second of all, if you feel like your coding was a waste of time just because that code will not run on production, maybe you did something wrong. Every coding opportunity should be fulfilling and be use to learn. More important, every time you code, you should left the code cleaner than you found it. This whole minor (sometimes huge) refactors will see the light of production. Some other developer will benefit from that so you already did something good for the team, and so for the project.

* Third, your code does not have any purpose by _itself_. Your code is only worth as it is useful for the client. You may think that balancing that binary tree on that particular way is super clever, elegant and nice, every one thinks that. Well, every _developer_ will think that.
  But if it does not add value to the costumer (even when the costumer is other developers), that beautiful binary tree solution is worthless.

The way it usually goes, once the developer goes over the frustration, comes the next phase:

# The mythical feature to be

_"Well, let's keep it for the future"._ That is tempting, and sometimes hard to avoid but let's think about it. You will have to maintain code that it is not used. You will have to keep the tests updated and that implementation will be taken into account when the whole design of the application evolves. That little part left there _for the future_ may affect to the implementation of actual needed features. Some newcomer to the project could see the feature and think that we are really selling fruits. Why shouldn't he? At the end of the day, the code tells the story and it is clear that we are selling fruits. Well... wrong, it is only apples dude.

# Commented code

Another typical way to keep the code but making clear that it is not used, is comment it.

I don't even read it anymore. I just delete it and push the change. I can't think of any reason to have commented code on the repository.

The code has to be ready to be shipped at any time, that is one of the Continuous Delivery principle. Why commented code should be on production? It does not makes any sense.

_But maybe someday, we will be asked to sell fruits._ That is what GIT is for (or any other version control tool). Go back to that commit, to the original implementation and take a look and what you did. Try to reused it then, when the feature is really needed. Most of the time you will find that the code base now is so much different now that the old implementation does not even work anymore.

# Deleting code will make you free

There is some tendency to avoid deleting code. Specially when is good clean code. But for that case, less is always better:

**The only code that never fails, is the one that don't exist.**

We could say the same thing for all the tasks related to the code:

* Testing
* Maintaining
* Refactoring
* Huge etc...

Do not put yourself on the position of having to maintain, test or refactor code that it is not adding value to the costumer. **Delete code**, don't be afraid, GIT is your friend if you delete something by mistake.

## References

* _Photo <a href="https://www.dreamstime.com/stock-photos-face-clock-sand-old-image31650463" target="_blank">31650463</a> © <a href="https://www.dreamstime.com/nomadsoul1_info" target="_blank">Nomadsoul1</a> | <a href="https://www.dreamstime.com/photos-images/sand-clock.html" target="_blank">Dreamstime.com</a>_
