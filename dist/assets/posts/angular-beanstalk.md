AWS offers so many services that sometimes some of them go unnoticed, it is very difficult to know them all. In this post, we will walk through the step-by-step process of deploying an Angular app on AWS Elastic Beanstalk, the scalable Platform as a Service (PaaS) offered by Amazon Web Services. By the end of this tutorial, you'll have a fully deployed Angular app, ready to scale and serve users with high performance on the AWS cloud.

# Step 1: Prerequisites
Make sure you have the following prerequisites:

1. **Angular CLI:** Install and configure the <a href="https://angular.io/cli" target="_blank" alt="Angular CLI">Angular CLI</a> on your local machine.
2. **NPM CLI:** Install and configure the <a href="https://docs.npmjs.com/cli/v10" target="_blank" alt="Angular CLI">NPM CLI</a> on your local machine.
3. **AWS Account:** You need an <a href="https://aws.amazon.com/" target="_blank" alt="Amazon AWS">Amazon AWS</a> to use Elastic Beanstalk.
4. **AWS CLI:** Install and configure the <a href="https://aws.amazon.com/cli/" target="_blank" alt="Amazon AWS CLI">Amazon AWS CLI</a> on your local machine.
5. **Elastic Beanstalk CLI (EB CLI):** Install the <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html" target="_blank" alt="Amazon AWS CLI">EB CLI</a> on your local machine.

After everything installed, you should be able to run these commands on your local machine:

```javascript
ng version
npm --version
aws --version
eb --version
```

# Step 2: Create your Angular app

Since we are doing this from scratch, we are going to create a brand new Angular app. After finishing the tutorial, you can just substitute the code with your own app. First, use the Angular CLI to create a new app:

```javascript
ng new beanstalk-poc
```

Follow the prompts to configure your application. Then navigate to the project directory:

```javascript
cd beanstalk-poc
```

Once you’re inside the project directory, run the following command to start the Angular development server:

```javascript
ng serve
```

If you go to http://localhost:4200 you will see the default page from Angular CLI:

![App screenshot](/assets/images/angularBeanstalk/angular.png#postImageMedium)

It's not much but it is indeed an Angular application that we can try and deploy on AWS.

# Step 3: Run the app as Node service

It's easier to treat the app as a Node service instead of relying on the Angular CLI to run the application. For that, the easier way to go is using ExpressJS, so we can go ahead and install it, along with "path":

```javascript
npm install --save express
npm install --save path
```

After the installation, you should see the new entries on your project's _package.json_. Now we need a controller to serve the Angular files. Create a file "server.js" on the root of the project with the following content:

```javascript
var express = require('express');
const path = require('path');
var app = express();

app.use(express.static(__dirname + '/dist/beanstalk-poc'))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/beanstalk-poc/index.html'));
});

app.listen(process.env.PORT || 4200);
```

Since Angular creates a single page application, this endpoint is simply redirecting any request to the folder where Angular creates the bundle. Now you need to change the start script defined on the package.json from **"ng serve"** to **"node server.js"**: 

```javascript
"scripts": {
    "ng": "ng",
    "start": "node server.js",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
}
```

Now you should be able to run your app either with:

```javascript
ng serve
```

as before, or:

```javascript
npm start
```

The Beanstalk server will run the command from npm so make sure that it is working propertly on your localhost.

# Step 4: Login to your aws account

Make sure you are logged in into the proper aws account, that probably means login using Azure login. Verify that your IAM user or role has the necessary permissions to create Elastic Beanstalk applications. The required permissions include **elasticbeanstalk:CreateApplication** and other permissions related to Elastic Beanstalk.

# Step 5: AWS Elastic Beanstalk Configuration

Create Elastic Beanstalk Application using a terminal on your project directory. 

1. Run the following command to initialize your Elastic Beanstalk application:

```javascript
eb init -p node.js
```

Follow the prompts to configure your application.

2. Create Elastic Beanstalk Environment
Run the following command to create an environment:

```javascript
eb create angular-beanstalk-dev
```

Replace angular-beanstalk-dev with a unique name for your environment.

Elastic Beanstalk will prompt you to set up an RDS database. Since your application doesn't require a database, you can choose "No" when prompted.

Wait for the environment to be created. This might take a few minutes.

# Step 6: Configure Environment Variables

Elastic Beanstalk allows you to set environment variables for your application.

1. Open the Elastic Beanstalk console.
2. Navigate to your environment, and in the left navigation pane, click on "Configuration."
3. In the "Software" section, find the "Environment properties" card.
4. Add any necessary environment variables (e.g., PORT, NODE_ENV, etc.).

# Step 7: Deploy your Application

Once your environment is created, deploy your application by running:

```javascript
eb deploy
```

Wait for the deployment to finish.

# Step 8: Open your Application

After deployment, open your application in a web browser using:

```javascript
eb open
```

This should open your application in a new browser window.

# Additional Notes:

- **Configuration Files:** Elastic Beanstalk uses configuration files (.ebextensions) to customize the environment. You may need to create a configuration file if your application requires specific settings.

- **Troubleshooting:** If there are issues during deployment, check the Elastic Beanstalk logs for errors. You can view logs using the AWS Management Console or the EB CLI:

```javascript
eb logs
```

## References:
* _Illustration <a href="https://www.dreamstime.com/ai-generated-image-wolf-sheeps-clothing-image274359852" target="_blank">274359852</a> © <a href="https://www.dreamstime.com/graphicphoto_info" target="_blank">Graphicphoto</a> | <a href="https://www.dreamstime.com/stock-photos" target="_blank">Dreamstime.com</a>_
* _<a href="https://angular.io/cli" target="_blank" alt="Angular CLI">Angular CLI</a>_
* _<a href="https://docs.npmjs.com/cli/v10" target="_blank" alt="Angular CLI">NPM CLI</a>_
* _<a href="https://aws.amazon.com/" target="_blank" alt="Amazon AWS">Amazon AWS</a>_
* _<a href="https://aws.amazon.com/cli/" target="_blank" alt="Amazon AWS CLI">Amazon AWS CLI</a>_
* _<a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html" target="_blank" alt="Amazon AWS CLI">Amazon AWS Elastic Beanstalk CLI</a>_
