I like to take inspiration from my day-to-day life to code little proofs of concept or pet projects. It is a nice reminder that we live completely surrounded by code, and we can't really take a couple of steps without interacting with software. From your building's elevator to the lights in your city, everything has code running. I like to replicate and simulate those pieces of code whenever I find the opportunity.

# The idea

For this case, I observed the behavior of some traffic lights in my neighborhood that would be nice to emulate. There is a crosswalk before my kids' school where the pedestrian light has a button to push and request the traffic to stop. So, by default, the vehicle light is always green, and the pedestrian light is always red. This behavior is normal because outside the school hours, there is little people confluence there, so it is more efficient to stop the traffic only on demand. Of course, this means that during the school rush hours, there is a bunch of parents and kids trying to cross, but the vehicles still have to be able to pass, so the "stop traffic button" has some behavior implemented so everyone has a fair chance. I am sure you have seen one of those traffic lights with a button in your city.

Since traffic lights are a visual thing, I decided to implement this outside my comfort zone using HTML, CSS, and Javascript. That is the point of these exercises: to explore new technologies or insist on the ones I am not so savvy with.

# The requirements

Anyway, this is the behavior I have observed over the countless hours, requesting and waiting for the vehicles to stop so I can drop my kids off at school:

- The default state of the system is: the vehicle light is always green, the pedestrian light is always red.
- When a pedestrian requests to pass, the vehicle light goes to yellow immediately. After that, it behaves like any other vehicle light... a few seconds in yellow and then red. Then the pedestrian light goes to green, and after a time that I have named the **pedestrian grace period**, the green light starts to blink and goes to red again, allowing vehicles to pass again. I have termed this whole process the **stop traffic sequence.**

Up to this point, there is nothing fancy about this behavior... the button just triggers the stop traffic sequence. Nothing worth implementing. But, if you have ever interacted with some of these things before, you will notice that the vehicle light doesn't go straight to yellow all the time. Here's the additional behavior:

- Once the pedestrian light goes from green to red, there is a period where the vehicle light will remain green, regardless of pedestrian requests to stop. This is to prevent traffic congestion during pedestrian rush hour. I call this time the **vehicle grace period.**
- If a pedestrian requests a stop during the vehicle grace period, the system has to record that request and start the stop traffic sequence immediately after the vehicle grace period ends. Otherwise, the system should go back to the initial default state: vehicles green, pedestrians red.

Describing this is challenging in writing; I sincerely hope, at this point, that you have interacted with some traffic lights of this kind.

# CSS

First we need to draw the two traffic lights. Since we are interacting the the browser and CSS, I am thinking a couple of divs for the two lights, three color circles for the vehicles lights and two stick figures for the pedestrian light.

This should do it for the vehicles light:

```javascript
.traffic-light-container {
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
}

.vehicle-light {
  width: 70px;
  height: 180px;
  background-color: #f0f0f0;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 40px;
}
```

Along with the circles that will later color:

```javascript
.light {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(119, 119, 119, 0.1);
  border: 2px solid rgba(0, 0, 0, 1);
  position: relative;
}
```

A very similar approach for the pedestrian lights:

```javascript
.pedestrian-light-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -125px;
}

.pedestrian-light {
  width: 49px;
  height: 110px;
  background-color: #f0f0f0;
  border: 2px solid black;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
}
```

I tried to draw the stick figures for the "stop" and "walk" pedestrian lights, but I declare myself completely incompetent to do it. I couldn't render something decent for the life of me. The CSS artists will have my respect forever. I used Font Awesome instead, where you can render an icon using just a CSS class:

```javascript
<i class="fa-solid fa-person"></i>
<i class="fa-solid fa-person-walking"></i>
```

With those elements (and a button), you can start implementing the logic. In the final version, though, there are more elements to make it a bit easier on the eyes. Here is a screenshot of the final result:

![App screenshot](/assets/images/trafficLightSimulator/app-screenshot.png#postImageSmall)

This was by far the most difficult part for me to do. I am really not good at CSS and interacting with the browser is always a nightmare for me. Exactly the point of the exercise.

# HTML

The HTMl is extremely easy since the heavy lifting is done by CSS:

```javascript
<div class="traffic-light-container">
  <div class="vehicle-light">
    <div class="light red"></div>
    <div class="light yellow"></div>
    <div class="light green"></div>
  </div>    
  <div class="pedestrian-light-container">
    <div class="pedestrian-light">
      <div class="stop-light"><i class="fa-solid fa-person"></i></div>
      <div class="walk-light"><i class="fa-solid fa-person-walking"></i></div>
    </div>
    <div class="pedestrian-pole"></div>
    <div class="pedestrian-buttons">
      <button id="stopButton"></button>
      <button id="stopRequestButton"></button>
    </div>
    <div class="pedestrian-pole"></div>
  </div>
</div>
```

You will notice that there are two buttons there: "stopButton" and "stopRequestButton," rendered in the exact same place. That means that only one is visible at a time, and when to show one or the other is governed by JavaScript.

# Javascript

First off, the effect of "switching on and off" the lights is a change in the opacity of the light, being 100% opacity when on and 10% opacity when off. I achieve this with the following additional styles:

```javascript
.red.on {
  background-color: rgba(255, 0, 0, 1);
}

.red.off {
  background-color: rgba(255, 0, 0, 0.1);
}

.walk-light.on {
  opacity: 1;
}
.walk-light.off {
  opacity: 0.2;
}
```

Same thing for the rest of the lights. Now with Javascript, implementing the corresponding logic, I can add the style "on" or "off" as needed. Like this:

```javascript
function switchLight(light) {
    light.classList.toggle('on');
    light.classList.toggle('off');
}
```

As a resource, I need a way for the system to "wait". For example, if I want the green light for pedestrians to remain green for ten seconds, I need a way to compute those ten seconds in JavaScript. I came up with this solution:

```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

So at any point of my stop sequence I can do something like this:

```javascript
await delay(1500); // Stop for 1.5 seconds
```

Now for implementing the **stop traffic sequence**, first of all I need to stablish the initial state of the system (remember: vehicles green, pedestrians red):

```javascript
function setInitialState() {
  vehicleRed.classList.add('off');
  vehicleYellow.classList.add('off');
  vehicleGreen.classList.add('on');
  stopLight.classList.add('on');
  walkLight.classList.add('off');

  let vehiclesGracePeriodActive = false;
  let userClickedDuringSequence = false;

  document.getElementById('stopRequestButton').style.display = 'none';
}
```

This code resets the lights to their initial state, establishes a couple of global variables, and hides the button "stopRequestButton". The regular button to stop the traffic is named "stopButton," so what is this "stopRequestButton"? This is the button that will appear **during** the grace period for vehicles, and its purpose is to set the variable "userClickedDuringSequence" to true. This means that some pedestrian wants the traffic to stop again. This variable can later be used to restart the vehicle stop sequence right away when the vehicle grace period is ended. Then, I hide the "stopRequestButton" again and show the normal one.

This is the only trick and the only way I whought of how to do this. We need the button to do three things:

- Start the sequence
- Do nothing during the sequence (being disabled)
- Set a variable during the vehicle grace period

The "stopButton" does the first two and the "stopRequestButton" does the third one.

This is the main function that implements the "Stop traffic sequence":

```javascript
async function stopTrafficSequence() {
  // Hide the stop button
  document.getElementById('stopButton').disabled = true;
  
  // Vehicles lights sequence
  switchLight(vehicleYellow);
  switchLight(vehicleGreen);

  await delay(3000); // Stop for 3 seconds

  switchLight(vehicleYellow);
  switchLight(vehicleRed);

  await delay(1500); // Stop for 1.5 seconds

  // Pedestrians lights sequence
  switchLight(stopLight);
  switchLight(walkLight);
  
  await countdown('Pedestrians grace period: ', 'pedestriansGracePeriod', 5); // Stop for 5 seconds

  document.getElementById('stopButton').disabled = false;
  toggleElementVisibility('stopButton', false);
  toggleElementVisibility('stopRequestButton', true);
  
  // Blinking walk light
  for (let i = 0; i < 8; i++) {
    switchLight(walkLight);
    await delay(250); // half second
  }

  switchLight(walkLight);
  switchLight(stopLight);
    
  await delay(1500); // Stop for 1.5 seconds

  switchLight(vehicleGreen);
  switchLight(vehicleRed);

  await delay(2000); // 2 seconds

  await countdown('Vehicles grace period: ', 'vehiclesGracePeriod', 10); // Stop for 10 seconds
  if (userClickedDuringSequence === true) {
    userClickedDuringSequence = false;
    updateStopRequestedText(false);

    // Show the stop button after the sequence is finished
    toggleElementVisibility('stopButton', true);
    toggleElementVisibility('stopRequestButton', false);

    document.getElementById('stopButton').click();
  } else {
    // Show the stop button after the sequence is finished
    toggleElementVisibility('stopButton', true);
    toggleElementVisibility('stopRequestButton', false);
  }
}
```

Not my best code, but it seems to do the trick. Now, there is something extra there; you may have noticed the function "countdown," which is like the delay function but enhanced:

```javascript
async function countdown(prefix, name, seconds) {
    let remainingTime = seconds;

    while (remainingTime > 0) {
        document.getElementById(name).textContent =  prefix + remainingTime + ' seconds.';

        await delay(1000);
        remainingTime -= 1;
    }

    // Reset the HTML element after the countdown is finished
    document.getElementById(name).textContent = prefix + ' 0 seconds.';
}
```

What it does is render the seconds countdown in some HTML element. This is useful to visualize the grace periods so you are not staring at the light hoping that something will happen. This way, you can see that something is actually happening.

# Results

Here is the source code: <a href="https://github.com/joantolos/traffic-lights" target="_blank">GitHub Repository.</a> Pull requests are welcome!

Since everything is in a single HTML file, I was looking for a free place to host the file and discovered **<a href="https://pages.github.com/" target="_blank">GitHub Pages</a>**, which works perfectly. You can try it out here: <a href="https://joantolos.github.io/traffic-lights/" target="_blank">Traffic Lights Simulator</a>

I really enjoy doing these exercises, and I've come up with quite a few of them. For example:

1. Implementing a vending machine (prices, stock, change, inventory...)
2. Implementing a double elevator in a hospital (search algorithm to decide which floor to stop)
3. Implementing a slot machine algorithm (determining when to allow wins)

You can delve as deep as you want with these exercises, and since they are based on real-life scenarios, it's truly engaging to play with them. I encourage you to start coding!

## References:

* _Photo <a href="https://www.dreamstime.com/traffic-lights-over-urban-intersection-image124846652" target="_blank">124846652</a> © <a href="https://www.dreamstime.com/monticelllo_info" target="_blank">Monticelllo</a> | <a href="https://www.dreamstime.com/photos-images/traffic-lights.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://pages.github.com/" target="_blank">GitHub Pages</a>_
* _<a href="https://joantolos.github.io/traffic-lights/" target="_blank">Traffic Lights Simulator</a>_