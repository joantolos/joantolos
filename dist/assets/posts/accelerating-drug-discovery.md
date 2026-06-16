I don't usually talk about my job. I had to deliver a keynote presentation at a university about what we do in order to showcase our company and maybe attract some talent. It helps to order my thoughts if I write it down what I am trying to say. Someone told sometime ago that _"I learn by writing"_, and that looks awfully true. Since the post is done, I may as well share it in my personal blog post so all people can benefit from it.

# The innovation race

If we think about the advances that have occurred in the software industry in the last ten years, we see great leaps and paradigm shifts such as advances in machine learning, artificial intelligence, the Cloud revolution, even new working methodologies such as Agile. A lot has changed and improved in the last ten years in the software industry.
If we try to do the exercise of imagination of what awaits us in the next ten years, surely the suggestions border on science fiction.

Not all industries are lucky enough to be able to move at such a fast pace, but, since software has a huge impact on virtually every industry, they can benefit from that fact: **software moves fast.**

If we think about the life sciences, health and research industry, we realise that progress is much slower.

These are the most significant drugs that have been approved by the FDA in the last ten years.

![FDA approvals of the decade](/assets/images/acceleratingDrugDiscovery/FDA-approvals-of-the-decade.png#postImageBig)

> _The United States Food and Drug Administration is a federal agency of the Department of Health and Human Services. The FDA is responsible for protecting and promoting public health through the control and supervision of food safety, tobacco products, dietary supplements, prescription and over-the-counter pharmaceutical drugs (medications), vaccines, biopharmaceuticals, etc...
The FDA, along with the EMA (the equivalent in Europe) and the PMDA (the equivalent for Japan), lead the world in drug regulation_

There have been more advances on the last decade, but these are the ones that have had the most impact, the _"headlines"_ so to speak. We can see great improvements in **gene therapy, immunotherapy, rare disease, HIV and neurology.** These advances have a huge impact on society and on people's well-being.

Thirty years ago, diagnosis like _"cancer"_ or _"HIV"_ were almost a death sentence. Today, it's no fun news (that's for sure), but the chance of not only survival but to live a full healthy life is very high. On the last ten years, we can see heavy improvements for diseases like cancer, genetic disease, HIV, Multiple sclerosis, Alzheimer's disease or Parkinson.

# How drugs are made

However, the process of researching and creating a drug is long, slow and expensive. As it should... these innovations involve the health of human beings, so everything has to be done very carefully.

Making a gross simplification, we can sum up the whole process into three distinct faces: discovery, pre-clinical and clinical. **Discovery step** include identifying active ingredients from traditional medicines, classical pharmacology to investigate chemical libraries including small molecules, natural products, or plant extracts, and find those with therapeutic effects. **Pre-clinical step** include lab experiments divided in: in-vitro experiments (with molecules), in-vivo (with animals) and ex-vivo (with organs). **Clinical step** involve humans trials in the hospital, and includes three very specific phases.

Here is a graphic representation of the whole process.

![Drug development process](/assets/images/acceleratingDrugDiscovery/drug-development-process.png#postImageBig)

As we can see, it takes between ten and fifteen years to finish the whole process... from the idea to the patients.

Is there something we can do to accelerate that process? Can we leverage the power of software to improve that innovation?

As it turns out, yes, we can.

# The products

At <a href="https://clarivate.com/" target="_blank" alt="Clarivate">Clarivate</a>, we create applications that help accelerate **the whole process**, from beginning to end.

I am currently working on products focused on the pre-clinical step. Preclinical studies are designed to identify a lead candidate from several hits, develop the best procedure for new drug scale-up, select the best formulation, determine the route, frequency, and duration of exposure, and ultimately support the intended clinical trial design.

In short, everything that needs to happen **before** going into clinical development. Once you start the clinical trial, the process becomes extremely expensive, so anything we can do before starting that expensive phase, it's a huge improvement.

The <a href="https://clarivate.com/products/cortellis-family/" target="_blank" alt="Clarivate Cortellis application suite">Clarivate Cortellis application suite</a>, cover most of those needs. We achieve the goal with a curated combination of **architecture** and **methodology.** Let's dig in.

# Architecture

A software architecture or design aims to **solve a problem**. What is the problem we are trying to solve?

> _The industry of Life Sciences is slow by nature. We need to introduce products that help accelerate those processes. We need to inject fast pace in a business sector that, traditionally, **is not fast**._

Our solutions aim to be extremely **modern.** Meaning that have to be accessible, fast, easy to understand/use and very responsive to changing customer requirements. We listen to the customer feedback, respond quickly and deliver new features regularly. In order to achieve that, we need a modern architecture.

We have designed our own interpretation of the microservices' architecture, creating a logic separation of concerns that we divide on: front-end, middleware, backend, data and data master:

![Architecture generic layout](/assets/images/acceleratingDrugDiscovery/architecture.png#postImageMedium)

Following the principles of <a href="https://en.wikipedia.org/wiki/Cloud_native_computing" target="_blank" alt="Cloud native computing">Cloud native computing</a>, we take advantage of:

- Containers
- Autoscaling
- Content delivery
- Caching
- Automation
- API gateway
- Load balancing

Everything serving the purpose of <a href="https://en.wikipedia.org/wiki/CI/CD" target="_blank" alt="continuos integration and continuous delivery">continuous integration and continuous delivery.</a>

# Work Methodology

We embrace the <a href="https://en.wikipedia.org/wiki/Agile_software_development" target="_blank" alt="Agile software development">Agile software development</a> methodology in any flavour that you can imagine. With a heavy focus on the <a href="https://en.wikipedia.org/wiki/Extreme_programming" target="_blank" alt="Extreme programming">Extreme Programming</a> principles, we are flexible enough so each team can choose the best way to work in order to deliver.

The teams are <a href="https://en.wikipedia.org/wiki/Cross-functional_team" target="_blank" alt="cross-functional">cross-functional</a> and fully autonomous. Each team includes a product owner (or business analyst), QA, DevOps and developer roles. That means that a team can deliver a product on their own from the original idea to the final production application. The size of the team varies from ten to fifteen people. We try not to have teams bigger than that because the communication issues scale exponentially on bigger teams.

# Case study

Recently, in one of our regular meeting with clients, there was some doctor that pointed out that sometimes he uses one of our applications on the clinic while attending patients. That particular app, is not intended to be used that way, but as a part of a scientific research process. There is a feature build-in to quickly know the possible adverse effects of a particular drug, and all the toxic interactions that can produce. That doctor uses that information on his day-to-day clinic to make sure she is prescribing the correct drug.

Our business analyst quickly identified that use case as a new business opportunity.

For a new idea like this we usually start with the data. If we think about the diagram shown above, we start from the Data Master layer... **Do we have the data?** For this case, obviously yes, since the doctor was already consuming the data from the original app. **Do we need to create a new service to explore that data?** Probably not. Maybe we need to modify or expand some of them to accommodate some new specific feature. **Can we reuse some middleware services?** Maybe some, but we will probably have to create some specific new one that serves as API for the user interface. What about that interface... **should we use a web application?** It turns out that there is some opportunity if we create a mobile app, since the doctor mentioned that it would be useful while working in the hospital Emergency Room.

Now we have a roadmap, and it doesn't look hard to deliver. In a short amount of time, that app can be up and running, helping doctors on their day-to-day job.

# Take over

Nowadays, programming is almost a super-power. We have the luck to be able to work practically in any industry... automobile, aeronautics, research, artificial intelligence... even your elevator runs a bunch of software. We have to use our powers to do good. Choose the most satisfying path for you, but try to contribute to society, making the world a little bit better. There are plenty of options and (until now), we have to luck to be able to choose.

I always like to finish with a book recommendation for anyone who wants to dig deeper. There is no book that explain the entire work process at Clarivate, but I think everyone can benefit from this classic:

![Extreme Programming Explained: Embrace Change](/assets/images/acceleratingDrugDiscovery/extreme-programming-explained.png#postImageExtraSmall)

In <a href="https://www.amazon.es/Extreme-Programming-Explained-Embrace-Embracing/dp/0321278658/ref=sr_1_1?crid=2QLP98UKDDVUY&keywords=extreme+programming+explained&qid=1668417087&qu=eyJxc2MiOiIwLjkwIiwicXNhIjoiMC41NCIsInFzcCI6IjAuMjMifQ%3D%3D&sprefix=extreme+pro%2Caps%2C111&sr=8-1" target="_blank" alt="Extreme programming Explained">Extreme programming Explained</a>, Kent Beck (one of the proponents of the <a href="https://agilemanifesto.org" target="_blank" alt="Agile Manifesto">Agile Manifesto</a>), composes a set of values, principles and practices in order to deliver quality software in a fast pace. Practices like _pair programming_, _test driven develpment_ or _continuos integration_ date back to this book. A truly must read.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photography-athletes-passing-baton-relay-race-image29655362" target="_blank">29655362</a> © <a href="https://www.dreamstime.com/photographerlondon_info" target="_blank">Photographerlondon</a> | <a href="https://www.dreamstime.com/photos-images/relay-race.html" target="_blank">Dreamstime.com</a>_ 
* _<a href="https://clarivate.com/" target="_blank" alt="Clarivate">Clarivate</a>_
* _<a href="https://www.proclinical.com/blogs/2020-1/most-significant-fda-approvals-of-the-decade-2010-2019" target="_blank" alt="The most significant FDA approvals of the decade (2010-2019)">The most significant FDA approvals of the decade (2010-2019)</a>_
* _<a href="https://www.nebiolab.com/drug-discovery-and-development-process/" target="_blank" alt="Overview Of All Phases In Drug Development And Discovery Process">Overview Of All Phases In Drug Development And Discovery Process</a>_
* _<a href="https://www.sciencedirect.com/science/article/pii/S2211383522000521" target="_blank" alt="Why 90% of clinical drug development fails and how to improve it?">Why 90% of clinical drug development fails and how to improve it?</a>_
* _<a href="https://www.fda.gov/" target="_blank" alt="Food and Drug Administration">Food and Drug Administration</a>_
* _<a href="https://www.ema.europa.eu/en" target="_blank" alt="European Medicines Agencies">European Medicines Agencies</a>_
* _<a href="https://www.pmda.go.jp/english/" target="_blank" alt="Pharmaceuticals and Medical Devices Agency">Pharmaceuticals and Medical Devices Agency</a>_
* _<a href="https://clarivate.com/products/cortellis-family/" target="_blank" alt="Clarivate's Cortellis Family">Clarivate's Cortellis Family</a>_
* _<a href="https://en.wikipedia.org/wiki/Microservices" target="_blank" alt="Wikipedia: Microservices">Wikipedia: Microservices</a>_
* _<a href="https://en.wikipedia.org/wiki/Cloud_native_computing" target="_blank" alt="Cloud native computing">Wikipedia: Cloud native computing</a>_
* _<a href="https://en.wikipedia.org/wiki/CI/CD" target="_blank" alt="Wikipedia: Continuos integration and continuous delivery">Wikipedia: Continuos integration and continuous delivery</a>_
* _<a href="https://en.wikipedia.org/wiki/Agile_software_development" target="_blank" alt="Wikipedia: Agile software development">Wikipedia: Agile software development</a>_
* _<a href="https://en.wikipedia.org/wiki/Extreme_programming" target="_blank" alt="Wikipedia: Extreme programming">Wikipedia: Extreme programming</a>_
* _<a href="https://en.wikipedia.org/wiki/Cross-functional_team" target="_blank" alt="Wikipedia: Cross-functional team">Wikipedia: Cross-functional team</a>_
* _<a href="https://www.amazon.es/Extreme-Programming-Explained-Embrace-Embracing/dp/0321278658/ref=sr_1_1?crid=2QLP98UKDDVUY&keywords=extreme+programming+explained&qid=1668417087&qu=eyJxc2MiOiIwLjkwIiwicXNhIjoiMC41NCIsInFzcCI6IjAuMjMifQ%3D%3D&sprefix=extreme+pro%2Caps%2C111&sr=8-1" target="_blank" alt="Extreme programming Explained">Extreme programming Explained</a>_
* _<a href="https://agilemanifesto.org" target="_blank" alt="Agile Manifesto">Agile Manifesto</a>_
