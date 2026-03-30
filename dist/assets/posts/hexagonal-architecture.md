The role of software architect has as many definitions as there are companies. This is a term that, in part, has lost its meaning, as it depends so heavily on the organization that trying to create a single definition is very difficult. The role can range from expert programmer to defining the company's strategic technical direction.

I want to discuss the architecture of a piece of software, though some may consider this **software design** rather than **software architecture**, which is fine. The main goal of this post is to examine some of the most commonly used software architectures and learn how to choose between them based on requirements. Since Microservices Architecture is so widespread, I want to give special attention to Domain-Driven Design (DDD) and Hexagonal Architecture, which, by consensus, are considered the most appropriate ways to implement microservices.

This post is based basically on three books:

* <a href="https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/" target="_blank">Fundamentals of Software Architecture O'Reilly</a>
* <a href="https://www.amazon.com/Microservices-Patterns-examples-Chris-Richardson/dp/1617294543" target="_blank">Microservices Patterns: With examples in Java</a>
* <a href="https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215" target="_blank">Domain-Driven Design: Tackling Complexity in the Heart of Software</a>

# Architecture Characteristics or "the ilities"

When designing software, it's not enough to think only in terms of features, **what** the system does. We also need to think about the **how**: how well the system performs, how easily it can be maintained, how it will scale when usage grows, or how safe it is when things go wrong. These qualities are often called **architecture characteristics** (sometimes nicknamed "the _-ilities_" because many of them end in -ility).

Architecture characteristics define the critical qualities of a system that influence its structure and design decisions. They are the **non-functional requirements** that shape the architecture, often cutting across features and modules. For example, two systems might implement the same functionality, but one may prioritize security and reliability while the other emphasizes speed and scalability, leading to very different architectural choices.

In short, architecture characteristics are the guiding qualities that ensure a system isn't just working, but working in the right way for its business and operational context. 

Let's consider some of them:

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
    - **Leverageability/reuse:** Ability to leverage common components across multiple products.
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

We all want everything, of course. But this is impossible. No single architectural style can achieve all of these capabilities at once. Moreover, some are mutually exclusive.

Applications can only support a few architectural characteristics for various reasons. First, each supported characteristic requires design effort and possibly structural support. Second, the larger issue is that each architectural characteristic often impacts others. For example, if you want to improve security, it will almost certainly negatively impact performance: the application will need to perform additional on-the-fly encryption, add layers of indirection for secrets hiding, and other activities that may degrade performance.

The good news is that we don't need all of them. In fact, you likely need just a few key characteristics for your application to thrive. Focus on those. It's important to <a href="https://youtu.be/krxU5Y9lCS8?si=lbbwSBIKh0hGB-sM" target="_blank">differentiate between what we want and what we truly need.</a>

Let's consider an example. **Scalability** is always desirable. Everyone wants scalability, right? But do you need it enough to justify the trade-offs? Does your application rely on constant growth to succeed? Does your business model require exponential user growth? Apps like Twitter or Instagram, which base their models on having a huge, constantly growing user base, obviously need that level of hard-core scalability. But... are you building Twitter? Let's be realistic and carefully measure the number of users we expect.

Scalability is very costly, and we lose many other useful characteristics if we prioritize it too heavily, **simplicity** being one of the most obvious. Scalable applications are often not simple.

# The laws of architecture

We can distile the above explanation into two laws:

- **Everything in software architecture is a trade-off:** Every decision you make in software architecture comes with both benefits and drawbacks. In other words, there is no perfect solution that satisfies all requirements without some compromises.
- **Why is more important than how:** Focusing on "why" helps ensure that architecture aligns with long-term goals and solves real problems, rather than just adding complexity for complexity's sake. By understanding the underlying purpose, architects can make informed decisions that adapt to future changes in technology and requirements.

# Domain-Driven Design (DDD): Building Software Around the Business

Before diving into Hexagonal Architecture, it helps to understand the idea of Domain-Driven Design (DDD), since Hexagonal is one of the ways to put DDD principles into practice.

At its core, DDD is about aligning software with the business domain it serves. Instead of starting with databases, frameworks, or technical layers, DDD begins with the domain—the real-world problem space your application is meant to solve. The goal is to capture the knowledge of domain experts (people who understand the business) and reflect it directly in the software's structure and language.

DDD emphasizes concepts like a **ubiquitous language** (a shared vocabulary between developers and business experts), **entities** and **value objects** that model the business, and **bounded contexts** that define clear boundaries between different parts of the domain. This approach keeps the core of the system focused on business logic, while technical concerns like databases, APIs, or user interfaces are treated as secondary details that can change over time.

DDD helps us design systems where the software naturally expresses the business rules.

 # The relationship between DDD and Hexagonal Architecture

- DDD is a philosophy for designing software that reflects complex business domains.
- Hexagonal Architecture is **one way** to implement DDD by ensuring the core domain logic is decoupled from external systems.
- Other architectural styles that can be used to implement DDD include:
    - Layered Architecture (traditional approach)
    - Clean Architecture (concentric rings, similar to Hexagonal)
    - CQRS (separating command/write and query/read sides)
    - Event-Driven Architecture (EDA) (using events for communication between domain contexts)

Each of these architectures helps achieve the goals of DDD but offers different ways to structure the application based on your specific needs (e.g., scalability, modularity, testing).

# Hexagonal architecture

Hexagonal Architecture, also known as the **Ports and Adapters pattern**, was introduced by Alistair Cockburn in the early 2000s. Its goal is simple yet powerful: **separate the business logic** (the core domain) **from the external world** (databases, user interfaces, messaging systems, APIs, etc.).

In traditional layered architectures, the domain model often ends up depending directly on external concerns: databases, frameworks, or web controllers. Over time, this makes systems brittle: changing the database, introducing a new API, or adding an integration can require deep changes to the core logic. Hexagonal Architecture flips this dependency around. The domain is placed at the center, fully isolated, and everything else connects to it through well-defined boundaries.

The metaphor of a hexagon comes from the idea that the system can have multiple “sides” (ports), each connected to the outside world by adapters. These adapters handle the details of communication, persistence, or presentation, while the core logic remains untouched. By the way, it doesn't have to be **six** sides... the "hexagon" is just an image to remember.

![Mascot](/assets/images/hexagonalArchitecture/hexagon.webp#postImageBig)

## Key Concepts

- **Domain Core:** The heart of the application containing business rules, entities, and value objects. It has no knowledge of databases, frameworks, or user interfaces.
- **Ports:** Interfaces that define the entry points (driving ports) and exit points (driven ports) of the application. Examples include use cases exposed to the outside world, or repository interfaces that define how data should be retrieved.
- **Adapters:** Implementations of those ports, connecting the domain to external systems. For example, a REST controller can be an adapter for a driving port, and a JPA repository an adapter for a driven port.
- **Aggregates:** A cluster of related entities and value objects treated as a single unit of consistency. An aggregate defines a clear boundary for business rules and ensures invariants are enforced. Each aggregate has a root (the aggregate root) that acts as the only entry point for interacting with the group, guaranteeing that changes respect the business constraints.

# Beyond DDD

It may sound obvious that designing software around the business domain is the best choice and DDD certainly makes a strong case for it. But the **domain is not the only possible driver for design.** Depending on the context, priorities, or team culture, you might choose to organize your system around different concerns such as data, behavior, models, users, or components. Each perspective brings its own strengths and trade-offs.

- **Data-Driven Design:** The structure of the system is guided primarily by the shape of the data and its storage. Databases and schemas tend to be the starting point.
- **Behavior-Driven Development (BDD):** Focuses on system behavior through examples and scenarios written in natural language, bridging the gap between business and developers.
- **Model-Driven Engineering (MDE):** Uses abstract models (often diagrams or DSLs) as the primary artifacts, from which code and other deliverables can be generated.
- **User-Centered Design (UCD):** Puts end users at the center, prioritizing usability and user experience. The design evolves around user needs, goals, and feedback.
- **Component-Based Design:** Breaks systems into reusable, independent components that can be composed together, improving modularity and maintainability.

In practice, many real-world systems combine these approaches. What matters is choosing the perspective that best serves your project's goals and context.

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
* _<a href="https://hemanthhari2000.medium.com/the-ports-and-adapters-pattern-unraveling-the-mystery-2efbf678ab9b" target="_blank">The Ports and Adapters Pattern: Unraveling the Mystery</a>_
* _<a href="https://en.wikipedia.org/wiki/Domain-driven_design" target="_blank">Wikipedia: Domain Driven Design</a>_
* _<a href="https://www.linkedin.com/pulse/stop-using-domain-driven-design-šimon-rácz" target="_blank">Stop using Domain-Driven Design</a>_