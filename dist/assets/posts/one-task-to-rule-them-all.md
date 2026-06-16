Trying to learn a little more about how Gradle deals with tasks and how to execute them in a specific order.

# The problem

I was asked for help on a project dealing with Gradle task and what is seemed like a simple _ordering task_ problem. The set-up is the following:

![Module layout](/assets/images/oneTaskToRuleThemAll/gradleTaskLayout.png#postImageSmall)

This is a simplification of the project layout, where names have been changed. We have a module that creates files and another module that consumes the files. The restrictions are:

* Both the production and consumption of the files must work as an standalone Java program
* The producer creates a larger number of files but the consumer will one consume the **selected** file that satisfies the following rules:
  * The name of the file starts with a certain string.
  * The latest modified file that matches the first rule.

# The Gradle solution

The idea is to have three gradle tasks:

* **produce:** Will create the list of files invoking the Java program on "producer" module and store them into the output folder.
* **select and move:** Will select the proper file following the rules and move it to the input folder of the consumer.
* **consume:** Will grab the files from it's input folder and process them.

Since the producer and consumer are standalone Java programs, that means that contains a class with a main method to execute, so I discovered the **JavaExec** type of Gradle task.

On the producer _build.gradle_ file:

```javascript
task produce(type: JavaExec) {
    main = 'com.joantolos.gradle.file.producer.ProducerApp'
    classpath = sourceSets.main.runtimeClasspath
}
```

This JavaExec type of task allows us to run a Java program, just specifying the main class and the classpath. You can also define the args array if needed.

The same strategy for the consumer:

```javascript
task consume(type: JavaExec) {
    main = 'com.joantolos.gradle.file.consumer.ConsumerApp'
    classpath = sourceSets.main.runtimeClasspath
}
```

Now if we execute:

    gradle produce

The list of files is created into the output folder of the producer module. Then, if we manually grab one of them and put it into de input folder of the consumer module, we can execute the consumer:

    gradle consume

So, the only link missing is the selecting and moving part. For that, I found the Copy task from Gradle that have a simple syntax:

```javascript
task copy(type: Copy) {
    from 'outputFolder'
    into 'inputFolder'
}
```

Now I know hoy to copy files, but first I have to be able to select the latest modified matching a substring on the name, from the produced list. For that, my college made this cool combination of regular expression and Groovy scripting.

Given:

* **outputFolder:** The folder where the files are located. The output folder from the producer module.
* **filePattern:** The substring to find in the file name.

We can apply this to find the candidate file, the last one modified matching the substring on its name:

```javascript
String lastFile = new File(outputFolder).listFiles().findAll { filePattern.matcher(it.name) }?.sort { -it.lastModified() }?.head()?.getName()
```

Cool, we have a name, now let's copy the fortunate file to the input folder of the consumer. We have the Copy task from Gradle to do that, so something like that should work:

```javascript
task pickLast(type: Copy) {
    String lastFile = new File(outputFolder).listFiles().findAll { filePattern.matcher(it.name) }?.sort { -it.lastModified() }?.head()?.getName()

    from outputFolder + lastFile
    into inputFolder
}
```    

Good. Now if we execute the three tasks one by one, it works, eureka. Now let's create an additional Gradle task, let's call it _process_ that only has to execute the three task in order, and we should be good to go. Now is where things get ugly...

In Gradle, there is no such thing as "order" in task and technically there is no point of calling a task inside another, since this is a **building tool** we are talking about. What we can do is make the tasks depending one on another.

So, Gradle offers different tools to do that:

* dependsOn
* doLast
* taskY.shouldRunAfter taskX
* taskY.shouldRunBefore taskX
* taskY.mustdRunAfter taskX
* taskY.mustRunBefore taskX

After fooling around a little with several combinations I figure out some way to execute three tasks in order:

![Depends on](/assets/images/oneTaskToRuleThemAll/dependingTasks.png#postImageSmall)

It took me a while to figure out that, so I will keep that diagram close to my heart, if I never have to work with that kind of things again.

The solution didn't completely work thought. For some reason, the copy task was always running _**before**_ the produce task. So, either there were no files to select from (that being the first execution), or it was always selecting from the latest execution.

I struggled with different combinations of the Gradle tools with little success and having the feeling that the Copy task is not being executed, but evaluated.

At that point in time I just hated Gradle and start thinking on alternative solutions. But then I went deep on the Gradle forums, which by the way are super useful (I deeply recommend them), and decided to give it another chance. I found some interesting concepts when working with tasks:

## Creating your own task type

This is a possibility that Gradle offers. We can use the power of Groovy and define a _class_ inside the _build.gradle_ file and use that class as a task type. So we can define something like this:

```javascript
task generator(type: Generate) {
    fileCount = 20
}

class Generate extends DefaultTask {
    @Input
    int fileCount = 10

    @OutputDirectory
    File generatedFileDir = project.file("${project.buildDir}/generated")

    @TaskAction
    void perform() {
        for (int i=0; i<fileCount; i++) {
            new File(generatedFileDir, "${i}.txt").text = i
        }
    }
}
```    

This is an example extract from the Gradle forum, and it looks like it fit the needs perfectly. We even have annotations for input and output and then a _TaskAction_ where you can write Groovy code. Nice, let's try to adapt it to our needs. I would like to have something like this:

```javascript
task process(type: Generate) {
    outputFolder = '/producer/src/main/resources/output/'
    inputFolder = '/consumer/src/main/resources/input/'
    filePattern = 'File-Type-Something'
}

class Generate extends DefaultTask {
    @Input
    String inputFolder

    @Input
    String filePattern

    @OutputDirectory
    File outputFolder = outputFolder

    @TaskAction
    void perform() {
        //Generate, move and consume
    }
}
```    

That looks perfect, now I only have to make an instance of the producer inside the perform method of the task. What I would like to do is something like this:

```javascript
@TaskAction
void perform() {
    Producer producer = new Producer(outputFolder)
    producer.produce()

    String lastFile = new File(outputFolder).listFiles().findAll { filePattern.matcher(it.name) }?.sort { -it.lastModified() }?.head()?.getName()

    FileUtils.copyFileToDirectory(new File(outputFolder + lastFile), new File(inputFolder))

    Consumer consumer = new Consumer(inputFolder)
    consumer.consume()
}
```    

This code already smells a little to my nose as it is doing a lot of things in a _Java fashion way_ inside the build file of a project. But not only that, the thing is that it does not even work. In fact, you can not do that.

You can use Java classes inside your build and use Groovy to perform actions with them, but only with classes inside a jar file defined as a dependency. You can not use a class of your project, because it is not compiled yet. Gradle is a building tool, and you define and use tasks to define the **build** of your project. So, when trying to use the Producer or Consumer class on the script, that classes _are not compiled yet_.

That made me think that we are not using Gradle as it is supposed to be used. The copy task, the depends, the possibility of define classes... all this toolbox is offered to you in order to define the build of your project. You are not supposed to execute a Java program and then expect to collect the results of that program to execute another one. This is more a task for an SSH script, again, **Gradle is a building tool.**

# Compromise solution

At that point I had a lot of questions about this project:

* Is the use of files strictly necessary?
* Why the producer and consumer should behave as a standalone program?
* How this process will be executed or deployed?

Before going deep on the whole program purpose and doubt the design I want to provide a solution so my college can go on with the project. Finally, I found a solution that could be implemented right away:

On the consumer build.gradle file we can add the following task:

```javascript
task process(type: JavaExec) {
    dependsOn ':producer:produce'
    main = 'com.joantolos.gradle.file.consumer.ConsumerApp'
    classpath = sourceSets.main.runtimeClasspath
}
```    

This task depends on the _produce_ task inside the build.gradle on the producer, which looks like that:

```javascript
task produce(type: JavaExec) {
    main = 'com.joantolos.gradle.file.producer.ProducerApp'
    classpath = sourceSets.main.runtimeClasspath

    doLast {
        String lastFile = new File(outputFolder).listFiles().findAll { filePattern.matcher(it.name) }?.sort { -it.lastModified() }?.head()?.getName()
        FileUtils.copyFileToDirectory(new File(outputFolder + lastFile), new File(inputFolder))
        println('File copied from ' + outputFolder + ' to ' + inputFolder + ": "+lastFile)
    }
}
```    

Here we have the magic, or the tricky part. Using the Copy type task from Gradle was giving problems because of the evaluation against the execution, so I tried to copy the files some other way and that is when Apache Commons come to help. We can use **FileUtils** from Apache Commons IO library to copy the file and mark this procedure as "doLast" inside the produce task.

Now we have arrived at the solution only with two Gradle tasks added. You can find the POC of the whole experiment here: <a href="https://github.com/joantolos/gradle-file-selector" target="_blank">Gradle Producer/Consumer POC</a>

Even with the project working, I wasn't happy with the final solution... Mixing two executions of Java programs with some scripting magic is something that I don't find simple to understand. The main question is:

**Where is the logic about finding the latest file modified matching a name described?**

It is not explicitly described anywhere on the code, that after the producer does its thing, there is a "candidate file selection" process after. It is hidden, obfuscated on the Gradle task. If a new coder joins the team tomorrow, he or she must debug and inspect the Gradle tasks in order to understand what the program does. To me, this is a big problem. The code should tell the story of what it does simply _reading_ it, that is why is written in a programming _language_ whatever it is.

# The Batch Processor solution

Why not make explicit the logic of the program, by creating a new module named "batch" with do the batch process that we are implemented on the Gradle tasks:

![Module layout](/assets/images/oneTaskToRuleThemAll/gradleTaskNewLayout.png#postImageSmall)

* Produce the files
* Move one of them
* Consume it

How many "type of files" do we have? I mean, the substring that we have to match with the file name is kind of a type of batch processor right?

So, now with a single task that compiles the whole logic and a Java class where you can _read_ what is doing:

```javascript
this.producer.produce();
FileUtils.copyFileToDirectory(getOutputFile(outputPath), new File(inputPath));
this.consumer.consume();
```    

Produce, copy and consume, simple as that. This Batch class is more simple to understand, maintain and extend. For example, we can convert this class into a service if necessary (and discard the main method). It is an entry point for the logic associated with the file processing. That way we can identify patterns like, is it worth it to have a single class (or service) for every type of file? Or we can go on with a generic single one?

# The Next Step solution

Files suck. I mean having to write and read files from disk, you face a lot of inconvenient stuff like concurrency, input/output exceptions, folders location, etc... Besides, writing files to disk is expensive and slow.

I would strongly recommend to get rid of the files. This type of batch processors scream for some kind of queue system, where the producer writes into de queue that the content is ready and the consumer listen to the queue and start processing. But if this solution is overkill for this exact situation, it is still worth it's trying not to use the files. Maybe writing a byte array into a database or something less _heavy_.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-rear-view-thoughtful-woman-who-tries-to-solve-math-problems-calculations-black-chalk-board-image56838612" target="_blank">56838612</a> © <a href="https://www.dreamstime.com/denisismagilov_info" target="_blank">Denisismagilov</a> | <a href="https://www.dreamstime.com/" target="_blank">Dreamstime.com</a>_
* _<a href="https://blog.gradle.org/introducing-incremental-build-support" target="_blank">Blog Gradle: Introducing Incremental Build Support</a>_
* _<a href="https://docs.gradle.org/current/userguide/custom_tasks.html" target="_blank">Blog Gradle: Writing Custom Task Classes</a>_
* _<a href="https://docs.gradle.org/current/userguide/working_with_files.html" target="_blank">Blog Gradle: Copying files</a>_
