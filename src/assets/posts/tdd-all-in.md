# The setup

We faced a complicated release to production on our team. We had to include a brand-new feature that will stress the application on different levels: user interface, backend and data. We had also a small window to release it so the pressure was high. Let's establish a little the requirements, on a high level (without revealing details of the business).

![Tree layout](/assets/images/tddAllIn/overview.png#postImageBig)

We had to implement the new feature using the green boxes. All those components exist already, so we have to add the feature without impacting the existing code. So, we needed:

* Add a whole new navigation path on the User Interface (in that case, a web browser application), including the possibility for a user to upload a file.
* Add the new endpoint to the application API (the Node JS microservice) which will parse the data from the other services and arrange it in a way that is super easy to consume for the UI. In other words, it creates a tailored JSON response to fit the specific needs of the UI. That way there is no logic on the browser.
* Add the logic of the feature on a Java Microservice. This was the tricky part because we had two dependencies:
  * We need to retrieve data from a third party (inside the company) Java Microservice which we don't control and know how it works.
  * The input for this third party microservice is calculated from the user input on the user interface (the user uploads a file).

The content of that file is then processed by a series of complex algorithms (related with chemical and biological stuff) and the result of all that process is transform into the third party service input contract. This input transformation was implemented on a POC just to proof the viability of the feature. The results were good so now we have to transform this POC  into well crafted production code. The POC code was created by mathematicians and scientist so although it does the job, we can not simply use it. We have to understand it and re-write it on a fashion that suites the application. This code is represented as "spaghetti code" on the diagram.
No offence intended for the scientist colleges that wrote that code. The algorithmic work that includes is beautiful, it's just that it is not created to fit into the entire microservice architecture.

So the risks are very clear:

* Thigh schedule
* Dependency from another team
* Unraveling the spaghetti code

I always consider black boxes as a big risk and the dependency with the other team and the spaghetti code are black boxes. So, all the alerts went on, this was a risky feature.

# The implementation

I had to write the code on the Java Micro-Service and the Node JS Micro-Service. Another fellow developer will write the code on the User Interface at the same time.

At that point I took a big decision: I choose to go full TDD from the beginning, let me explain... It is tempting in situations like that with big risks and thigh schedule to try to make the minimum impact on the code base. Try to "smuggle" the feature in without making any noise or big refactors. And TDD explicitly states a refactor on every iteration. I have been coding with TDD for a long time now, so I choose to really test the technique and prove to myself that TDD fits stressful situations as well. I went all in with TDD.

## Let's code the first test battery: **Provide data to the UI**

My fellow from the UI needs to start working right away if we want to meet the date, so we decided a JSON contract for the UI to consume that seemed appropriate at the time, keeping in mind that when the black boxes start to open, the contract may change.

So my first test was that given a certain input example, the API will respond with the decided JSON. I just made an endpoint that will response the same mock JSON result every time. Both on the NodeJS service and the Java service. Like this:

![Data to UI](/assets/images/tddAllIn/dataToUI.png#postImageBig)

The UI developer has data to work with from day one, even before than he has the minimum framework to start showing the data. Now the only thing that I have to do is substitute all the pieces of that mocked JSON with the real results bit by bit and the User Interface will start to see real dynamic data little by little. All right, we have an strategy, let's open the boxes.

## The second test battery: **Communicating with the third party**

The difficult thing about the third party Java Micro-Service is that the input for the call is constructed from the user input file with the algorithms applied from the spaghetti code. So building this input is the tricky part.

I do a test named like this _"thirdPartyServiceShouldReturnData"_ and what I code with that is just that the call to the third party service returns something. At the beginning it returns a well-formed JSON informed that the input is incorrect, which makes sense because I haven't integrated the spaghetti code yet.

This is good news because it means that the service won't break or send an exception when the input is wrong, so I can little by little create the correct input. I have some examples of correct inputs, so I write a few more tests checking the correct responses. I also discover that the service will in fact respond exceptions when the input is not only wrong but totally malformed, so I test that as well. After this point I am sure that our service will be able to handle any response from the third party.

Writing those tests, helped me understand how the third party service works, and how it reacts to different input combinations. First black box opened.

## Third test battery: **Changing the mock**

Until now, I was mocking the third party response, but now I know hot to interact with the third party, and all the possible responses are tested. The black box is more or less opened and the service seems to respond ok for all situations.

I also have several examples of inputs for that service, so that is what I am going to mock instead of the response. Let's make the third party work and actually use the whole workflow, like this:

![Mocking Input](/assets/images/tddAllIn/mockedInput.png#postImageBig)

## Fourth test battery: **Unraveling the mystery**

At that point, I know that everything works if the third party service gets the proper input, so I only have to create the proper input using the data that the user provided on the UI and processing it with the logic on the spaghetti code. Let's start by trying to understand what the code does, how? well... writing tests. I wrote a series of little unit tests on the spaghetti code for what I thought were minor logic units. Due to test writing, I was able to understand the the code did three basic things:

**1 -** Parse the user input into an input stream and use a third party library to create an object from that input stream.

**2 -** Read two configuration files (one xml and one textual) to determine the behaviour of the process desired.

**3 -** Apply the changes on the generated object from the conclusions extracted reading the configuration files.

The result object contained all the information that I needed for the third party input service. Just a little tweaks here and there will be needed to match the expected input contract.

With that understanding of the code, I could easily start implementing this three features on the correct place. About the **first one**, it is easy to test the parsing of a byte array and transform that into an input stream. About the **second one**, I can write tests about the configuration loading. I even include this new config files into the configuration system on our service that allows to change the configuration on real time. About the **parsing of the result object** into the proper input JSON... nothing that a few lambda expressions and a bit of functional programming can't do. Just messing around with collections and so.

All three steps really easy to test, and so, to implement. Then put all three of them together, and finally we obtain the following:

![Mocking Input](/assets/images/tddAllIn/final.png#postImageBig)

# The conclusion

Not only am I happy to have chosen to use TDD, but I am completely convinced that it would not have worked otherwise. The risks of opening the boxes and little by little discover what they do is just simply too high to do it without a safety net.

TDD is not an option to me anymore (it never really was). I think that I have tested the TDD technique in pretty much any real situation to be convinced that it is the way to go. I am not comfortable working without TDD anymore, and I don't really want to do it.

Of course, I am open to new ways. I try to keep myself active into the developer community and I will check any new alternative that comes. But for now, while there is no better alternative, I am going all in with TDD.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-poker-player-going-all-pushing-his-chips-forward-close-up-image65532158" target="_blank">65532158</a> © <a href="https://www.dreamstime.com/nazarovsergey_info" target="_blank">Sergey Nazarov</a> | <a href="https://www.dreamstime.com/photos-images/poker-all.html" target="_blank">Dreamstime.com</a>_
