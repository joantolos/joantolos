import {Blog} from "../app/model/blog";

export const backend : string = "https://www.joantolos.com";

export const thumbWidth : number = 870; 
export const podcastEpisodesMax : number = 5; 
export const BLOG : Blog =
  {
    "pageSize": 4,
    "recentPostsMax": 4,
    "posts":
      [
        {
          "id": "the-consequences-of-coding",
          "date": "February 15, 2024",
          "title": "The consequences of coding",
          "subtitle": "Real world examples of the negative consequences when coders fail to apply responsability.",
          "summary": "Two notorious cases about big companies failing to apply responsability on their coding. We explore the nasty consequences of poorly decision making from diferent organizational layers.",
          "featuredImage": "./assets/images/theConsequencesOfCoding/featuredImage.png",
          "thumb": "./assets/images/theConsequencesOfCoding/thumb.png",
          "tags": ["business","code","life"],
          "active": false
        },
        {
          "id": "when-even-data-lies",
          "date": "July 12, 2024",
          "title": "When even data lies",
          "subtitle": "Can two contradicting facts be true at the same time?",
          "summary": "Exploring the importance of data-driven decision-making while highlighting its limitations, particularly when faced with conflicting information.",
          "featuredImage": "./assets/images/whenEvenDataLies/featuredImage.png",
          "thumb": "./assets/images/whenEvenDataLies/thumb.png",
          "tags": ["code"],
          "active": true
        },
        {
          "id": "clean-code-clean-mind",
          "date": "February 15, 2024",
          "title": "Clean code, clean mind",
          "subtitle": "Transpose your coding habilities to your day to day",
          "summary": "A reflection on the correlation between attention to detail in professional tasks, particularly in programming, and its broader impact on life. Drawing from personal experiences in various jobs, the post underscores how cultivating a mindset of precision and excellence in daily work not only enhances job performance but also permeates into personal life, fostering a sense of fulfillment and effectiveness across all endeavors.",
          "featuredImage": "./assets/images/cleanCodeCleanMind/featuredImage.png",
          "thumb": "./assets/images/cleanCodeCleanMind/thumb.png",
          "tags": ["life","code"],
          "active": true
        },
        {
          "id": "angular-beanstalk",
          "date": "January 15, 2024",
          "title": "Your Angular app deployed on AWS Elastic Beanstalk",
          "subtitle": "A step by step tutorial to make your Angular app up and ready using Elastic Beanstalk service from AWS.",
          "summary": "Discover the simplicity of deploying your Angular app on AWS Elastic Beanstalk with this step-by-step guide. From setting up your AWS account to configuring your app for deployment, this tutorial covers it all. Learn to create a production build, configure Elastic Beanstalk environments, and deploy seamlessly. Get your Angular app up and running on AWS in no time!",
          "featuredImage": "./assets/images/angularBeanstalk/featuredImage.png",
          "thumb": "./assets/images/angularBeanstalk/thumb.png",
          "tags": ["code"],
          "active": true
        },
        {
          "id": "traffic-light-simulator",
          "date": "December 6, 2023",
          "title": "Traffic light simulator",
          "subtitle": "Testing my skills on HTML, CSS and Javascript with a simple proof of concept.",
          "summary": "Have you ever think about how the traffic light sequences all over the city are programmed? I did... This is another case of real-life inspirated proof of concept. For this one, I am trying to replicate the behaviour of a couple of traffic lights in my neighbourhood, one for vehicles and another one for pedestrians. The constraint is to only use technologies outside my comfort zone: HTML, CSS and Javascript.",
          "featuredImage": "./assets/images/trafficLightSimulator/featuredImage.png",
          "thumb": "./assets/images/trafficLightSimulator/thumb.png",
          "tags": ["code"],
          "active": true
        },
        {
          "id": "dopamine-fasting",
          "date": "September 23, 2023",
          "title": "Dopamine Fasting",
          "subtitle": "The benefitial effects of cutting off external dopamine sources for a period of time",
          "summary": "Based on the studies by Dr. Anna Lembke, this article explores how dopamine affects our brain and how to have a more deliverate control over the pervasive influence of dopamine in our daily lives.",
          "featuredImage": "./assets/images/dopamineFasting/featuredImage.png",
          "thumb": "./assets/images/dopamineFasting/thumb.png",
          "tags": ["life"],
          "active": true
        },
        {
          "id": "the-ego-paradox",
          "date": "August 27, 2023",
          "title": "The Ego Paradox",
          "subtitle": "How an Inflated Ego Limits Personal Growth",
          "summary": "By examining the paradoxical nature of an inflated sense of self-importance, I explore the barriers it erects and the missed opportunities it brings. ",
          "featuredImage": "./assets/images/theEgoParadox/featuredImage.png",
          "thumb": "./assets/images/theEgoParadox/thumb.png",
          "tags": ["life", "business"],
          "active": true
        },
        {
          "id": "dev-bcn-conf-2023",
          "title": "Dev BCN Conf 2023",
          "date": "July 15, 2023",
          "subtitle": "My takes on the last Barcelona Developers Conference 2023",
          "summary": "I have been lucky enough to attend to this year’s edition of Dev BCN Conf. These are some thoughts and take outs I want to share. The conference is a meeting point for programmers, developers and development professionals, who meet to do networking and learn. The event is organised by Barcelona JUG (Barcelona Java Users Group), a non-profit association made up of programmers, engineers and other technology lovers.",
          "featuredImage": "./assets/images/devBcnConf2023/featuredImage.png",
          "thumb": "./assets/images/devBcnConf2023/thumb.png",
          "tags": [
            "code","business"
          ],
          "active": true
        },
        {
          "id": "back-to-the-office",
          "date": "July 3, 2023",
          "title": "Back to the office",
          "subtitle": "A humble reflexion about the topic",
          "summary": "There has been a lot of conversations about the topic of being back to the office and it looks like the general trend in most of the companies is to make a 180 from pandemic times and work slowly through going back to the office.",
          "featuredImage": "./assets/images/backToTheOffice/featuredImage.png",
          "thumb": "./assets/images/backToTheOffice/thumb.png",
          "tags": ["life", "business"],
          "active": true
        },
        {
          "id": "we-all-are-c",
          "date": "June 15, 2023",
          "title": "We all are C",
          "subtitle": "Out of the conflict vicious circle",
          "summary": "We are all different, that's a given. But we are more alike than it seems, at least at a fundamental level.",
          "featuredImage": "./assets/images/weAllAreC/featuredImage.png",
          "thumb": "./assets/images/weAllAreC/thumb.png",
          "tags": ["life", "business"],
          "active": true
        },
        {
          "id": "the-best-movies-and-tv-shows-about-programming",
          "date": "May 15, 2023",
          "title": "The best movies and tv shows about programming",
          "subtitle": "The importance of fiction and story telling",
          "summary": "Fiction is very important in cognitive development. If you have young ones around you can easily notice that reading and sharing stories with young children helps them understand sounds, language, words, and even develop literacy skills. Reading or watching fiction with your children can also help them develop strong communication and social skills.",
          "featuredImage": "./assets/images/theBestMoviesAndTvShowsAboutProgramming/featuredImage.png",
          "thumb": "./assets/images/theBestMoviesAndTvShowsAboutProgramming/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "make-yourself-employable",
          "date": "March 24, 2023",
          "title": "Make yourself employable",
          "subtitle": "Leveraging soft skills to land the perfect job",
          "summary": "Hard truth about success: there are people less talented than you and less experienced than you having more success than you because they are doing the things you're too lazy to do, or you don't like to do.",
          "featuredImage": "./assets/images/makeYourselfEmployable/featuredImage.png",
          "thumb": "./assets/images/makeYourselfEmployable/thumb.png",
          "tags": [
            "business",
            "life"
          ],
          "active": true
        },
        {
          "id": "what-is-an-etl",
          "date": "February 15, 2023",
          "title": "What is an ETL?",
          "subtitle": "Extract, transform and load explained",
          "summary": "ETL is a term that is used in the data warehousing world. It stands for Extract, Transform, Load. ETL is a process that involves extracting data from a variety of sources, transforming that data into a format that is suitable for analysis and reporting, and then loading the transformed data into a data warehouse or other target system.",
          "featuredImage": "./assets/images/whatIsAnEtl/featuredImage.png",
          "thumb": "./assets/images/whatIsAnEtl/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "paul-lutus-a-success-case",
          "date": "January 15, 2023",
          "title": "Paul Lutus: A success case",
          "subtitle": "What is the role of formal studies on a successful career?",
          "summary": "You may or may not now about Paul Lutus. If you don't, you have the opportunity of getting inspired by the story of a brilliant person; if you do, check out if you share my own conclusions about his story.",
          "featuredImage": "./assets/images/paulLutusASuccessCase/featuredImage.png",
          "thumb": "./assets/images/paulLutusASuccessCase/thumb.png",
          "tags": [
            "life",
            "business",
            "code"
          ],
          "active": true
        },
        {
          "id": "communication-breakdown",
          "date": "December 15, 2022",
          "title": "Communication breakdown",
          "subtitle": "Are we loosing our attention span?",
          "summary": "The way we communicate has changed dramatically over the years. We have gone from oral tradition to writing, then to printed press, then to the radio, then to the TV and now we are using social media. Each of these steps has made it easier for us to communicate with each other. Social media has made it possible for us to communicate with people all over the world instantly.",
          "featuredImage": "./assets/images/communicationBreakdown/featuredImage.png",
          "thumb": "./assets/images/communicationBreakdown/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "accelerating-drug-discovery",
          "date": "November 25, 2022",
          "title": "Accelerating drug discovery",
          "subtitle": "Cutting edge technology to improve people's health",
          "summary": "How Clarivate leverages the advances on the software industry to accelerate the process of researching, discovering and delivering new drugs and therapies that will have a direct impact in people's lives.",
          "featuredImage": "./assets/images/acceleratingDrugDiscovery/featuredImage.png",
          "thumb": "./assets/images/acceleratingDrugDiscovery/thumb.png",
          "tags": [
            "business",
            "life"
          ],
          "active": true
        },
        {
          "id": "java-encapsulation",
          "title": "Java encapsulation",
          "date": "October 7, 2022",
          "subtitle": "Common misconceptions explained",
          "summary": "Encapsulation is so common and well known that sometimes I feel there are some basic misconceptions that may confuse a little. It is one of the fundamental object oriented programming concepts but sometimes can be interpreted wrong. Let's start with the basics.",
          "featuredImage": "./assets/images/javaEncapsulation/featuredImage.png",
          "thumb": "./assets/images/javaEncapsulation/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "what-are-esolang",
          "title": "What are esolang?",
          "date": "September 17, 2022",
          "subtitle": "An introduction to esoteric languages",
          "summary": "There is a full community of coders working on what are called Esoteric languages or esolang for short. This is one of those perks of the profession that makes me love it even more. The fact that this exists is awesome. It makes me proud to enjoy \"the party\" and being able to understand what they are doing.",
          "featuredImage": "./assets/images/whatAreEsolang/featuredImage.png",
          "thumb": "./assets/images/whatAreEsolang/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "what-is-database-pooling",
          "title": "What is database pooling?",
          "date": "August 20, 2022",
          "subtitle": "Simple explanation on how to get started with connection pooling",
          "summary": "You don’t build a new pool any time someone wants to take a bath. You build a pool big enough so several people can reuse it. It has a limited capacity, a maintenance and several costs associated but it is much cheaper than build a single pool for each one of the swimmers. This is the idea behind database connection pool. Database connection pool Establishing a connection to a database is an expensive operation.",
          "featuredImage": "./assets/images/whatIsDatabasePooling/featuredImage.png",
          "thumb": "./assets/images/whatIsDatabasePooling/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "jbcn-conf-2022",
          "title": "JBCN Conf 2022",
          "date": "July 22, 2022",
          "subtitle": "My takes on the last Java Barcelona Conference",
          "summary": "I have been lucky enough to attend to this year’s edition of Java BCN Conf. These are some thoughts and take outs I want to share. The conference The JBCNConf is a meeting point for programmers, developers and development professionals, who meet to do networking and learn about the Java world and its latest developments. The event is organised by Barcelona JUG (Barcelona Java Users Group) , a non-profit association made up of programmers, engineers and other technology lovers.",
          "featuredImage": "./assets/images/jbcnConf2022/featuredImage.png",
          "thumb": "./assets/images/jbcnConf2022/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "leadership-case-study",
          "title": "Leadership mentoring",
          "date": "July 15, 2022",
          "subtitle": "A better understanding of what leadership means and several practical cases about how to apply it on a development team",
          "summary": "I have been having conversations with several team leaders of technical teams, exploring the leadership aspects of the job. As part of a mentorship program at my company (awesome idea), I have been a mentee for quite a while now and I want to compile the intelligence extracted from a series of very interesting conversations. There are a lot of instances documented where the same team can thrive or fail just by changing leadership.",
          "featuredImage": "./assets/images/leadershipCaseStudy/featuredImage.png",
          "thumb": "./assets/images/leadershipCaseStudy/thumb.png",
          "tags": [
            "business"
          ],
          "active": true
        },
        {
          "id": "how-computers-process-a-program",
          "title": "How computers process a program",
          "date": "June 14, 2022",
          "subtitle": "A high level approximation of what happens at CPU level when running software",
          "summary": "Your code is executed by a computer somewhere… your own, a remote server, on the cloud, whatever… This computer is going to have a CPU, a central process unit that will deal with the instructions of your code one by one. Let’s explore the basic components of a CPU on a high level so we can try to figure out how it deals with the code. The arithmetic logic unit The final goal of a microprocessor is the computation.",
          "featuredImage": "./assets/images/howComputersProcessAProgram/featuredImage.png",
          "thumb": "./assets/images/howComputersProcessAProgram/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "big-o-notation-example",
          "title": "Big O notation example",
          "date": "May 12, 2022",
          "subtitle": "A simple problem solved for two different complexity times",
          "summary": "Since I made the post about Big O Notation, I have been exploring that knowledge using regular simple algorithms like calculating the size of an array and common stuff like that. Just adding a new dimension to the way I think about the problems and also re-thinking the good-old ways of doing stuff.",
          "featuredImage": "./assets/images/bigONotationExample/featuredImage.png",
          "thumb": "./assets/images/bigONotationExample/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "the-origin-of-memes",
          "title": "The origin of memes",
          "date": "April 14, 2022",
          "subtitle": "Where the term came from?",
          "summary": "The term meme was originally created by Richard Dawkins on his 1976 book: The Selfish Gene. This book has become a classic on the science circles and builds up into the concept of the theory of evolution by Charles Darwin. The idea behind the book is to explain the importance and the big role that the gene plays on evolution. For the purpose of this post, let’s just summarise that the gene is a unit of replication capable of copy genetic information from generation to generation.",
          "featuredImage": "./assets/images/theOriginOfMemes/featuredImage.png",
          "thumb": "./assets/images/theOriginOfMemes/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "checked-vs-unchecked-exceptions-in-java",
          "title": "Checked vs unchecked exceptions in Java",
          "date": "March 16, 2022",
          "subtitle": "Definition and examples",
          "summary": "Some people asked me once on an interview the difference between checked and unchecked exceptions in Java. The question made sense because it was a follow up on a take home test that I did and we were discussing. I did some kind of exception treatment and we were talking about the choices I made. I remember making a mental note at that moment because although I answered the question I was not satisfied about how I did it.",
          "featuredImage": "./assets/images/checkedVsUncheckedExceptionsInJava/featuredImage.png",
          "thumb": "./assets/images/checkedVsUncheckedExceptionsInJava/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "writing-will-make-you-a-better-programmer",
          "title": "Writing will make you a better programmer",
          "date": "February 21, 2022",
          "subtitle": "Several writing tips that are easily extrapolated to coding",
          "summary": "I tell stories to my children at bedtime, I suppose every parent does that more or less. We have two different versions: story with book and story without book. For the first option, I read from a children book and on the second option, I tell a story just with my voice, not from a book. The thing is, when I tell stories I use to invent adventures or things related with the day to day of my kids and they really love that.",
          "featuredImage": "./assets/images/writingWillMakeYouABetterProgrammer/featuredImage.png",
          "thumb": "./assets/images/writingWillMakeYouABetterProgrammer/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "happiness-is-cheap-meaning-is-the-real-deal",
          "title": "Happiness is cheap, meaning is the real deal",
          "date": "January 1, 2022",
          "subtitle": "Humble reflection about happiness inspired by stoic philosophy",
          "summary": "The headline on this post is not meant to be click bait. I really do think that happiness come cheap, but said it like that can sound mean. I don't intent to disrespect people that are actually not happy in their current lives. It just requires a little bit of explanation, so bear with me while I try to explore the concept of happiness from the point of view of the stoic philosophy.",
          "featuredImage": "./assets/images/happinessIsCheapMeaningIsTheRealDeal/featuredImage.png",
          "thumb": "./assets/images/happinessIsCheapMeaningIsTheRealDeal/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "your-career-end-game",
          "title": "Your career end game",
          "date": "December 20, 2021",
          "subtitle": "An end of the year reflection",
          "summary": "This is a weird post. I am having a weird time. Not bad, I am more than good, but the last months I have been reflecting on my career and what the next steps should be. Granted, maybe the global pandemic helps a little to put things into perspective and favours these kinds of self reflecting thoughts.",
          "featuredImage": "./assets/images/yourCareerEndGame/featuredImage.png",
          "thumb": "./assets/images/yourCareerEndGame/thumb.png",
          "tags": [
            "life",
            "business"
          ],
          "active": true
        },
        {
          "id": "big-o-notation-and-asymptotic-complexity",
          "title": "Big O notation and asymptotic complexity",
          "date": "November 9, 2021",
          "subtitle": "An end of the year reflection",
          "summary": "Let's say we want to go from Paris to Amsterdam and I ask you for an algorithm to solve that problem. The problem being: I need to go from point A to point B. You can answer... \"well, you take a plane\". Ok, a little more specific... \"You take your car from your home to the airport, then take a plane, and when in Paris, rent a car from the airport to the hotel\". That is good enough, let's say that the steps for the algorithm are:",
          "featuredImage": "./assets/images/bigONotationAndAsymptoticComplexity/featuredImage.png",
          "thumb": "./assets/images/bigONotationAndAsymptoticComplexity/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "what-is-a-rest-api",
          "title": "What is a REST API",
          "date": "October 14, 2021",
          "subtitle": "Definition and examples",
          "summary": "The simple (obvious and absurd) answer to the question \"what is a REST API?\" would be: It is an API that conforms to the REST architectural style. The proper follow up questions of course are: what is an API and what is the REST architectural style. If you know the conventions of REST and what are the main characteristics of an API you can deduce your own answer.",
          "featuredImage": "./assets/images/whatIsARestApi/featuredImage.png",
          "thumb": "./assets/images/whatIsARestApi/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "rest-api-seed-with-kotlin-and-spring",
          "title": "REST API seed with Kotlin and Spring",
          "date": "September 2, 2021",
          "subtitle": "Using Kotlin and Spring to build a REST API",
          "summary": "I have been wanting to use Kotlin for a while now. Some colleges that I deeply respect don't stop recommending it and I finally allocated some time to play around a little bit.",
          "featuredImage": "./assets/images/restApiSeedWithKotlinAndSpring/featuredImage.png",
          "thumb": "./assets/images/restApiSeedWithKotlinAndSpring/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "override-polymorphism-and-factory-pattern-with-typeScript",
          "title": "Override polymorphism and factory pattern with TypeScript",
          "date": "August 8, 2021",
          "subtitle": "An example with code for both techniques implemented",
          "summary": "One of the main benefits of object oriented programming (OOO) is the possibility for polymorphism. Polymorphism is the provision of a single interface to entities of different types or the use of a single symbol to represent multiple different types. I find this feature difficult to match on other paradigms such as Functional Programming.",
          "featuredImage": "./assets/images/overridePolymorphismAndFactoryPatternWithTypeScript/featuredImage.png",
          "thumb": "./assets/images/overridePolymorphismAndFactoryPatternWithTypeScript/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "gitHub-copilot-and-the-end-of-programming",
          "title": "GitHub copilot and the end of programming",
          "date": "July 4, 2021",
          "subtitle": "Is this the end of the programming world as we know it?",
          "summary": "I have been looking at the new tool GitHub copilot (as everyone, I assume). I am on the waiting list to try it myself. I can't wait to start playing with it",
          "featuredImage": "./assets/images/gitHubCopilotAndTheEndOfProgramming/featuredImage.png",
          "thumb": "./assets/images/gitHubCopilotAndTheEndOfProgramming/thumb.png",
          "tags": [
            "code",
            "business"
          ],
          "active": true
        },
        {
          "id": "deploying-hugo-app-into-heroku",
          "title": "Deploying Hugo app into Heroku",
          "date": "June 8, 2021",
          "subtitle": "The popular single page framework working with the popular \"Platform as a service\" provider",
          "summary": "Heroku is awesome. I have been using Heroku as platform hosting for my pet projects for many years now. It has everything I need to start toying with new ideas. When I try something new, a framework, a database, new language or whatever... I always try to deploy this new thing into Heroku. That way I learn how to deal a little bit with the DevOps part of the new thing I am trying.",
          "featuredImage": "./assets/images/deployingHugoAppIntoHeroku/featuredImage.png",
          "thumb": "./assets/images/deployingHugoAppIntoHeroku/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "underwater-leadership",
          "title": "Underwater leadership",
          "date": "May 12, 2021",
          "subtitle": "Changing a bad performance team into an excellent one",
          "summary": "Exploring an amazing book telling the story of building trust on a nuclear submarine. How a leadership vision can transform the performance and delivery of a whole crew of soldiers.",
          "featuredImage": "./assets/images/underwaterLeadership/featuredImage.png",
          "thumb": "./assets/images/underwaterLeadership/thumb.png",
          "tags": [
            "business"
          ],
          "active": true
        },
        {
          "id": "fixing-date-on-exported-videos-from-apple-photos",
          "title": "Fixing date on exported videos from Apple's Photos",
          "date": "April 14, 2021",
          "subtitle": "Update video metadata according to proper order",
          "summary": "I have been dealing with an annoying problem when exporting multimedia files for the Apple Photos software. If you are experiencing something similar,read and use my own crafted solution.",
          "featuredImage": "./assets/images/fixingDateOnExportedVideosFromApplePhotos/featuredImage.png",
          "thumb": "./assets/images/fixingDateOnExportedVideosFromApplePhotos/thumb.png",
          "tags": [
            "code",
            "life"
          ],
          "active": true
        },
        {
          "id": "single-page-seed-with-angular",
          "title": "Single page seed with Angular",
          "date": "March 3, 2021",
          "subtitle": "Angular client tutorial deployed",
          "summary": "We are using the Angular client on my job now and I wanted to do a tutorial to learn the basics. I already did the \"Tour of heroes tutorial\" but it was a long time ago and since I don't code much front end usually, I could use a refresh.",
          "featuredImage": "./assets/images/singlePageSeedWithAngular/featuredImage.png",
          "thumb": "./assets/images/singlePageSeedWithAngular/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "the-road-to-digital-redemption",
          "title": "The road to digital redemption",
          "date": "February 19, 2021",
          "subtitle": "Can we redeem our on-line mistakes?",
          "summary": "Let's explore the recent cancel culture flourishing among the Internet.",
          "featuredImage": "./assets/images/theRoadToDigitalRedemption/featuredImage.png",
          "thumb": "./assets/images/theRoadToDigitalRedemption/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "java-spring-and-hibernate-microservice-seed",
          "title": "Java, Spring and Hibernate microservice seed",
          "date": "January 4, 2021",
          "subtitle": "TDD ready service with database interaction configured out of the box",
          "summary": "One of the main benefits of object oriented programming (OOO) is the possibility for polymorphism. Polymorphism is the provision of a single interface to entities of different types or the use of a single symbol to represent multiple different types. I find this feature difficult to match on other paradigms such as Functional Programming. I recently stumbled upon a case on my work where override polymorphism was needed. I want to extrapolate a general example to be able to write about it.",
          "featuredImage": "./assets/images/javaSpringAndHibernateMicroserviceSeed/featuredImage.png",
          "thumb": "./assets/images/javaSpringAndHibernateMicroserviceSeed/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "iteration-over-repetition",
          "title": "Iteration over repetition",
          "date": "December 17, 2020",
          "subtitle": "How to consistently build relevant skills throughout your career",
          "summary": "Let’s explore the difference between repetition and iteration. When you repeat something, you are doing the same thing several times. When you iterate over something you are building over the previous outcome. Let’s choose the proper tool (repetition or iteration) wisely.",
          "featuredImage": "./assets/images/iterationOverRepetition/featuredImage.png",
          "thumb": "./assets/images/iterationOverRepetition/thumb.png",
          "tags": [
            "life",
            "business"
          ],
          "active": true
        },
        {
          "id": "conflict-resolution-tip",
          "title": "Conflict resolution tip",
          "date": "November 6, 2020",
          "subtitle": "A simple trick to reach a consensus",
          "summary": "When dealing with a conflict at work, you want to reach a win-win situation where both parts are satisfied. Some other quick solutions, like just voting among the team, still leaves a winner and a loser even if the process has been “just” or at least consensual with all the team. This kind of situations, can grow resentment among the members of the team and can create a big price to pay in the future.",
          "featuredImage": "./assets/images/conflictResolutionTip/featuredImage.png",
          "thumb": "./assets/images/conflictResolutionTip/thumb.png",
          "tags": [
            "business",
            "life"
          ],
          "active": true
        },
        {
          "id": "social-network-case-study",
          "title": "Social network case study",
          "date": "October 19, 2020",
          "subtitle": "A naive approach to social networking",
          "summary": "I have been publishing a lot lately into two social networks: Twitter and Linkedin. The idea was to see how a lot of activity would impact in the relevance of my profiles. In order to do that, first I compiled a long list of publications composed by my own blog posts, so I just had to copy/paste into the platforms.",
          "featuredImage": "./assets/images/socialNetworkCaseStudy/featuredImage.png",
          "thumb": "./assets/images/socialNetworkCaseStudy/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "dealing-with-json-in-java",
          "title": "Dealing with JSON in Java",
          "date": "September 3, 2020",
          "subtitle": "Get away with simple JSON transformation and manipulation in Java",
          "summary": "I have been working with Javascript for a while (TypeScript actually) and one of the features that I found interesting is the way you can deal with JSON with javascript. Create, modify and manipulate a JSON object with javascript is very easy and intuitive. It actually allows you to do whatever you want so you may break the JSON if you are not careful.",
          "featuredImage": "./assets/images/dealingWithJSONInJava/featuredImage.png",
          "thumb": "./assets/images/dealingWithJSONInJava/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "either-lead-follow-or-get-out-of-the-way",
          "title": "Either lead, follow or get out of the way",
          "date": "July 7, 2020",
          "subtitle": "Accountability and ownership at the work place",
          "summary": "Lead, follow or get out of the way is a phrase widely used, specially on military context. It's attributed to several people: Thomas Paine (American political activist, philosopher), general Patton or even leaders of civil industries. I want to talk about it in the context of a software creation team.",
          "featuredImage": "./assets/images/eitherLeadFollowOrGetOutOfTheWay/featuredImage.png",
          "thumb": "./assets/images/eitherLeadFollowOrGetOutOfTheWay/thumb.png",
          "tags": [
            "business",
            "life"
          ],
          "active": true
        },
        {
          "id": "how-to-sort-and-paginate-your-table-with-typescript",
          "title": "How to sort and paginate your table with Typescript",
          "date": "May 3, 2020",
          "subtitle": "A possible implementation for sort and paginate an array",
          "summary": "You should always delegate your sorting and pagination needs to the data retriever engine that you are using. For example, if it is a classical relational database you should use ORDER BY, OFFSET, FETCH, LIMIT and whatever mechanisms you have available. Same thing with NoSQL databases. These things are designed to perform well when asking for this kind of sorting and pagination features. So, you should always go for them.",
          "featuredImage": "./assets/images/howToSortAndPaginateYourTableWithTypescript/featuredImage.png",
          "thumb": "./assets/images/howToSortAndPaginateYourTableWithTypescript/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "days-of-isolation",
          "title": "Days of isolation",
          "date": "March 24, 2020",
          "subtitle": "Working from home required",
          "summary": "As the world is facing the pandemic caused by this new Coronavirus strain, most of my colleagues and myself are forced to work from home. I want to share my experience working without leaving the house.",
          "featuredImage": "./assets/images/daysOfIsolation/featuredImage.png",
          "thumb": "./assets/images/daysOfIsolation/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "my-brief-experience-as-team-lead",
          "title": "My brief experience as team lead",
          "date": "February 26, 2020",
          "subtitle": "Ups and downs on a new role",
          "summary": "I had the opportunity of take over my manager role for a brief period of time due to his parenting absence. I was doing it kind of informally when he was on vacation or had a sick day or something. This time it was for a longer and delimited period so we kind of \"formalised\" the whole thing.",
          "featuredImage": "./assets/images/myBriefExperienceAsTeamLead/featuredImage.png",
          "thumb": "./assets/images/myBriefExperienceAsTeamLead/thumb.png",
          "tags": [
            "business",
            "life"
          ],
          "active": true
        },
        {
          "id": "hashtag-generator",
          "title": "Hashtag generator",
          "date": "February 22, 2020",
          "subtitle": "Simple tool for community managers",
          "summary": "Our community manager needs a software to generate a single text sentence containing all the desired hashtags. The main feature is that it has to be quick and easy to use. Just copy from the software and paste into the social media post.",
          "featuredImage": "./assets/images/hashtagGenerator/featuredImage.png",
          "thumb": "./assets/images/hashtagGenerator/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "action-bias",
          "title": "Action bias",
          "date": "September 12, 2019",
          "subtitle": "Are you stopped by action?",
          "summary": "Imagine a simple task: we want to go to the venue of the next conference by walking. We have the essential skill to achieve the goal, we know how to walk. So we go down the street and start walking going around the block over and over. Then we ask ourselves why we never arrive to the place. Ring any bell?",
          "featuredImage": "./assets/images/actionBias/featuredImage.png",
          "thumb": "./assets/images/actionBias/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "6-tools-to-help-you-do-tdd-with-java-and-spring-cloud",
          "title": "6 tools to help you do TDD with Java and Spring Cloud",
          "date": "September 6, 2019",
          "subtitle": "Using: Java, Spring Boot, Mock Server",
          "summary": "I am always trying to manifest the benefits of TDD. Most of the times when I find colleges that \"can't\" do it right away it is because their software is not \"TDD ready\" meaning that it is difficult to test.",
          "featuredImage": "./assets/images/6ToolsToHelpYouDoTddWithJavaAndSpringCloud/featuredImage.png",
          "thumb": "./assets/images/6ToolsToHelpYouDoTddWithJavaAndSpringCloud/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "6-tools-to-help-you-do-tdd-with-nodejs",
          "title": "6 tools to help you do TDD with NodeJS",
          "date": "September 6, 2019",
          "subtitle": "Mocha, Chai, Istanbul, Nock, Mock-Require and Lint explained",
          "summary": "I am using NodeJS more and more to implement middleware services instead of Java. That means that I am dealing with Javascript on a daily basis. In order to add features with guaranties, I code with TDD and that means that I need a few tools to code comfortably",
          "featuredImage": "./assets/images/6ToolsToHelpYouDoTddWithNodejs/featuredImage.png",
          "thumb": "./assets/images/6ToolsToHelpYouDoTddWithNodejs/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "running-on-fumes",
          "title": "Running on fumes",
          "date": "August 9, 2019",
          "subtitle": "Avoid complacency, aim for more",
          "summary": "It is desirable to be physically healthy. When we are out of shape we suffer the consequences rapidly and we want to abandon that situation as soon as possible and regain our health.",
          "featuredImage": "./assets/images/runningOnFumes/featuredImage.png",
          "thumb": "./assets/images/runningOnFumes/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "jbcn-conf-2019",
          "title": "JBCN Conf 2019",
          "date": "May 31, 2019",
          "subtitle": "My takes on the last Java Barcelona conference",
          "summary": "This conference has been growing year by year and now is one of the referents. I have been lucky enough to be able to attend to all the editions until now.",
          "featuredImage": "./assets/images/jbcnConf2019/featuredImage.png",
          "thumb": "./assets/images/jbcnConf2019/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "the-imposter-syndrome",
          "title": "The imposter syndrome",
          "date": "March 11, 2019",
          "subtitle": "A humble approach to the causes and solutions",
          "summary": "I was talking with an ex peer some time ago. We were talking about taking new chances and moving on from one job to another. I told him that sometimes I feel like I am asking too much and I have doubts of my potential. Then he told me that this is called the imposter syndrome and that it happens to him as well. That was the first time I heard the expression, then I started to take a look and research a little bit.",
          "featuredImage": "./assets/images/theImposterSyndrome/featuredImage.png",
          "thumb": "./assets/images/theImposterSyndrome/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "merging-two-objects-in-java",
          "title": "Merging two objects in Java",
          "date": "January 23, 2019",
          "subtitle": "Using reflection and a bit of recursion to merge two objects using Java",
          "summary": "I am working with a micro-service which relays a lot on configuration. This configuration is defined on JSON files that business people can edit in order to change the service behaviour. For example, enable or disable features, define default values, etc... The service includes a mechanism that allows to update this configuration files on real time as soon as the file is updated (using the Netflix API: Archaius)",
          "featuredImage": "./assets/images/mergingTwoObjectsInJava/featuredImage.png",
          "thumb": "./assets/images/mergingTwoObjectsInJava/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "tennis-kata",
          "title": "Tennis Kata",
          "date": "January 1, 2019",
          "subtitle": "My implementation in Java of the Tennis Kata",
          "summary": "A kata is an exercise in karate where you repeat a form many, many times, making little improvements in each. The intent behind code kata is similar. Each is a short exercise (perhaps 30 minutes to an hour long). Some involve programming, and can be coded in many different ways. Some are open ended, and involve thinking about the issues behind programming. These are unlikely to have a single correct answer.",
          "featuredImage": "./assets/images/tennisKata/featuredImage.png",
          "thumb": "./assets/images/tennisKata/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "the-real-reason-why-you-dont-like-tdd",
          "title": "The real reason why you don't like TDD",
          "date": "September 10, 2018",
          "subtitle": "A case for test-driven development",
          "summary": "Have you ever read somebody's code and thought: \"that is just beautiful, I wish I could code like this?\" The answer is simple: nobody codes like this at first attempt. Good code is always the result of several refactoring, iterations, reviews and improvements. Most of the time made by more than one person.",
          "featuredImage": "./assets/images/theRealReasonWhyYouDontLikeTDD/featuredImage.png",
          "thumb": "./assets/images/theRealReasonWhyYouDontLikeTDD/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "my-thoughts-on-extreme-leadership",
          "title": "My thoughts on Extreme Leadership",
          "date": "August 6, 2018",
          "subtitle": "Using TDD on a critical point of the project",
          "summary": "Extreme leadership is a book by Jocko Willink and Leif Babin about how U.S. Navy SEALs lead and win.",
          "featuredImage": "./assets/images/myThoughtsOnExtremeLeadership/featuredImage.png",
          "thumb": "./assets/images/myThoughtsOnExtremeLeadership/thumb.png",
          "tags": [
            "life",
            "business"
          ],
          "active": true
        },
        {
          "id": "jbcn-conf-2018",
          "title": "JBCN Conf 2018",
          "date": "June 13, 2018",
          "subtitle": "My take away from the last Java BCN Conference",
          "summary": "I attended the Java Barcelona Conference again for the forth time now and I want to share some of my experiences.",
          "featuredImage": "./assets/images/jbcnConf2018/featuredImage.png",
          "thumb": "./assets/images/jbcnConf2018/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "the-quick-fix-society",
          "title": "The quick fix society",
          "date": "May 9, 2018",
          "subtitle": "3 reasons why you shouldn't read this post",
          "summary": "Uber, Netflix, Spotify, fast food... As the song said... We want it all and we want it now. But, is it now always the right time? Can everything we need, be packed into a five minutes digested pills?",
          "featuredImage": "./assets/images/theQuickFixSociety/featuredImage.png",
          "thumb": "./assets/images/theQuickFixSociety/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "code-jam-kata",
          "title": "Code Jam Kata",
          "date": "April 26, 2018",
          "subtitle": "Several code exercises solved by simple algorithms",
          "summary": "A few days ago, I was struggling at work with a simple implementation of sorting a couple of arrays. I was coding it in a language that I am not so good at: Javascript. I asked for help to one of my peers, we shared the pain for a little while and finally we got it.",
          "featuredImage": "./assets/images/codeJamKata/featuredImage.png",
          "thumb": "./assets/images/codeJamKata/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "how-do-i-do-it",
          "title": "How do I do it?",
          "date": "March 3, 2018",
          "subtitle": "How I make time for everything I want to do",
          "summary": "From time to time people ask me \"how do I do it\" meaning, how I manage to do all the things that I do besides the normal activity of work and family.",
          "featuredImage": "./assets/images/howDoIDoIt/featuredImage.png",
          "thumb": "./assets/images/howDoIDoIt/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "why-do-you-hate-your-job",
          "title": "Why do you hate your job?",
          "date": "February 10, 2018",
          "subtitle": "Complaining attitude at the job place",
          "summary": "Between 2011 and 2012 the polling company Gallup conducted the most detailed study ever carried out of how people across the world feel about their work. They studied millions of workers across 142 countries. They found that 13 percent of people say they are **engaged** in their jobs, which means they are 'enthusiastic about, and committed to their work and contribute to their organisation in a positive manner.",
          "featuredImage": "./assets/images/whyDoYouHateYourJob/featuredImage.png",
          "thumb": "./assets/images/whyDoYouHateYourJob/thumb.png",
          "tags": [
            "life",
            "business"
          ],
          "active": true
        },
        {
          "id": "code-coverage-as-a-tool",
          "title": "Code coverage as a tool",
          "date": "February 6, 2018",
          "subtitle": "How I use the code coverage report to inspire refactors",
          "summary": "I want to explain how I use the code coverage as a tool when I code. I don't really care for the final number of test coverage, if you code using TDD this number will be very high anyway. I don't think that we can trust the quality of our code by some test coverage percentage, we all know that figures can be easily hacked, so there is no point on taking much attention at the final count.",
          "featuredImage": "./assets/images/codeCoverageAsATool/featuredImage.png",
          "thumb": "./assets/images/codeCoverageAsATool/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "angular-tutorial-extended",
          "title": "Angular tutorial extended",
          "date": "January 5, 2018",
          "subtitle": "The 'Tour of heroes' tutorial from Angular extended to take tests into account",
          "summary": "If you follow the Angular tutorial, you will start building the 'Tour of Heroes' App and learn the basics from Angular. I always struggle with front-end frameworks so I decided to do the tutorial as we are switching to Angular 5 on my current project. I really recommend to do the tutorial.",
          "featuredImage": "./assets/images/angularTutorialExtended/featuredImage.png",
          "thumb": "./assets/images/angularTutorialExtended/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "artificial-intelligence",
          "title": "Artificial intelligence",
          "date": "December 5, 2017",
          "subtitle": "An introduction to AI",
          "summary": "I have done an introduction to Artificial Intelligence (AI) course and I want to share my learning experience. This post covers my notes and summaries of the content of the course.",
          "featuredImage": "./assets/images/artificialIntelligence/featuredImage.png",
          "thumb": "./assets/images/artificialIntelligence/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "social-networking-kata",
          "title": "Social networking kata",
          "date": "December 1, 2017",
          "subtitle": "Kata solving practice",
          "summary": "A kata is an exercise in karate where you repeat a form many, many times, making little improvements in each. The intent behind code kata is similar. Each is a short exercise (perhaps 30 minutes to an hour long). Some involve programming, and can be coded in many different ways.",
          "featuredImage": "./assets/images/socialNetworkingKata/featuredImage.png",
          "thumb": "./assets/images/socialNetworkingKata/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "tdd-all-in",
          "title": "TDD: All in",
          "date": "November 2, 2017",
          "subtitle": "Using TDD on a critical point of the project",
          "summary": "We faced a complicated release to production on our team. We had to include a brand new feature that will stress the application on different levels: user interface, backend and data. We had also a small window to release it so the pressure was high. Let's establish a little bit the requirements, on a high level (without revealing details of the business).",
          "featuredImage": "./assets/images/tddAllIn/featuredImage.png",
          "thumb": "./assets/images/tddAllIn/thumb.png",
          "tags": [
            "code",
            "business"
          ],
          "active": true
        },
        {
          "id": "one-task-to-rule-them-all",
          "title": "One task to rule them all",
          "date": "September 16, 2017",
          "subtitle": "Dealing with order on Gradle tasks",
          "summary": "Trying to learn a little bit more about how Gradle deals with tasks and how to execute them in an specific order.",
          "featuredImage": "./assets/images/oneTaskToRuleThemAll/featuredImage.png",
          "thumb": "./assets/images/oneTaskToRuleThemAll/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "the-code-that-should-not-be",
          "title": "The code that should not be",
          "date": "September 8, 2017",
          "subtitle": "When coding is a waste of time",
          "summary": "Some thoughts about the amount of code you write that never see production and how to take it.",
          "featuredImage": "./assets/images/theCodeThatShouldNotBe/featuredImage.png",
          "thumb": "./assets/images/theCodeThatShouldNotBe/thumb.png",
          "tags": [
            "code",
            "business"
          ],
          "active": true
        },
        {
          "id": "readability",
          "title": "Readability",
          "date": "August 29, 2017",
          "subtitle": "Sometimes more... is more",
          "summary": "I always struggle to find an example where less code is not necessarily better, because it usually is. But recently I stumble upon an example. Clean Code* ask for readability over anything else because code is more often read than written. That sometimes may mean to be a little more verbose on the code. Let's see an example:",
          "featuredImage": "./assets/images/readability/featuredImage.png",
          "thumb": "./assets/images/readability/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "cluster-shh-tool-using-mac-os-x",
          "title": "Cluster SSH tool using MacOS-X",
          "date": "April 13, 2016",
          "subtitle": "Working with several remote machines",
          "summary": "CSSHX is a tool to allow simultaneous control of multiple ssh sessions. host1, host2, etc. are either remote hostnames or remote cluster names. csshX will attempt to create an ssh session to each remote host in separate Terminal.app windows. A master window will also be created.",
          "featuredImage": "./assets/images/clusterShhToolUsingMacOsX/featuredImage.png",
          "thumb": "./assets/images/clusterShhToolUsingMacOsX/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "test-driven-architecture",
          "title": "Test driven architecture",
          "date": "April 10, 2016",
          "subtitle": "Architect role as read on 'Extreme Programming'",
          "summary": "I have been revisiting the classic by Kent Beck, \"Extreme Programming Explained\", and I found a very interesting thought about one of the roles on the XP team: architects.",
          "featuredImage": "./assets/images/testDrivenArchitecture/featuredImage.png",
          "thumb": "./assets/images/testDrivenArchitecture/thumb.png",
          "tags": [
            "code",
            "business"
          ],
          "active": true
        },
        {
          "id": "cucumber-java-and-bdd",
          "title": "Cucumber, Java and BDD",
          "date": "August 26, 2015",
          "subtitle": "Using Cucumber tool for Behavior Driven Development",
          "summary": "Behavior-driven development (BDD) is a software development process that emerged from test-driven development (TDD). It combines the general techniques and principles of TDD with ideas from domain-driven design and object-oriented analysis and design to provide software development and management teams with shared tools and a shared process to collaborate on software development.",
          "featuredImage": "./assets/images/cucumberJavaAndBdd/featuredImage.png",
          "thumb": "./assets/images/cucumberJavaAndBdd/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "cobertura-and-maven",
          "title": "Cobertura and Maven",
          "date": "August 26, 2015",
          "subtitle": "Using Cobertura tool on multi-module maven projects",
          "summary": "Most of developers have used or heard about Cobertura tool to calculate test coverage on Java code. The main problem with that tool is that is difficult to use inside a multi-module maven project, where some module contains tests that uses java classes on several other modules.",
          "featuredImage": "./assets/images/coberturaAndMaven/featuredImage.png",
          "thumb": "./assets/images/coberturaAndMaven/thumb.png",
          "tags": [
            "code"
          ],
          "active": true
        },
        {
          "id": "important-urgent",
          "title": "I focus on what's important, not what's urgent",
          "date": "October 31, 2013",
          "subtitle": "Embracing the Important Over the Urgent in Everyday Life",
          "summary": "The importance of prioritizing meaningful connections over urgent tasks. Illustratung the enduring value of focusing on the 'why' rather than the 'what' in daily life, encouraging readers to choose what truly matters for lasting fulfillment.",
          "featuredImage": "./assets/images/importantUrgent/featuredImage.png",
          "thumb": "./assets/images/importantUrgent/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "playing-eating-sleeping",
          "title": "Playing, Eating, Sleeping",
          "date": "October 22, 2013",
          "subtitle": "A Day in the Life of a Playful Kitten",
          "summary": "This heartwarming narrative follows a day in the life of a lively kitten as it explores its home, seeks attention, and bonds with its owners through playful antics. From groggy morning greetings to attempts at stealing treats and ending with cozy bedtime rituals, the story captures the joy and unconditional love a pet brings to a home.",
          "featuredImage": "./assets/images/playingEatingSleeping/featuredImage.png",
          "thumb": "./assets/images/playingEatingSleeping/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "making-mistakes-as-you-see-fit",
          "title": "Making Mistakes as You See Fit",
          "date": "October 8, 2013",
          "subtitle": "Embracing Freedom and Personal Responsibility",
          "summary": "This insightful piece delves into the importance of embracing freedom and the responsibility that comes with it. It discusses the common tendency to relinquish personal autonomy to avoid accountability for mistakes, instead blaming external factors. The author advocates for taking control of one’s destiny, using examples like political decisions and personal growth. The narrative emphasizes that true progress and fulfillment come from facing fears, making independent choices, and accepting the consequences, no matter the outcome.",
          "featuredImage": "./assets/images/makingMistakesAsYouSeeFit/featuredImage.png",
          "thumb": "./assets/images/makingMistakesAsYouSeeFit/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "kata-and-street-fighting",
          "title": "Kata and Street Fighting",
          "date": "September 19, 2013",
          "subtitle": "Embracing Freedom and Personal Responsibility",
          "summary": "This reflective piece explores the daily struggle of balancing grace and survival instincts. It compares morning routines and workplace challenges to martial arts and street fighting, highlighting the importance of both disciplined preparation and raw survival skills. The narrative underscores how life’s difficulties can shape us into resilient individuals, ready to face any challenge with a blend of finesse and grit.",
          "featuredImage": "./assets/images/kataAndStreetFighting/featuredImage.png",
          "thumb": "./assets/images/makingMikataAndStreetFightingstakesAsYouSeeFit/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "civil-inattention",
          "title": "Civil Inattention",
          "date": "September 19, 2013",
          "subtitle": "The Subtle Art of Polite Ignorance: Navigating Modern Social Spaces",
          "summary": "Civil inattention, a concept coined by Erving Goffman, describes the polite act of subtly ignoring strangers to maintain privacy in public spaces like elevators or subways. This blog post explores its importance in social harmony, contrasting it with rude behavior that disregards others' presence. Reflecting on how economic hardship and societal engineering erode these manners, exacerbating social divisions, and comparing Western practices with the extreme courtesy observed in Japan to highlight the necessity of such social norms.",
          "featuredImage": "./assets/images/civilInattention/featuredImage.png",
          "thumb": "./assets/images/civilInattention/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "tired-of-living",
          "title": "Tired of Living (Soup, Salad, and Tomato Bread)",
          "date": "September 4, 2013",
          "subtitle": "Reflections of a Weary Soul",
          "summary": "An elderly woman reflects on her life, expressing a deep sense of weariness and longing for peace. As she sits watching the sunset, she reminisces about her past, the loved ones she has lost, and the simple joys that once brought her happiness. Now, faced with solitude and the passage of time, she grapples with the stark realities of aging and the desire for her struggles to come to an end.",
          "featuredImage": "./assets/images/tiredOfLiving/featuredImage.png",
          "thumb": "./assets/images/tiredOfLiving/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "on-decisions-and-farewells",
          "title": "On Decisions And Farewells",
          "date": "August 16, 2013",
          "subtitle": "Embracing Change and the Courage to Let Go",
          "summary": "Reflecting on the nature of making life-changing decisions, this piece delves into the fears and uncertainties that accompany significant choices. It explores the importance of courage and commitment in navigating life's paths, emphasizing the value of embracing farewells and change as essential components of personal growth and fulfillment.",
          "featuredImage": "./assets/images/onDecisionsAndFarewells/featuredImage.png",
          "thumb": "./assets/images/onDecisionsAndFarewells/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "taste-of-candy",
          "title": "Taste Of Candy",
          "date": "August 12, 2013",
          "subtitle": "A Day of Sun, Sea, and First Love",
          "summary": "A teenage boy wakes up to a typical summer day filled with light, video games, friends, and the beach. As he navigates through his morning routine and spends time with his friends, his thoughts are constantly preoccupied with a girl he likes. Through playful beach games and shared moments, he experiences the excitement and nervousness of young love, culminating in a tender, unforgettable evening by the sea.",
          "featuredImage": "./assets/images/tasteOfCandy/featuredImage.png",
          "thumb": "./assets/images/tasteOfCandy/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "why-i-do-what-i-do",
          "title": "Why I Do What I Do",
          "date": "August 7, 2013",
          "subtitle": "The Journey from Video Games to Computer Science: A Personal Reflection",
          "summary": "My journey into computer science, sparked by early encounters with video games, influential mentors, and a passion for technology. Remembering childhood experiences, friendships, and pivotal moments that shaped my professional path, culminating in a heartfelt response to a job interview question.",
          "featuredImage": "./assets/images/whyIDoWhatIDo/featuredImage.png",
          "thumb": "./assets/images/whyIDoWhatIDo/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "waiting-for-the-traffic-lights-to-turn-green",
          "title": "Waiting for the Traffic Lights to Turn Green",
          "date": "July 29, 2013",
          "subtitle": "Navigating Life's Traffic Lights: Reflections on Acceptance and Change",
          "summary": "This narrative describes a late-night journey home after work, reflecting on the metaphorical 'traffic lights' encountered in life—moments of pause and reflection. Contrasting frustration with acceptance, emphasizing the importance of changing perspectives and embracing life's journey.",
          "featuredImage": "./assets/images/waitingForTheTrafficLightsToTurnGreen/featuredImage.png",
          "thumb": "./assets/images/waitingForTheTrafficLightsToTurnGreen/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "hyenas-dont-laugh",
          "title": "Hyenas Don't Laugh",
          "date": "July 29, 2013",
          "subtitle": "Beware of the Hyenas: Navigating Deception and Predation in Society",
          "summary": "This narrative metaphorically describes societal predators as hyenas, highlighting their deceptive nature and ruthless behavior. Constrasting noble aspirations with the lurking danger of those who exploit weaknesses, urging vigilance and resistance against becoming like them.",
          "featuredImage": "./assets/images/hyenasDontLaugh/featuredImage.png",
          "thumb": "./assets/images/hyenasDontLaugh/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "ive-been-to-africa",
          "title": "I've Been to Africa",
          "date": "July 25, 2013",
          "subtitle": "A Journey through Ghana: Heat, Hospitality, and Heritage",
          "summary": "Recounting the journey to Ghana to attend a friend's wedding, reflecting on the cultural richness, hospitality, and stark contrasts of the West African nation. From navigating the bustling streets of Accra to witnessing a traditional Ghanaian wedding and visiting historical sites like Cape Coast Castle, the narrative unfolds with personal insights into the local culture, cuisine, and people. Through encounters with locals, discussions on societal norms, and embracing the heat and flavors of Ghana, we can explore the country's complexities and finds unexpected connections.",
          "featuredImage": "./assets/images/iveBeenToAfrica/featuredImage.png",
          "thumb": "./assets/images/iveBeenToAfrica/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "the-nightmares-of-others",
          "title": "The Nightmares of Others",
          "date": "June 25, 2013",
          "subtitle": "Finding Comfort in the Dark: How We Navigate Our Nightmares Together",
          "summary": "Exploring nighttime experiences of comforting others during her nightmares. Reflection on the nature of fear and its impact on our lives.",
          "featuredImage": "./assets/images/theNightmaresOfOthers/featuredImage.png",
          "thumb": "./assets/images/theNightmaresOfOthers/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "the-culture-of-the-table",
          "title": "The Culture of the Table",
          "date": "June 24, 2013",
          "subtitle": "Navigating Social Pressures While Dieting",
          "summary": "Exploring the intricate relationship between food, social interactions, and dieting. It highlights how deeply food and drink are ingrained in our social culture and the challenges one faces when trying to diet amidst constant social pressure.",
          "featuredImage": "./assets/images/theCultureOfTheTable/featuredImage.png",
          "thumb": "./assets/images/theCultureOfTheTable/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "sants-station",
          "title": "Sants Station",
          "date": "June 11, 2013",
          "subtitle": "A Glimpse into the Lives of Travelers at Sants Station",
          "summary": "Describing my fondness for the bustling Sants station, highlighting the various people who pass through, their behaviors, and the unique culture that arises in such transient spaces.",
          "featuredImage": "./assets/images/santsStation/featuredImage.png",
          "thumb": "./assets/images/santsStation/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "the-best-of-scrum",
          "title": "The Best of Scrum",
          "date": "June 5, 2013",
          "subtitle": "Finding Motivation and Growth Through Scrum",
          "summary": "Exploring the aspects of Scrum methodology that I find most valuable, particularly the emphasis on visibility, improvement, and the motivation that comes with starting new sprints. The reflection highlights how setting realistic, small goals and achieving them fosters a sense of accomplishment and drives continuous personal and team growth.",
          "featuredImage": "./assets/images/theBestOfScrum/featuredImage.png",
          "thumb": "./assets/images/theBestOfScrum/thumb.png",
          "tags": [
            "code","life"
          ],
          "active": true
        },
        {
          "id": "letting-go",
          "title": "Letting Go",
          "date": "May 30, 2013",
          "subtitle": "Embracing Change: The Art of Letting Go",
          "summary": "Reflecting on the process of moving and the insights it brings about our attachment to material possessions. It explores the joy of decluttering, the realization of how little we truly need, and the liberating feeling of letting go. The narrative highlights the emotional journey from attachment to excitement about new beginnings, emphasizing the importance of overcoming fear and embracing change.",
          "featuredImage": "./assets/images/lettingGo/featuredImage.png",
          "thumb": "./assets/images/lettingGo/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "the-contrails-of-airplanes",
          "title": "The Contrails of Airplanes",
          "date": "May 30, 2013",
          "subtitle": "Tracing the Skies: Embracing Change and Imperfection",
          "summary": "Reflecting on the beauty and symbolism of the contrails left by airplanes against a radiant blue sky. It contrasts the unnatural shapes of buildings with the natural canvas of the sky, pondering on the transient nature of these white streaks. The narrative delves into the wonder of flight and the marvels of science, while also using the impermanence of contrails as a metaphor for embracing change and the unexpected in life.",
          "featuredImage": "./assets/images/theContrailsOfAirplanes/featuredImage.png",
          "thumb": "./assets/images/theContrailsOfAirplanes/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "creating-and-destroying",
          "title": "Creating and Destroying",
          "date": "May 30, 2013",
          "subtitle": "The Dual Nature of Creation and Destruction",
          "summary": "Explores the intricate relationship between construction and deconstruction through the lens of urban development. The narrative reflects on the transformation of a chaotic construction site into a bustling commercial hub, emphasizing the creativity, challenges, and eventual detachment experienced by those involved in the project. It parallels the creation of physical spaces with the creation of art, highlighting the inevitability of change and the necessity of relinquishing control for growth and evolution.",
          "featuredImage": "./assets/images/creatingAndDestroying/featuredImage.png",
          "thumb": "./assets/images/creatingAndDestroying/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "the-tenderness-of-small-things",
          "title": "The Tenderness of Small Things",
          "date": "May 30, 2013",
          "subtitle": "Cherishing Life's Small Delights",
          "summary": "Telling the story of a pet hamster and its daily life. The narrative delves into the charming habits and personality of the little creature, highlighting the affection and care it receives from its owner. Through vivid descriptions, the story captures the joy of observing and interacting with this small pet, emphasizing the importance of appreciating the tiny moments of tenderness and connection in life.",
          "featuredImage": "./assets/images/theTendernessOfSmallThings/featuredImage.png",
          "thumb": "./assets/images/theTendernessOfSmallThings/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "the-7-am-coffee",
          "title": "The 7 AM Coffee",
          "date": "May 30, 2013",
          "subtitle": "A Morning Ritual of Connection and Reflection",
          "summary": "Sharing a poignant morning ritual of savoring a coffee at a local bar before work. This quiet moment offers a glimpse into the lives of early risers, blending the past and present as the author reflects on childhood memories of accompanying their father. The piece captures the sense of community among strangers and the comforting rhythm of daily routines, revealing the subtle beauty in ordinary experiences.",
          "featuredImage": "./assets/images/the7AmCoffee/featuredImage.png",
          "thumb": "./assets/images/the7AmCoffee/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        },
        {
          "id": "superheroes-on-the-couch",
          "title": "Superheroes on the Couch",
          "date": "May 30, 2013",
          "subtitle": "Rediscovering Childhood Joys Through Imagination",
          "summary": "Recounting a solo evening watching a superhero movie that unexpectedly evokes nostalgic childhood memories. Immersed in the film, rediscovering the joy and passion of imaginative play from their youth. This introspective piece highlights how the unrestrained creativity of childhood can continue to shape and enrich one's adult life, prompting a renewed commitment to embrace imagination and passion in everyday activities.",
          "featuredImage": "./assets/images/superheroesOnTheCouch/featuredImage.png",
          "thumb": "./assets/images/superheroesOnTheCouch/thumb.png",
          "tags": [
            "life"
          ],
          "active": true
        }
      ]
  };  
  