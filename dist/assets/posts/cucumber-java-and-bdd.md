# Some context

Behavior-driven development (BDD) is a software development process that emerged from test-driven development (TDD). It combines the general techniques and principles of TDD with ideas from domain-driven design and object-oriented analysis and design to provide software development and management teams with shared tools and a shared process to collaborate on software development.

# BDD tools

Although BDD is principally an idea about how software development should be managed by both business interests and technical insight, the practice of BDD does assume the use of specialised software tools to support the development process. Although these tools are often developed specifically for use in BDD projects, they can be seen as specialised forms of the tooling that supports test-driven development. The tools serve to add automation to the ubiquitous language that is a central theme of BDD. [font: wikipedia]

In the project that I am current working on, we have been using Cucumber as a BDD tool. These are the steps usually followed by the team:

![BDD Roles](/assets/images/cucumberJavaAndBdd/bddRoles.png#postImageBig)

## Roles explained

1. The product owner or business analyst, writes the acceptance criteria on the JIRA task. He agrees with QA about all the things needed for the user story to be accepted. Here we can difference between the "Feature acceptance criteria" and the "QA acceptance criteria". When both criteria is reached, the user story is done.
2. The developer makes the effort to read the acceptance criteria on JIRA and transform it to Gherkins language in form of features files. That way the developer acquires business vision. Once all the criteria is reached, the html report from Cucumber is available.
3. The QA and the PO (or BA) checks the html report from Cucumber to see if the user story is as the thought it will be. If so, we can move on to the next. If don't, they can create a new JIRA story (or bug depending on the case) and start again.

# Take over

If you want to start using Cucumber in your project, you can start by looking to this simple POC I wrote:

<a href="https://github.com/joantolos/cucumber" alt="Cucumber POC" target="_blank">Cucumber POC</a>

It contains the basics to install cucumber on your code and start using it. Hope this helps other developers to communicate better with Product Owners and Business Analysts and achieve the project goals.

## References
 
* _Photo <a href="https://www.dreamstime.com/royalty-free-stock-photo-cucumber-slices-background-image24393695" target="_blank">24393695</a> © <a href="https://www.dreamstime.com/sumnersgraphicsinc_info" target="_blank">Ron Sumners</a> | <a href="https://www.dreamstime.com/photos-images/cucumber.html" target="_blank">Dreamstime.com</a>_
