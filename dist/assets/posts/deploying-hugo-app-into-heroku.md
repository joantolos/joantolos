Heroku is awesome. I have been using Heroku as platform hosting for my pet projects for many years now. It has everything I need to start toying with new ideas. When I try something new, a framework, a database, new language or whatever... I always try to deploy this new thing into Heroku. That way I learn how to deal a little bit with the DevOps part of the new thing I am trying.

# Heroku and static pages generator frameworks

This very website you are reading, which is a simple blog, is created with the framework <a href="https://gohugo.io" alt="Hugo." target="_blank">Hugo.</a> It is also deployed on <a href="https://www.heroku.com" alt="Heroku" target="_blank">Heroku</a>, which offers platform capabilities as a service. Since everything is a service, you can not mess directly with the machine as you would do on AWS for example. You can do some things, but don't have absolute control over it. Instead, you consume several service to do what you need to be able to run your software.

So, for example, if you want to add a Postgres Data Base into your app, you will have to add a new "Resource" called Heroku Postgres and Heroku will install the database instance and provide ways to interact with it. Popular add-ons include Redis, Kafka, ElasticSearch, Solr, Memcached... almost anything you may need for your Cloud application, there is at least one add-on available. Be aware of features and prices because not all of them are free and most of them include a subset of features for free and and upgrade program if you need more.

# The procfile

Once your app is ready to be deployed, you need to configure a Procfile (Process File) that will define the commands to be executed on startup. For example, if you have a Java web app with Spring boot, your procfile will look something like:

    web: java -jar target/myapp-1.0.0.jar

# Buildpacks

Buildpacks are responsible for transforming deployed code into a slug. Buildpacks are composed of a set of scripts, and depending on the programming language, the scripts will retrieve dependencies, output generated assets or compiled code, and more. This output is assembled into a slug by the slug compiler.

There are a lot of supported buildpacks out of the box for Ruby, Python, Java, Clojure, Node.js, Scala, Go and PHP. But you can also create a custom one for your framework/language. This is the case for HUGO.

# Custom buildpack for HUGO framework

You can create your own buildpack if your language/framework is not yet supported by Heroku using the <a href="https://devcenter.heroku.com/articles/buildpack-api" alt="Buildpack API" target="_blank">Buildpack API</a>. If you search for HUGO plus Heroku you will probably find this repository with a buildpack already present:

https://github.com/roperzh/heroku-buildpack-hugo

You can easily add a new buildpack on the settings page of your app on Heroku. Once the app is starting, it will execute the code of the buildpack.

I was using the buildpack mentioned above, the one by Roperzh for quite a long time, and it works fine. The problem is with the latest Heroku stack update. They keep updating versions to be able to deploy the latest features. There is a perfect reasonable policy in place to let you know when a new stack is available and whether if your old stacks are being discontinued or not (which eventually do).

That happened to me recently when updating my blog. The app will no longer deploy because it is stored on a discontinued stack. The latest stack I should move is Heroku-20, so I did, and the app stop working... as expected.

It took me a while to figure out why, and the problem is that the buildpack I was using (kindly provided by Roperzh) was relaying in Python 2 but the new Heroku 20 stack is using Python 3. It turns out that the way it deals with http request is slightly different, so I had to change the buildpack in order to work again.

Here is my pull request to the original repository:

https://github.com/roperzh/heroku-buildpack-hugo/pull/36

I don't think that this repository is maintained because there are pull request pretty old still pending to merge, but I had to make the contribution either way for others to see, in case someone has the same problem that I did.

Since the pull request is not merged yet and I need the code to be able to deploy, I cloned the code and updated a local version to my own repository with the change in place:

https://github.com/joantolos/kata-hugo-heroku-buildpack

If you use this repository and add it as a webpack on your Heroku app... voilà! the app is starting again.

# Recap

Just updating a function from Python 2 to its equivalent on Python 3, but I think is worth to share it, just in case someone has to deal with the same problem.

Enjoy your HUGO app deployed on Heroku-20 stack!

## References:

* _Photo <a href="https://www.dreamstime.com/royalty-free-stock-images-teamwork-integration-concept-business-puzzle-image36786769" target="_blank">36786769</a> © <a href="https://www.dreamstime.com/alphaspirit_info" target="_blank">Alphaspirit</a> | <a href="https://www.dreamstime.com/photos-images/integration.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://github.com/roperzh/heroku-buildpack-hugo" alt="Original webpack repository" target="_blank">Original webpack repository</a>_
* _<a href="https://github.com/joantolos/kata-hugo-heroku-buildpack" alt="Repository with the patch applied" target="_blank">Repository with the patch applied</a>_
* _<a href="https://devcenter.heroku.com/articles/procfile" alt="The Procfile" target="_blank">The Procfile</a>_
* _<a href="https://devcenter.heroku.com/articles/buildpacks" alt="Buildpacks" target="_blank">Buildpacks</a>_
* _<a href="https://devcenter.heroku.com/articles/buildpack-api" alt="Buildpack API" target="_blank">Buildpack API</a>_
