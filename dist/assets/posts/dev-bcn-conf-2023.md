I have been lucky enough to attend to this year's edition of <a href="https://www.devbcn.com/" target="_blank" alt="Dev Bcn Conf">Dev Bcn Conf.</a> These are some thoughts and take-outs I want to share.

# The conference

The Dev Bcn Conf serves as a gathering hub for programmers, developers, and other professionals in the field of software development. It offers a valuable opportunity for networking and staying informed about coding practices and the latest advancements in programming.

This event is organized by the <a href="https://www.barcelonajug.org" target="_blank" alt="Barcelona JUG (Barcelona Java Users Group)">Barcelona JUG (Barcelona Java Users Group)</a>, in collaboration with a dedicated group of volunteers. Their collective efforts aim to establish the Dev Bcn Conf as a prominent event in the state, attracting industry professionals and enthusiasts alike. This year, the conference has expanded even further, evolving into a larger-scale event that goes beyond its previous "Java" focus, hence the decision to remove the "Java" prefix from its name.

![Mascot](/assets/images/devBcnConf2023/mascot.png#postImageExtraSmall)

# The talks

We attended lots of talks and it is quite difficult to try and extract an excerpt of all of them. I am going to make my effort writting down about the ones that inspired me to take action.

## Battling your Biased Brain

By <a href="https://twitter.com/PeterWessels" alt="Peter Wessels" target="_blank">Peter Wessels</a>, I found his talk on cognitive biases to be very interesting. While you may already be familiar with most of these biases, it's always beneficial to revisit them and keep them at the forefront of our minds. As software creators, these well-known and extensively researched cognitive biases have a significant impact on our day-to-day judgment.

- When labour leads to love, **The IKEA effect:** This phenomenon suggests that when individuals actively participate in the building process, it enhances their perception of the product's value. Surprisingly, studies indicate that people not only develop a preference for the furniture they assemble themselves but are also willing to pay a more for them, hence the term "IKEA effect." As developers and creators, we are undoubtedly susceptible to this bias. We invest our time and effort in crafting code and sometimes we fall in love with our creations. It's crucial to be mindful of the IKEA effect and recognize when it's necessary to let go of our meticulously crafted code.

- Joining the majority, **The bandwagon effect:** The tendency for people to adopt certain behaviors, styles, or attitudes simply because others are doing so. As software creators, again we are very susceptible to this bias. We tend to adopt the latest technologies just because of the "hype", sometimes without having a serious reflection about if we need those technologies or not. In a similar way, the **survivorship bias** favors the logical error of concentrating on entities that passed a selection process while overlooking those that did not, leading to incorrect conclusions because of incomplete data. To mitigate these biases, it is crucial to engage in honest conversations and involve multiple individuals in the decision-making process, ensuring a more comprehensive and balanced perspective.

- Bike Shed Effect: Also known as the **Parkinson's law of triviality.** This phenomenon highlights our tendency to spend a disproportionate amount of time on trivial and easy tasks compared to the more challenging and consequential ones simply because we find them more enjoyable. When combined with procrastination, it becomes a recipe for disaster. Our desire to feel useful often leads us to gravitate towards simpler tasks, causing delays in tackling the truly difficult and important ones. It's crucial to not only recognize and avoid this bias but also proactively automate our day-to-day trivial tasks, allowing us to focus on what truly matters. For instance, incorporating tools like <a href="https://checkstyle.sourceforge.io/" alt="Checkstyle" target="_blank">Checkstyle</a> can ensure that our code adheres to proper conventions, eliminating the need to spend time on aesthetic changes. Additionally, utilizing <a href="https://github.com/google/error-prone" alt="Google error-prone" target="_blank">Google error-prone</a> can help detect common programming mistakes during compilation, enabling us to concentrate on the bigger picture. By automating these repetitive and trivial aspects, we free up valuable time and mental energy for the tasks that genuinely require our attention and expertise.

Overall, a very nice talk reminding the importance of being aware of the tricks the mind sometimes plays on you.

## The battle of the AI coding assistants

By <a href="https://twitter.com/BoukeNijhuis" alt="Bouke Nijhuis" target="_blank">Bouke Nijhuis</a>, he explored the three main contenders in the coding assistant space: <a href="https://www.tabnine.com/" alt="Tabnine (aka Codota)" target="_blank">Tabnine (aka Codota)</a>, <a href="https://github.com/features/copilot" alt="GitHub Copilot" target="_blank">GitHub Copilot</a>, and <a href="https://openai.com/blog/chatgpt" alt="ChatGPT" target="_blank">ChatGPT.</a> If you haven't tried them out yet, I highly recommend doing so. Personally, I initially tested GitHub Copilot when it was released, then became curious about Tabnine, and ever since ChatGPT entered the scene, it has been the obvious choice for me.

Tabnine and Copilot share a similar approach to input. Both are installed as plugins in your IDE, allowing them to "read" your code and provide suggestions based on context. When you witness them in action, it's like experiencing a turbocharged autocomplete feature. While modern IDEs already do a good job with code suggestions and refactoring, these AI-powered assistants take it to the next level. Looks like autocomplete on steroids.

However, it's true that they occasionally make silly mistakes. For example, Copilot sometimes forgets to include the closing bracket when generating Java code. Additionally, they can get stuck in a loop of repetitive suggestions, leading to some odd behavior similar to allucinations.

I found these assistants particularly helpful when writing test cases for specific classes. They are very good at identifying edge cases and handling them accurately. However, there are instances where they get caught in a strange loop, producing nonsensical code or repeating the same test case multiple times.

Tabnine is a solid option when privacy and security are concerns. It offers an offline mode and can be self-hosted, making it a viable choice for large corporations focused on safeguarding their data. Moreover, Tabnine allows you to load your own models, providing a high level of customization.

On the other hand, ChatGPT takes a different approach by using prompts as input. This change improves considerabily the experience. Since you explicitly provide the code as context, you can engage in a "conversation" about it. This enables three unique capabilities that the others lack:

1. It can explain code
2. It can refactor code
3. It can find bugs

These three features are game-changers. 

Sometimes, while coding, you may sense that a particular piece of code can be implemented using a design pattern, but struggle to identify which one. With ChatGPT, you can provide the context and ask, _"Is there any design pattern applicable in this situation?"_ The results are astonishing. Moreover, the conversational nature of ChatGPT allows for iterative exploration until you find what you're looking for. Additionally, since it's prompt-based, you can write a test and ask ChatGPT to generate the code to fulfill it. When it comes to Test-Driven Development (TDD), this is the way to go.

Having tested all three assistants, I've come to the same conclusion as the speaker: **ChatGPT is the best.** It's like having a pair-programming partner who is always available, proficient in all programming languages, and possesses the exact expertise you are looking for at any time.

Admittedly, using ChatGPT requires copying and pasting code from your IDE to the browser, making it slower compared to the other two options. However, there is a potential solution on the horizon: JetBrains is developing a plugin called <a href="https://blog.jetbrains.com/idea/2023/06/ai-assistant-in-jetbrains-ides/" alt="AI assistant" target="_blank">AI assistant</a> that integrates directly with ChatGPT within your IDE.

Although it's currently available by invitation only (I'm already on the waiting list), the speaker had access and demonstrated it during the talk. The results were impressive. It truly combines the best of both worlds, allowing you to benefit from prompt-based input (e.g., selecting a piece of code and choosing "refactor this") while enjoying seamless integration provided by an IDE plugin.

I'm eagerly anticipating the opportunity to test it myself.

AI coding assistants are here to stay. It's crucial to familiarize ourselves with them and incorporate them into our daily workflow. Otherwise, the next generation of programmers, who will grow up with these solutions at their disposal, will have a significant advantage. Competing businesses will undoubtedly leverage these new tools for their benefit.

Far from being a threat to programmers and their craft (contrary to what some inflammatory headlines may suggest), these tools actually offer an incredible boost to productivity. They represent a genuine paradigm shift, and as developers, we should embrace this opportunity and fully leverage the potential of this technology.

## Stop building APIs

By Peter van Vliet, the concept of "just-in-time architecture" is introduced. Despite its click-baity title, it actually refers to a way of blurring the line between frontend and backend by incorporating a binding mechanism called a "mediator." While this idea is not new, there are well-established frameworks that operate in this manner, such as  <a href="https://trpc.io/" alt="tRPC" target="_blank">tRPC</a>, <a href="https://tempots.com/" alt="Tempo" target="_blank">Tempo</a>, and <a href="https://remult.dev/" alt="Remult" target="_blank">Remult.</a>

Later, this concept was taken to the next level with the emergence of meta-frameworks. Though the name may sound fancy, the most popular ones are actually frontend technologies that enable the creation of **frontend monoliths:**

- <a href="https://nextjs.org/" alt="NextJS" target="_blank">NextJS</a>
- <a href="https://remix.run/" alt="Remix" target="_blank">Remix</a>
- <a href="https://qwik.builder.io/" alt="Qwik" target="_blank">Qwik</a>
- <a href="https://start.solidjs.com/getting-started/what-is-solidstart" alt="Solid Start" target="_blank">Solid Start</a>
- <a href="https://nuxt.com/" alt="Nuxtjs" target="_blank">Nuxtjs</a>
- <a href="https://kit.svelte.dev/" alt="Sveltekit" target="_blank">Sveltekit</a>

I am sure that some of those names sounds familiar. The idea is to utilize the same technology for both frontend and backend, bringing the full-stack role closer to reality. While this approach offers obvious advantages, it also comes with its own drawbacks.

The speaker introduced their own solution to achieve this, called <a href="https://jitar.dev" alt="Jitar" target="_blank">Jitar</a>, a distributed runtime for JavaScript and TypeScript. When witnessed in action, it is quite impressive, as it seamlessly allows for backend code to be called from frontend components without differentiation. The framework handles the HTTP calls behind the scenes, making everything appear transparent from a developer's perspective.

Experienced developers often dismiss these "Swiss army knife" solutions that promise to do everything well, and they have a valid point. However, it is worth noting that experienced programmers tend to overvalue the complexity of the systems they are designing (myself included), sometimes making the problem seem more complicated than it actually is.

Frameworks of this kind are more than suitable for many simple requirements. We would be surprised to discover how many high-performance applications rely on such solutions. Therefore, we should not disregard this approach, particularly when considering proof-of-concepts (POCs) or minimum viable products (MVPs). Prototyping an idea rapidly, showcasing it, testing it, and failing quickly to iterate again is often more valuable than engaging in lofty discussions about technology and design. Ultimately, a working prototype beats any theoretical debate, every time.

## OpenTelemetry 101
<a href="https://www.linkedin.com/in/dimitris-finas" alt="Dimitris Finas" target="_blank">Dimitris Finas</a>, ofered a very nice talk about the observability framework <a href="https://opentelemetry.io/" alt="Open Telemetry." target="_blank">Open Telemetry.</a> I heard about it a long time a go and I was eager to see a simple introduction to evaluate its possibilites.

Open Telemetry is an **open-source** observability framework that enables comprehensive monitoring and tracing. It simplifies telemetry data collection, analysis, and export, offering a unified approach to gather metrics, traces, and logs, ensuring a deeper understanding of complex distributed systems. Its **vendor-agnostic** nature and standardized instrumentation libraries make integration across frameworks and languages seamless.

While big and stablished companies like <a href="https://newrelic.com/" alt="New Relic" target="_blank">New Relic</a> or <a href="https://www.dynatrace.com/" alt="New Relic" target="_blank">Dynatrace</a> offer robust solutions, Open Telemetry's flexibility, vendor neutrality, and community involvement make it an attractive choice. Since it is open source, there is a very big and established community behind it, the project is actually very mature. You can find virtually anything you need to start the implementation.

I would like to make a simple Proof of Concept (POC) with some existing services and see how it looks. This implementation goes along with the DevOps ecosystem, so it would be interesting to start some conversation about it.

## Qualities of a Highly Effective Architect

By <a href="https://twitter.com/venkat_s" alt="Venkat Subramaniam" target="_blank">Venkat Subramaniam</a>, I had the pleasure of attending yet another inspiring talk by Venkat. I must admit, I can't help but have a biased admiration for this guy. I first saw him in 2016, delivering a talk on functional programming, and ever since then, I have become a fan of his talks and books.

In this particular talk, Venkat delved into his own interpretation of the architect role while critically examining its typical pitfalls. Here is a summarized list of his key ideas:

- Be a mentor, not a tormentor.
- Criticize ideas, not people.
- Guide, don't dictate.
- Practice collective ownership.
- Allow developers to figure things out.
- Focus on the outcome, not just the process.
- Gain domain expertise.
- Learn to unlearn.
- Diversify your knowledge portfolio.
- Lead by example.
- Write code.
- Evolve the architecture.

Venkat dedicated considerable time to discussing each of these points. While understanding the architect role may vary from person to person, I believe each statement can be independently appreciated, allowing you to draw your own conclusions. Venkat did an excellent job of explaining his perspective, and after listening to his entire argument, I must say it resonated with me. I agree with many of his points.

If you haven't come across Venkat and his books yet, I highly recommend taking the time to explore them. You can find some of his talks on YouTube, and I particularly recommend <a href="https://www.youtube.com/watch?v=15X0qFtBqiQ" alt="Venkat Functional Programming talk" target="_blank">the one on functional programming.</a> It's well worth your time.

## How and why ($) to improve web performance in 2023

By <a href="https://twitter.com/verlok" alt="Andrea Verlicchi" target="_blank">Andrea Verlicchi</a>, a Google Developer Expert for Web Performance. He offered an overview of the new metrics that Google is considering to assess the responsiveness of your site. <a href="https://support.google.com/webmasters/answer/9205520?hl=en" alt="Google Core Web Vitals" target="_blank">Google Core Web Vitals</a> it's the new standard that Google is enforcing. It consist of a very complete report that shows how your pages perform, based on real world usage data. The data for the Core Web Vitals report comes from the <a href="https://developer.chrome.com/docs/crux/" alt="Chrome UX Reports" target="_blank">Chrome UX Reports</a>. The CrUX report gathers anonymized metrics about performance times from actual users visiting your URL (called field data). The CrUX database gathers information about URLs whether or not the URL is part of a Search Console property.

This are some of the metrics that are considering:

![Google core web vitals](/assets/images/devBcnConf2023/core-web-vitals.png#postImageBig)

Google plans to make page experience an official Google ranking factor. Page experience will be a mishmash of factors that Google considers important for user experience, including:

- HTTPS
- Mobile-friendliness
- Lack of interstitial pop ups
- “Safe-browsing” (basically, not having malware on your page)

And Core Web Vitals will be a super important part of that score.

## One request at a time: Highly available and performant clusters of single threaded nodes

By <a href="https://twitter.com/guillempg" alt="Guillem Plasencia Gallofré" target="_blank">Guillem Plasencia Gallofré</a> and <a href="https://www.linkedin.com/in/mtollari" alt="Mattia Tollari" target="_blank">Guillem Mattia Tollari</a>, they specialize in constructing financial trading exchanges that prioritize extremely low latency to avoid data inconsistencies, race conditions, and similar issues.

Their approach involves leveraging low-level computing techniques and technologies such as UDP or WebSockets. Initially, they started with <a href="https://martinfowler.com/articles/lmax.html" alt="The LMAX Architecture" target="_blank">the Disruptor Pattern</a> introduced by Martin Fowler in 2011 but eventually adopted the <a href="https://aeron.io/" alt="Aeron Framework" target="_blank">Aeron Framework</a> after multiple iterations.

> **Aeron** is an open-source messaging system designed for high-performance, reliable, and low-latency communication between components in distributed systems. It follows a publish-subscribe pattern, where publishers send messages to topics, and subscribers receive messages based on their subscriptions. Aeron aims to provide efficient message passing with minimal overhead and low latency, making it suitable for high-performance and real-time messaging use cases.

One notable feature of Aeron is its use of the UDP (User Datagram Protocol) protocol for message transport, enabling efficient multicast and unicast communication.

At first glance, Aeron may seem similar to <a href="https://kafka.apache.org/" alt="Apache Kafka" target="_blank">Apache Kafka</a>, but there are significant differences. While both can be used for some generic use cases, the devil lies in the details:

1. Different messaging models: Aeron focuses on latency, whereas Kafka excels in throughput.
2. Scalability and persistency: Aeron assumes message consumers can keep up with the incoming rate, while Kafka stores messages on disk and offers configurable retention policies for specified periods or sizes.
3. Ecosystem and use cases: Aeron is optimized for latency-sensitive and real-time applications, while Kafka boasts a broader ecosystem and is widely used for various scenarios.

Leveraging the Aeron framework, their solutions use replicated services and the **Raft consensus algorithm** to build highly available and performant applications. During their impressive demo, multiple services (deterministic state machines) randomly failed, yet the system transparently recovered without affecting the user interface or the end user. It was quite impresive seeing the different services start an _"election process"_ to elect a new leader once the leader node was down. They also demonstrated how to debug any state machine by simply reading the log. Since the machines are deterministic, one can replicate the actual behavior of any production machine on a local setup and pinpoint the exact point of error occurrence.

While the extreme low latency and availability may not be necessary for the Life Sciences products we develop (at least I don't see the need), it is still valuable to be aware of such frameworks. Witnessing how business needs drive technology and inspire innovative solutions is truly rewarding.

Overall, their talk was highly inspiring.

## Parenting + Sports = Tech Teams Management

By <a href="https://twitter.com/buenosvinos" alt="Carlos Buenosvinos Twitter" target="_blank">Carlos Buenosvinos</a>, this talk turned out to be a delightful surprise for me since I was familiar with the speaker. We actually attended the same high school and both played with code from an early age. I have vivid memories of spending long afternoons in front of my 386 PC, writing code in BASIC and PASCAL. We would compare notes, inspire each other, and, like typical teenagers, waste an enormous amount of time playing computer games. Our paths diverged when we entered different universities, with Carlos pursuing a career focused on management and leadership after years of high-level coding experince. He has been involved in the success of leading companies such as Atrápalo, PCComponentes, Emagister, Cashconverters, eBay, Seat CODE, Xing, and many others.

In his talk, Carlos aimed to establish connections between the experiences of being a parent, coaching sports teams, and managing tech teams. While he made various connections between the role of a father and that of a manager, the analogy can be tricky. Associating members of a technical team with children can oversimplify the complex dynamics and professional relationships within such teams. However, if we are willing to look beyond the surface and accept the analogy as an abstract concept, we can draw some interesting conclusions.

One key takeaway from the talk is Carlos's personal definition of maturity. To paraphrase, maturity entails transitioning from what you want to what you truly need, especially in terms of meeting the business's requirements. It forces us to consider the possibility that the development team (including myself) may not be as mature as we perceive ourselves to be. It also highlights the importance of managers establishing clear goals and boundaries for the team to function effectively.

Engaging in self-criticism of this nature can sometimes challenge our egos, but it is an exercise well worth undertaking.

# Some take overs

The community is vibrant and thriving, filled with creative individuals and innovative ideas. There is a big amount of tools available that fit virtually any business need you may have. As society continues to evolve, technology is keeping pace.

**Artificial Intelligence (AI)** and **Machine Learning (ML)** will undoubtedly play a significant role in the near future. However, these terms are broad, encompassing a range of applications. With generative AIs like ChatGPT or Stable Diffusion, we can expect to explore and apply technology in numerous exciting ways in the years to come. We are currently experiencing another paradigm shift, reminiscent of the invention of the Internet and the World Wide Web. Just pause for a moment to consider the business explosion the Internet brought about in its time. Nowadays, we casually request an Uber or book an Airbnb without a second thought. Things are rapidly changing, and in this era of constant technological evolution, it is crucial for us to stay updated.

Fortunately, I see a great deal of willingness and determination to adapt and progress. I am confident that we will seize the multitude of new opportunities that lie ahead of us.

# Books

Each time I attend a conference, I make it a point to gather a bunch of books for my wishlist. Most of the talks are based on some seriously good books. This year, I was particularly happy because I already had most of them in my collection, and the rest were right there on my wishlist, waiting to be devoured. I'm pretty sure you're all familiar with these gems because they're super popular. Without further ado, here's my list for this year:

## Engineering Management for the Rest of Us by Sarah Drasner

![Engineering Management for the Rest of Us](/assets/images/devBcnConf2023/engineeringManagementForTheRestofUs.png#postImageExtraSmall)

<a href="https://www.amazon.es/Engineering-Management-Rest-Sarah-Drasner/dp/B0BHX8BQ9C" alt="Engineering Management for the Rest of Us" target="_blank">_Engineering Management for the Rest of Us_</a> is an insightful and accessible guidebook that demystifies the complex world of engineering management for individuals without a technical background. Written with clarity and practicality in mind, this book equips aspiring managers, entrepreneurs, and leaders with the essential knowledge and skills needed to effectively oversee engineering teams and projects.

## Practices of an Agile Developer: Working in the Real World by Venkat Subramaniam

![Practices of an Agile Developer](/assets/images/devBcnConf2023/practicesOfAnAgileDeveloper.png#postImageExtraSmall)

<a href="https://amzn.eu/d/5kQCY5I" alt="Practices of an Agile Developer" target="_blank">_Practices of an Agile Developer_</a> by Venkat Subramaniam is an enlightening and pragmatic guide that takes readers on a transformative journey through the world of Agile software development. With a focus on real-world scenarios and practical advice, the author empowers developers to embrace Agile principles and practices to deliver high-quality software efficiently. From effective communication and collaboration to test-driven development and refactoring techniques, Subramaniam presents a comprehensive set of best practices that enable developers to adapt and thrive in today's fast-paced development environments.

## The Making of a Manager: What to Do When Everyone Looks to You by Julie Zhuo

![The Making of a Manager](/assets/images/devBcnConf2023/theMakingOfAManager.png#postImageExtraSmall)

<a href="https://amzn.eu/d/82UWjrN" alt="The Making of a Manager" target="_blank">_The Making of a Manager_</a> by Julie Zhuo is a compelling and practical guide that offers invaluable advice and insights for new managers navigating the challenges of leadership. Drawing from her own experiences as a young manager at Facebook, Zhuo provides a candid and relatable account of the highs and lows of managerial responsibilities. 

## The Manager's Path: A Guide for Tech Leaders Navigating Growth and Change by Camille Fournier

![The Manager's Path](/assets/images/devBcnConf2023/theManagersPath.png#postImageExtraSmall)

<a href="https://amzn.eu/d/2vudBpk" alt="The Manager's Path" target="_blank">_The Manager's Path_</a> by Camille Fournier is a comprehensive and indispensable handbook that serves as a roadmap for aspiring and seasoned tech managers alike. Drawing from her extensive experience as a technology leader, Fournier skillfully addresses the unique challenges and complexities faced by managers in the ever-evolving tech industry. From transitioning into a managerial role to developing effective communication skills, scaling teams, and fostering a productive culture, this book offers practical advice and actionable strategies at every step of the managerial journey. With its blend of real-world examples, insightful anecdotes, and thought-provoking insights, "The Manager's Path" equips readers with the essential tools and knowledge needed to navigate the intricacies of tech leadership, making it an invaluable resource for both emerging and established managers.

## Brave, Not Perfect: An inspiring read for fans of Lean In by Sheryl Sandberg by Reshma Saujani

![Brave, Not Perfect](/assets/images/devBcnConf2023/braveNotPerfect.png#postImageExtraSmall)

<a href="https://amzn.eu/d/aFFfNhq" alt="Brave, Not Perfect" target="_blank">_Brave, Not Perfect_</a> by Reshma Saujani is a powerful and empowering book that challenges societal expectations and encourages women to embrace bravery over perfection. Saujani, the founder of Girls Who Code, shares her personal journey and experiences to illustrate how the pressure to be perfect holds women back from taking risks and pursuing their true passions. Through compelling stories and practical advice, she offers a blueprint for overcoming fear, embracing failure, and cultivating resilience.

## References:

* _Photo <a href="https://www.dreamstime.com/business-speaker-giving-talk-conference-event-hall-focus-unrecognizable-people-audience-entrepreneurship-concept-image121363340" target="_blank">121363340</a> © <a href="https://www.dreamstime.com/kasto80_info" target="_blank">Kasto80</a> | <a href="https://www.dreamstime.com/photos-images/conference.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://www.devbcn.com/" alt="Dev BCN" target="_blank">Dev BCN</a>_
* _<a href="https://martinfowler.com/articles/lmax.html" alt="The LMAX Architecture" target="_blank">Martin Fowler Blog: The LMAX Architecture</a>_
* _<a href="https://weareadaptive.com/2020/10/01/building-fault-tolerant-low-latency-exchanges/" alt="Building fault-tolerant, low-latency exchanges" target="_blank">Building fault-tolerant, low-latency exchanges</a>_
* _<a href="https://aeron.io/" alt="Aeron Framework" target="_blank">Aeron Framework</a>_
* _<a href="https://kafka.apache.org/" alt="Apache Kafka" target="_blank">Apache Kafka</a>_
* _<a href="https://en.wikipedia.org/wiki/IKEA_effect" alt="The IKEA effect" target="_blank">The IKEA effect</a>_
* _<a href="https://en.wikipedia.org/wiki/Bandwagon_effect" alt="The bandwagon effect" target="_blank">The bandwagon effect</a>_
* _<a href="https://en.wikipedia.org/wiki/Law_of_triviality" alt="Law of triviality" target="_blank">Law of triviality</a>_
* _<a href="https://opentelemetry.io/" alt="Open Telemetry" target="_blank">Open Telemetry</a>_
* _<a href="https://www.tabnine.com/" alt="Tabnine (aka Codota)" target="_blank">Tabnine (aka Codota)</a>_
* _<a href="https://github.com/features/copilot" alt="GitHub Copilot" target="_blank">GitHub Copilot</a>_
* _<a href="https://openai.com/blog/chatgpt" alt="ChatGPT" target="_blank">ChatGPT</a>_
* _<a href="https://www.amazon.es/Engineering-Management-Rest-Sarah-Drasner/dp/B0BHX8BQ9C" alt="Engineering Management for the Rest of Us" target="_blank">_Engineering Management for the Rest of Us_</a>_
* _<a href="https://amzn.eu/d/5kQCY5I" alt="Practices of an Agile Developer" target="_blank">_Practices of an Agile Developer_</a>_
* _<a href="https://amzn.eu/d/82UWjrN" alt="The Making of a Manager" target="_blank">_The Making of a Manager_</a>_
* _<a href="https://amzn.eu/d/2vudBpk" alt="The Manager's Path" target="_blank">_The Manager's Path_</a>_
* _<a href="https://amzn.eu/d/aFFfNhq" alt="Brave, Not Perfect" target="_blank">_Brave, Not Perfect_</a>_
* _<a href="https://nextjs.org/" alt="NextJS" target="_blank">NextJS</a>_
* _<a href="https://remix.run/" alt="Remix" target="_blank">Remix</a>_
* _<a href="https://qwik.builder.io/" alt="Qwik" target="_blank">Qwik</a>_
* _<a href="https://start.solidjs.com/getting-started/what-is-solidstart" alt="Solid Start" target="_blank">Solid Start</a>_
* _<a href="https://nuxt.com/" alt="Nuxtjs" target="_blank">Nuxtjs</a>_
* _<a href="https://kit.svelte.dev/" alt="Sveltekit" target="_blank">Sveltekit</a>_
* _<a href="https://trpc.io/" alt="tRPC" target="_blank">tRPC</a>_
* _<a href="https://tempots.com/" alt="Tempo" target="_blank">Tempo</a>_
* _<a href="https://remult.dev/" alt="Remult" target="_blank">Remult</a>_
* _<a href="https://support.google.com/webmasters/answer/9205520?hl=en" alt="Google Core Web Vitals" target="_blank">Google Core Web Vitals</a>_
* _<a href="https://developer.chrome.com/docs/crux/" alt="Chrome UX Reports" target="_blank">Chrome UX Reports</a>_