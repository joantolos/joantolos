The role of software architect has some many definitions as there are companies. This is a term that has lost its meaning, as it depends so much of the organization that trying to create a single definition is very hard. It can range from expert programmer up to defining the strategic technical direction for the company.

# The laws of architecture

- Everything in software architecture is a trade-off.
- Why is more important than how.

# Architecture Characteristics or "the ilities"

- **Operational Characteristics:**
    - **Availability:** How long the system will need to be available (if 24/7, steps need to be in place to allow the system to be up and running quickly in case of any failure).
    - **Continuity:** Disaster recovery capability.
    - **Performance:** Including stress testing, peak analysis, analysis of the frequency of functions used, capacity required, and response times. Performance acceptance sometimes requires an exercise of its own, taking months to complete.
    - **Recoverability:** Business continuity requirements. This will affect the backup strategy and requirements for duplicated hardware.
    - **Reliability/safety:** Assess if the system needs to be fail-safe, or if it is mission critical in a way that affects lives. If it fails, will it cost the company large sums of money?
    - **Robustness:** Ability to handle error and boundary conditions while running if something outside our control occurs like the Internet connection going down, a power outage or a hardware failure.
    - **Scalability:** Ability for the system to perform and operate as the number of users or requests increases.

- **Structural Characteristics:**
    - **Configurability:** Ability for the end users to easily change aspects of the software's behaviour and configuration through usable interfaces.
    - **Extensibility:** How important it is to plug new pieces of functionality in.
    - **Installability:** Ease of system installation on all necessary platforms.
    - **Leverageabiliy/reuse:** Ability to leverage common components across multiple products.
    - **Localization:** Support for multiple languages on enty/query screens in data fields; on reports, multiple character requirements and units of measure or currencies.
    - **Maintainability:** How easy it is to apply changes and enhance the system?
    - **Portability:** Does the system need to run on more than one platform?
    - **Supportability:** What level of technical support is needed by the application? What level of logging and other facilities are required to debug errors in the system?
    - **Upgradeability:** Ability to easily/quickly upgrade from a previous version of this application/solution to a newer version on servers and clients.

- **Cross-cutting Characteristics:**
    - **Accessibility:** Access to all your users, including those with disabilities like colorblindness or hearing loss.
    - **Archivability:** Will the data need to be archived or deleted after a period of time?
    - **Authentication:** Security requirements to ensure users are who they say they are.
    - **Authorization:** Security requierements to ensure users can access only certain functions within the application.
    - **Legal:** What legislative constraints is the system operating in? What reservation of rights does the company require? Any regulations regarding the way the application is to be build or deployed?
    - **Privacy:** Ability to hide transactions from internal company employees (Encrypted transactions).
    - **Security:** Does the data need to be encrypted in the database? Encrypted for network communication between internal systems? What type of authentication needs to be in place for remote user access?
    - **Usability/achievability:** Level of training required for users to achieve their goals with the application/solution. Usability requirements need to be treated as seriously as any other architectural issue.

# I want it all

We all want them all, of course. But this is just impossible... no single architectural style can achive all of those capabilities at the same time. More over, some are mutually exclusive from one another.

Applications can only support a few of the architecture characteristics listed for a variety of reasons. First, each of the supported characteristics requires design effort and perhaps structural support. Second, the bigger problem lies with the fact that each architecture characteristic often has an impact on others. For example, if you wnat to improve security, it will almost certainly negatively impact performance: the application must do more on-the-fly encryption, indirection for secrets hiding, and other activities that potentially degrade performance.

The good news is that we don't need them all. In fact, you probably need just a few for your application to thrive (not just succeed but thrive), you should concentrate on them. We need to differentiate between **what we want** and **what we really need**.

Let's think of an example. It is always nice to have **scalability**, everyone wants scalability, right?. But do you really need it enough to pay the trade offs? Does your application rely in constant growth to succeed? Does your business model require an exponential grow of users? Apps like Twitter or Instagram, that base their business model on having huge amounts of always growing users, obviously need that kind of hard-core scalability. But... are you implementing Twitter? Let's be humble and really measure the number of users we expect to have.

Scalability is very expensive and we loose a lot of other useful characteritics if we go hard on it. Simplicity being one of the most obvious.

# The main available architectures

# Microservices

# Domain Driven Design (DDD)

 (why domain centric)

# Hexagonal architecture

 "However, we do follow and recommend the advice from domain-driven design to establish and use a ubiquitous language amongst fellow employees to help ensure fewer term-based misunderstandings"

# Conclusion

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photography-architecture-plan-tools-image12802962" target="_blank">12802962</a> © 
<a href="https://www.dreamstime.com/selestron76_info" target="_blank">Selestron76</a> | <a href="https://www.dreamstime.com/photos-images/architecture.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://fundamentalsofsoftwarearchitecture.com/" target="_blank">Fundamentals of Software Architecture Blog</a>_
* _<a href="https://www.amazon.com/Fundamentals-Software-Architecture-Comprehensive-Characteristics/dp/1492043451" target="_blank">Fundamentals of Software Architecture</a>_
* _<a href="https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/" target="_blank">Fundamentals of Software Architecture O'Reilly</a>_
* _<a href="https://microservices.io/patterns/microservices.html" target="_blank">Microservices Pattern</a>_
* _<a href="https://www.manning.com/books/microservices-patterns" target="_blank">Manning: Microservices Patterns: With examples in Java</a>_
* _<a href="https://www.amazon.com/Microservices-Patterns-examples-Chris-Richardson/dp/1617294543" target="_blank">Microservices Patterns: With examples in Java</a>_
* _<a href="https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215" target="_blank">Domain-Driven Design: Tackling Complexity in the Heart of Software</a>_
* _<a href="https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html" target="_blank">Isn't hexagonal architecture just 3 tier in a new dress?</a>_
* _<a href="https://www.linkedin.com/pulse/stop-using-domain-driven-design-šimon-rácz" target="_blank">Stop using Domain-Driven Design</a>_