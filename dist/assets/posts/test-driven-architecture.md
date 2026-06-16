I have been revisiting the classic by Kent Beck, “Extreme Programming Explained”, and I found a very interesting thought about one of the roles on the XP team: **architects.**

# Communicating architectural intent

According to his definition:

_[…] architects on and XP team look for and execute **large-scale refactoring**, write **system-level tests** that stress the architecture, and also implement stories. […]_

What I find interesting about that, is the system level tests as they can communicate **architectural intent**. To achieve a high-capacity environment, you don’t want to be stuck to an architecture that worked at the beginning of the project but maybe does not fit the actual requirements. You want to make architectural changes in small, safe steps and that always is a challenge.
To achieve this, one option is to have a sophisticated stress testing environment. Then, when you want to improve the architecture, you would first improve the stress tests until the system breaks. Then you would improve the architecture just enough to run the tests. You are suggesting or communicating architectural improvement through tests.

# Achieving the same goal with different tools

When solving a problem and implementing a solution that satisfy our product owner or client, we can find a situation where we can apply different tools to reach the same goal. It may be tempting to “re-use” one of the actual tools that we use, because we know them and feel comfortable with them. But it is also our responsibility to try to find the correct answer to every question.

We can feel more comfortable making the decision if we prove our point with system-level tests that stress our application to reach the new goals that we need. When implementing the solution, then we can go on with the comfortable tool that we know, or be creative and try new stuff.

I have faced a similar situation when developing a new service, where we had doubts about using Neo4J Graphdb solution, or instead try to solve the problem using an existing instance of ElasticSearch. The final decision is not relevant for the point of this post but I think we can use this approach for future similar situations. Let's write tests that really push the limits that we really want to achieve and then met this needs with code. Whatever the tool name is, our primary goal should be always pass the tests with excellent results.

We have to be honest about where we want to be and write tests according to these needs.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-city-buildings-project-d-wireframe-print-urban-plan-architecture-design-real-estate-industry-image58883945" target="_blank">58883945</a> © <a href="https://www.dreamstime.com/niserin_info" target="_blank">Michal Bednarek</a> | <a href="https://www.dreamstime.com/photos-images/architecture.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://en.wikipedia.org/wiki/Domain-driven_design" target="_blank" alt="Domain Driven Design by Wikipedia">Domain Driven Design by Wikipedia</a>_
