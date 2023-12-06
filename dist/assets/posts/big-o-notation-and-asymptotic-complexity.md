Let's say we want to go from Paris to Amsterdam and I ask you for an algorithm to solve that problem. The problem being _I need to go from point A to point B_. You can answer... "well, you take a plane". Ok, a little more specific... "You take your car from your home to the airport, then take a plane, and when in Paris, rent a car from the airport to the hotel". That is good enough, let's say that the steps for the algorithm are:

1. Car to the airport
2. Plane
3. Car to the hotel

You have solved the problem on the most efficient way. You can go from Paris to Amsterdam by car, but it wouldn't be efficient at all. The intelligence we extract from solving this problem is: _*The plane is the fastest way of traveling*_. Which is true, of course... or is it?

Let's say now I ask you for an algorithm to go from your home to the gym. This is the same kind of problem: _I need to go from point A to point B_. I am pretty sure that your answer is not going to be: *take a plane!*

This obvious difference between these two examples is telling us that even the plane is the most efficient way to travel, it is not always the correct answer. Or put it in other words... the plane is the fastest way to travel in **absolute** terms, but it is not on **relative terms.**

We know that there are several algorithms to do the same thing and intuitively, we must assume than maybe one is better than the other. So, how do we determine which one is the best? Is there an absolute answer?

# About efficiency and complexity

What it means for an algorithm to be _efficient_ or _more efficient than others_? We can not compare times because time is a measure that is really alien to computers. Time is very useful to us humans to understand what is happening, and it is the go-to measurement when we think on terms of "speed". But when talking about software, time is really not a good measurement. We can take the same program, exactly the same code, and it will run faster or slower depending on the hardware of the machine or even depending on other software that is running on (consider the operative system). The software is the same, so we can not say that it is "slower" or "faster", software and hardware are so apart that we cannot make that comparison.

**Time is not useful when trying to measure algorithm efficiency.** We need something else.

How do we do it then? For solving that particular problem, computer science comes up with the concepts of

- Complexity analysis
- Asymptotic complexity
- Big O Notation

# Big O notation

This is the formal definition of the Big O notation:

![Formal definition of Big O notation](/assets/images/bigONotationAndAsymptoticComplexity/formalDefinitionEN.png#postImageMedium)

A function _f(x)_ runs on the order of _g(x)_ if there exists some value _x<sub>0</sub>_ and some constant _C_ for which _f(x)_ is less or equals that the constant time _g(x<sub>0</sub>)_.

On asymptotic notation, this function f(x) represents the obtained running time of an analysed algorithm. In other words, we want a function such as there exists two constants C and _x<sub>0</sub>_ where f(x) is almost C time g(x) for every x greater than zero.

That is exactly our Big O notation: **f(x) = O(g(x))**

Big O notation will help you compare two different algorithm that solve the same problem no matter what hardware or software they are running. It is a way to calculate **how fast** a program grows as the input of that program grows as well or tends to infinity.

That is a useful measurement, not time, but **how fast your execution time grows when your input gets bigger.** Big O is not going to answer with seconds or milliseconds but will help you understand how fast your algorithm is going to grow while the input gets bigger and bigger.

The best way to understand big o notation is exploring different examples. We are going to explore what it is called:

- Lineal time
- Constant time
- Exponential time
- Logarithmic time

# Example O(n) Lineal time

Consider an algorithm to find the number of characters on a string. One easy way to do it is to go through all the characters and add one to a counter. For example, for the word "dog", the algorithm will do:

    totalLength = 0;

    d -> totalLength = totalLength + 1
    o -> totalLength = totalLength + 1
    g -> totalLength = totalLength + 1

    solution = totalLength = 3;

This algorithm runs in lineal time in respect the number of characters. If the number of character of the string is named "n", we have that this algorithm runs in **O(n)**, pronounced _Big O of n_

What this notation is telling us is that the time it takes to go through the entire string is proportional to the number of characters and this will be maintained as the number of characters grows.

# Example O(1) Constant time

Still using the previous example, consider now that you have the length of the string already stored on memory in a variable. Then you don't even have to access the string to know the size.

Remember what asymptotic complexity means: How the execution time changes as long as your input grows. You just access the variable and that operation runs in constant time, of **O(1)**, pronounced _big O of one_. Because whatever it takes for the machine to access the variable it will always take the same, no matter what it is the actual size of the array, this time will remain **constant** whether the string has three character or one million.

We say that this operation or "the algorithm to access that variable" takes constant time.

# Example O(n<sup>2</sup>) Exponential time

This is one of the case where things start to get ugly. If the function inside the big O grows quickly on the Y axis, you are in trouble. Consider for example the difference between the function x and the function x<sup>2</sup>

![Formal definition of Big O notation](/assets/images/bigONotationAndAsymptoticComplexity/exponentialLineal.png#postImageMedium)

As you can see, at the very beginning there is not much of a difference, even the exponential function is better. But as the input grows, the exponential one always beat the lineal one.

If your Y axis represents the money you have on your bank account, by all means, exponential is what you want! But, in this case it represents how you algorithm grows and as you can see it grows so fast that it will be unbearable for big inputs. This example is represented O(n<sup>2</sup>) or _Big O of n squared_

Exponential time is always bad news when talking algorithms. The moment you introduce a super index to your equation, bad things are going to happen (unless your input is very, very small, but you should be **really** sure that this is going to be the case)

To explore further a case of exponential time, you can think of the {{< url-link "Bubble Sort Algorithm" "https://en.wikipedia.org/wiki/Bubble_sort" >}}. Wikipedia has a nice GIF where you can see the algorithm in action:

> Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.

![Bubble sort graphical representation](/assets/images/bigONotationAndAsymptoticComplexity/bubbleSort.gif#postImageSmall)

This is an algorithm to sort an array of numbers. It does the job of course, but it is awfully inefficient.

Algorithms that resolve on exponential times often contain loops inside of loops, sub routines with extra loops, recursion with an inside loop... you see the pattern here.

# Example O(log n) Logarithmic time

This is one of the order of magnitude that starts to be interesting when dealing with algorithmic complexity. Let's make a little tangent first to explain what it is the logarithm or commonly said the "log" operation.

In mathematics, **the logarithm is the inverse function to exponentiation.** That means the logarithm of a given number x is the exponent to which another fixed number, must be raised, to produce that number x.

For example, log<sub>2</sub>64 = 6, as 2<sup>6</sup> = 64. We can also say that, often log<sub>2</sub> (read log base two), is represented just as log. So we can simplify the statement above as:

log64 = 6, as 2<sup>6</sup> = 64

So, log64 = 6

As you can see, 64 is fairly bigger than 6 so the log functions grow slowly. That is a good sign when dealing with algorithm complexity: we want our complexity to grow slow.

An example of an algorithm that grows at logarithmic time is the binary search. I hope you know this algorithm by now but let's just do a little refresh:

> Binary search is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half, again taking the middle element to compare to the target value, and repeating this until the target value is found.

A graphical representation of the algorithm, trying to find the number 7 in an array of 17 elements:

![Binary search graphical representation](/assets/images/bigONotationAndAsymptoticComplexity/binarySearch.png#postImageMedium)

Now, this is a pretty efficient algorithm that will allow you to find an element into an array. The downside of this algorithm is that the array **must be sorted** for it to work.

If we have an algorithm that runs at O(log(n)), and the n is 64 as the example before, it will take 6 steps to finish the algorithm in the worst case scenario (that is why the big O notation is called "the upper bound"). In the best case scenario, the algorithm will take 1 step. The first step of the algorithm is check the middle element of the array, imagine that your element is just there in the middle. For that case, your algorithm will take O(1) and that is called the "lower bound".

# Another example O(log n) Logarithmic time

There are a bunch of well known algorithm that are pretty efficient and I want to add just one more example: the quick sort algorithm. Again, a nice animation from Wikipedia of this algorithm in action:

> Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

![Quick sort graphical representation](/assets/images/bigONotationAndAsymptoticComplexity/quickSort.gif#postImageSmall)

The asymptotic notation for the quick sort algorithm is, again **O(log n)**. This is a very efficient algorithm.

# What all of this means for my day to day

What you need to know is that any algorithm you use, has a big o notation associated. That notation will tell you an approximation of how efficient this algorithm is, so you need to know the different big O notations most used and match the algorithm you are using with it. Once you now that, you need to know the boundaries of your input, an approximation of the maximum size that you could have.

If you are 100% sure that your input is tiny, you can risk with not so efficient algorithm. Again: **be really sure.** But, to be on the safe side, you should always try to use the most efficient algorithm in order to save machine resources.

What it is most important is to know the usual different Big O notation available and learn them sorted from the better performance to the worst. Follow this table:

![Big O notations sorted from better to worst](/assets/images/bigONotationAndAsymptoticComplexity/bigOsSorted.png#postImageBig)

Another representation:

# Big-O complexity chart

![Big O notations sorted from better to worst](/assets/images/bigONotationAndAsymptoticComplexity/bigOsChart.png#postImageBig)

Finally, it is also very useful know the big o notation for the most common data structures and array sorting methods:

# Common Data Structure Operations

![Big O notations sorted from better to worst" type="center](/assets/images/bigONotationAndAsymptoticComplexity/dataStructure.png#postImageBig)

# Array Sorting Algorithms

![Big O notations sorted from better to worst](/assets/images/bigONotationAndAsymptoticComplexity/arraySorting.png#postImageBig)

# Do I need to calculate the Big O notation for my own algorithms?

Well, you can. But you probably won't need it.

Not to put anyone down, but if it is a brand-new algorithm that you just came up with, it is very probably that it's performance will be bad for large inputs. Nothing to feel bad about it.

Computational analysis is very, very hard and a lot of smart people have been figuring out efficient algorithms for a long time. So if you want to come up with your own search algorithm, good luck, but I would rely on the literature and look for a well known algorithm which had an exhausted analysis, and we know it's big O notation.

Having said that, do you want to play with your algorithm and came out with your big O? All right, let's play.

You can find different simple recipes to calculate Big O and try to follow them. For example:

1. Break your algorithm into individual operations
2. Calculate the Big O for each operation
3. Add up the Big O of each operation together
4. Remove the constants
5. Find the highest order term: this will be the Big O of our algorithm

At the end of the day, it all comes up to try to find the correct function that defines the specific operations of your algorithm, add them all together and take into account the one with the highest order. That is why it is important to know several examples of the most common (constant, lineal, quadratic, cubic, logarithmic, factorial, etc...) to be able to identify them in your pieces of algorithm.

You should consider memory access operation as constant time. Here it comes the mythical theoretical physicist phrase _consider a spherical cow_.

![Consider a spherical cow](/assets/images/bigONotationAndAsymptoticComplexity/cow.png#postImageSmall)

So, in terms of complexity, it takes "one cicle" to read a variable, write a variable, add two numbers... any operation that does not depend on the input or the input size. Here we have our spherical cow.

Now, having our constants figured out, we need to consider the operations that depend on the input. How do we deal with a loop, for example? Well, there is no mechanical rule to count how many times the body of the loop gets executed, you need to count it by looking at what does the code does.

The steps mentioned before are referred as "asymptotic analysis of the function". The key is to consider the highest order term of your polynomial function and keep the one that grows bigger when N approaches infinity, because that one will eclipse any other term of your equation.

That is the Big O notation of your algorithm... your pride and joy or your highway to hell.

## References:
* _Photo <a href="https://www.dreamstime.com/stock-photo-maze-energy-saving-charts-graphs-image49724399" target="_blank">49724399</a> © <a href="https://www.dreamstime.com/alphaspirit_info" target="_blank">Alphaspirit</a> | <a href="https://www.dreamstime.com/photos-images/complexity.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://www.youtube.com/watch?v=iOq5kSKqeR4" target="_blank" alt="Harvard CS50 - Asymptotic Notation">Harvard CS50 - Asymptotic Notation</a>_
* _<a href="https://www.youtube.com/watch?v=V6mKVRU1evU" target="_blank" alt="Big O Notations">Big O Notations</a>_
* _<a href="https://www.youtube.com/watch?v=ei-A_wy5Yxw&index=2&list=PL1BaGV1cIH4UhkL8a9bJGG356covJ76qN" target="_blank" alt="Big O Notation (and Omega and Theta)">Big O Notation (and Omega and Theta)</a>_
* _<a href="https://en.wikipedia.org/wiki/Bubble_sort" target="_blank" alt="Wikipedia: Bubble sort">Wikipedia: Bubble sort</a>_
* _<a href="https://en.wikipedia.org/wiki/Quicksort" target="_blank" alt="Wikipedia: Quick sort">Wikipedia: Quick sort</a>_
* _<a href="https://en.wikipedia.org/wiki/Big_O_notation" target="_blank" alt="Wikipedia: Big O notation">Wikipedia: Big O notation</a>_
* _<a href="https://stackoverflow.com/questions/3255/big-o-how-do-you-calculate-approximate-it" target="_blank" alt="Big O, how do you calculate/approximate it?">Big O, how do you calculate/approximate it?</a>_
* _<a href="https://medium.com/dataseries/how-to-calculate-time-complexity-with-big-o-notation-9afe33aa4c46" target="_blank" alt="How To Calculate Time Complexity With Big O Notation">How To Calculate Time Complexity With Big O Notation</a>_
* _<a href="https://www.bigocheatsheet.com/" target="_blank" alt="Know Thy Complexities!">Know Thy Complexities!</a>_
