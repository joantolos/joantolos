# The problem

Most of the developers have used or heard about Cobertura tool to calculate test coverage on Java code. The main problem with that tool is that is difficult to use inside a multimodule maven project, where some module contains tests that uses java classes on several other modules.
The result on that cases is a poor coverage or zero percent, just because is not taking into account all the modules implies.

# The solution

I have written a very simple POC using Cobertura tool into a multimodal project, you can find it on GIT:

<a href="https://github.com/joantolos/cobertura-plus" alt="Cobertura plus POC" target="_blank">Cobertura plus POC</a>

On the **README.md** file you will find all the steps needed to execute the tests and check the report.

On that example whe have two modules with code (product and enum), a module containing two tests and a module to collect all the Cobertura scripts and results.

![Module layout](/assets/images/coberturaAndMaven/cobertura-module-layout.png#postImageMedium)

If you follow the steps detailed on the README.md file on GIT, you will obtain a Cobertura report like this:

![Coverage report](/assets/images/coberturaAndMaven/cobertura-report.png#postImageMedium)

With that POC you have all the necessary information to include the Cobertura capabilities in your multimodule project.

Hope this post helps other developers to improve the code checking the final reports.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-press-media-camera-video-photographer-duty-public-new-news-coverage-event-reporter-mass-communication-image55892060" target="_blank">55892060</a> © <a href="https://www.dreamstime.com/khunaspix_info" target="_blank">Khunaspix</a> | <a href="https://www.dreamstime.com/photos-images/coverage.html" target="_blank">Dreamstime.com</a>_
