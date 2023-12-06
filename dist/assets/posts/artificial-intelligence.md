I have done an introduction to Artificial Intelligence (AI) course and I want to share my learning experience. This post covers my notes and summaries of the content of the course.

# History

On the early sixties, there was a gathering between several investigators interested on artificial intelligence, neural networks and automats theory as a consequence of the first works made on the field.

The following years there was a lot of progress on the field and several programs were design to solve numerous problems:

* Geometric problems
* Algebraic problems
* _Checkers_ players
* LISP programming language was invented

These programs were successful on limited domains, known as _micro-worlds_, but failed on the adaptation to real environments because of the following three factors:

1. Lack of knowledge on the application domain consistent only on a few syntactic manipulations.
2. Most of the problem had **<a href="https://en.wikipedia.org/wiki/NP_(complexity)" target="_blank">NP complexity class.</a>** With low input knowledge, the problems could be solved, but with bigger input data, they were unsolvable.
3. The basic structures used to generate an intelligent conduct, had big limitations. The neuronal network couldn't learn the XOR function.

The problem resolution was based on a general purpose search engine with high cost. To lower that cost, the first search algorithms were developed, like **<a href="https://en.wikipedia.org/wiki/Heuristic_(computer_science)" target="_blank">Heuristic Search</a>** and **<a href="https://en.wikipedia.org/wiki/Alpha–beta_pruning" target="_blank">Alpha Beta Search.</a>** Some kind of logic was starting to be developed to represent the knowledge domain of the application.

Other works were focused on add some kind of learning process to the applications:

* <a href="https://en.wikipedia.org/wiki/ID3_algorithm" target="_blank">The ID3 decision tree was created</a>
* <a href="https://en.wikipedia.org/wiki/Version_space_learning" target="_blank">Version space learning</a>
* <a href="https://en.wikipedia.org/wiki/Backpropagation" target="_blank">Backpropagation</a>

Concepts like _uncertainty_ and _non precision_ started to be taken into account. With all those development, at the eighties, the first commercial systems where launched.

# Definitions and points of view

There is not a single definition of AI but a lot of them according different points of view. We are going to consider AI as a computer science field and how the different programs and applications define it.

The goals of the different programs will lead to different definitions:

* The goal of the program can be obtaining a specific **conduct** or to obtain a specific **reasoning**. This **conduct/reasoning** pair makes the _first dimension_.
* On the other hand, it is required that the programs are **correct**. You can measure this correction comparing the performance with the performance on actual people or compared against an ideal concept of intelligence. This ideal is named _**rationality.**_ The way we measure the correction is the _second dimension_.

Using these two dimensions, there are four possible visions for the goals and so, four possible definitions:

1. **Act like people: The Turing test.** This definition is based on the proposal by **<a href="https://en.wikipedia.org/wiki/Turing_test" target="_blank">Alan Turing</a>** defining intelligence as an operational way: A conduct is intelligence when has enough level to confuse a human interlocutor.
1. **Reason like people: The cognitive model.** In this definition, not only the result is important but also how it is obtained. The goal is for the process to be similar to the one made by humans. **<a href="https://en.wikipedia.org/wiki/General_Problem_Solver" target="_blank">The General Problem Solver.</a>**
1. **Reason rationally: The thoughts laws.** This point of view is based on considering what it means to think correctly or, what is equivalent, know when a new fact can be deduced logically from the knowledge of what is available.
1. **Act rationally: The rational agent.** What it is important is to reach the correct conclusions, not if the conclusions were obtained using logic deductions.

Considering the follow hypothesis:

* <a href="https://en.wikipedia.org/wiki/Physical_symbol_system" target="_blank">The physical symbol system hypothesis</a>
* <a href="https://en.wikipedia.org/wiki/Heuristic_(computer_science)#Newell_and_Simon:_heuristic_search_hypothesis" target="_blank">Heuristic search hypothesis</a>

We can achieve _intelligent activity_ with the use of:

* **Symbols:** The meaningful elements of a system.
* **Operations:** Operations between the symbols allowing us to generate solutions.
* **Search:** To select a solution from the possible ones generated from the operations.

This hypothesis explains the two most important elements on the development of AI applications:

1. Define the symbolic structures and operations to solve problems.
2. Define search strategies to find the potential solutions generated by these structures and operations.

## Three alternatives

This definition is challenged by other authors and other systems had been build following different hypothesis. These are based on different hypothesis:

1. **Biologic models based systems:**

   This alternative is based on _neuronal networks_. These networks represent the world thought the weight associated to each connection (or neuron), no symbols required.

1. **Emergent systems:**

   The solution to a problem is not obtained from a single individual system but emerges from the activities of independent agents (and relatively simple though usually specialists).

1. **Situated action theory:**

   The theories of the action argue that intelligence should not be seen as a process of building and evaluating models of the world, but rather as a less structured process of acting in the world and responding to results obtained. Therefore, more importance is given to the ability to act than when explaining these actions.

## Some applications

* **<a href="https://en.wikipedia.org/wiki/Logic_TheoristLogic" target="_blank">Theorist (Newell, Shaw, Simon, 1957):</a>** An automatic theorem prover.

* **<a href="https://en.wikipedia.org/wiki/Mycin" target="_blank">Mycin (Shortliffe i Buchanan, 1975):</a>** Designed to help on the recommendations of therapies fitted for a patients with bacterial infections.

* **<a href="https://en.wikipedia.org/wiki/Automated_Mathematician" target="_blank">AM (Lenat, 1977):</a>** Experimental program to build theories on the mathematics field. From a group of arithmetic concepts, the software builds new concepts.

* **Prospector (Duda, 1979):** Helps locate minerals like copper and uranium. It was a huge success at the eighties when it recommended the excavation on a place where a large deposit of <a href="https://en.wikipedia.org/wiki/Molybdenum" target="_blank">molybdenum</a> was found.

* **<a href="https://en.wikipedia.org/wiki/William_McCune" target="_blank">EQP (McCune, 1997):</a>** The EQP system proved the robbing problem. It is a well known problem on boolean algebraic unsolved until then.

* **<a href="https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)" target="_blank">Deep Blue (IBM, 1997):</a>** The first computer that won a human on chess. It won the world champion G. Kasparov. The program has knowledge of the domain included on the function used to evaluate the different games. Also, it included a large database with final-game data that allowed it to play a perfect game once achieved that stage.

# Characteristics

There are a lot of intelligent systems applied to several environments but there are some commons elements on all of them:

1. **Use of symbolic information:** The information to process is _symbolic_. They have to reason about facts, abstract concepts and obtain conclusions.
1. **Use of domain description:** In order to find a solution, the systems have to know the problem environment.
1. **Use of incomplete, inaccurate or conflict data:** There is some level of uncertainty with the data to be processed.
1. **Use heuristic methods:** On the AI applications, we implement how to find the solution instead of a list of steps to follow. The heuristic methods, help to do that but don't grant success. Most of the time, there isn't a better solution, but they can found a good one enough to keep going.
1. **Are adaptive:** When the environment changes, the system has to be able to change its behaviour.

# Problem-solving and search

We have established that intelligent activity is reached thought the use of **symbols** to represent the problem domain, **operations** over these patterns and **search** to select a solution from the possibilities.

At that point, we can see how to **formulate a problem** defining the _state space_.

# State space and problem representation

We have to create a model of the problem. This process will usually follow the steps:

1. Environment modeling
   We define an **STATE** as the world representation in a specific state.
   We have to deduce on our system...
* What is a state?
* What are the possible states?
* How do we represent a state?
2. Actions modeling
   We call **ACTIONS** as the way to move from a state to another and the **BRANCHING FACTOR** as the number of actions that can be applied on a specific state.
   Then we can define the **STATE SPACE** which is the group of possible states and the group of actions.

Here an STATE SPACE representation for the linear jigsaw puzzle problem:

![Module layout](/assets/images/artificialIntelligence/stateSpace.png#postImageBig)

3. Problem definition
   We can define the problem as the **initial state** and the **goal function**.

# Building a solution

We define the **solution** as the road through the _space state_ graph where, given an _initial state_, it will satisfy the _goal function._

The search algorithm chooses a node and consider the possible actions that can be applied. Each one of these actions creates a new steps group. This made the representation of the data structure as a tree, a searching tree.

![Tree layout](/assets/images/artificialIntelligence/tree.png#postImageSmall)

For the implementation we need the _data structure_ for the tree and the _functions_ for build and operate with the tree, that will define the following steps:

1. **Node Representation**

   A node will contain:
* id
* parent id
* how is generated
* state
* additional info
1. **Data Structure**
* Already expanded nodes (List)
* Nodes to expand (Queue with priority)
  * Apply selection operation
  * Add nodes to the structure
1. **Algorithm**
   ![Tree layout](/assets/images/artificialIntelligence/algorithm.png#postImageSmall)

# Not informed search strategies

The search strategy is defined by the following questions:

* Which node we have to expand?
* How to sort the not-expanded nodes?

1. **Amplitude search**
   ![Amplitude search](/assets/images/artificialIntelligence/amplitudeSearch.png#postImageBig)
1. **Deep search**
   ![Deep search](/assets/images/artificialIntelligence/deepSearch.png#postImageBig)
1. **Uniform Cost search**
   The uniform cost search introduces the concept of the _cost_ of its path from the initial state. We call that _g(h)_. This search is complete and optimal when that cost function is always positive.

We can consider the uniform cost search as a **generalisation of the amplitude search** when the cost of all operators are the same.

# Heuristic searches

In general, we can not know how close is a state from the solution. We will use a function that give us an _estimation_ from the node to the solution. That is called **heuristic function**.

A heuristic function is a function that applied to a node, estimates the cost of the best path between that node and a solution node. This function are represented as _h(n)_

1. **Avid Search**
   The uniform cost search consider the cost only from the initial state. It does not take into consideration that the next node has to lead to a solution. Using a heuristic function _h(n)_ as a criterion to order the nodes on the ready to expand list, defines the avid search.
1. **A* Algorithm**
   The **avid search** uses a heuristic function to estimate the node that correspond to the minimum cost from a node to the goal node. That choosing thought, makes the search not optimal nor complete. On the other hand, the **uniform cost search** minimises the cost of the path to origin node to current node.

The two algorithms are complementary, we can define a function:

**_f(n) = g(n) + h(n)_**

Where:

* **g(n)** is the cost from the initial state to n
* **h(n)** is the estimation from this node to the solution

We can establish that _f(n)_ is an estimation of the cost of the path going from an initial state to another state solution going through the current node _n_

The selection of the node to expand according to this function is what it is called **algorithm A*:**

![Amplitude search](/assets/images/artificialIntelligence/algorithmA.png#postImageSmall)

The completion and optimality of the algorithm A* depends on the heuristic function. An algorithm A* is optimal and complete when the heuristic function does not over-estimate the cost to reach the goal. If the heuristic function covers that case, it is an admissible heuristic function.

This is a representation of the A* algorithm on pseudocode:

```javascript
begin
	input the start node S and the set of GOALS of goal nodes;
	OPEN <- {S}
	G[S] <- 0;
	PRED[S] <- null;
	found <- false;

	while OPEN is not empty and found is false do
		begin
			L <- the set of nodes OPEN for which F is the least;

			if L is a singleton then let X be its sole element
			else if there are any goal nodes in L
				then let X be one of them;
				else let X be any element of L;

			remove X from OPEN and put X into CLOSED;

			if X is a goal node then found <- true
				else begin
					generate the set SUCCESSORS of successors of X;
					for each Y in SUCCESSORS do
						if Y is not already on OPEN or on CLOSED then
							begin
								G[Y] <- G[X] + distance(X,Y);
								F[Y] <- G[Y] + h(Y);
								PRED[Y] <- X;
								insert Y on OPEN;
							end
						else
							begin
								Z <- PRED[Y];
								temp <- F[Y]-G[Z] - distance(Z,Y) + G[X] + distance(X,Y);
								if temp < F[Y] then
									begin
										G[Y] <- G[Y] - F[Y] + temp;
										F[Y] <- temp;
										PRED[Y] <- X;
										if Y is on CLOSED then
											insert Y on OPEN and remove Y from CLOSED;
									end;
							end;
				end;
		end;

	if found is false then output "Failure";
	else trace the pointers in the PRED fields from X back to S, "CONSing" each node onto the growing list of nodes to get the path from S to X;
end;
```    

# Knowledge systems

The knowledge system solve the problems using an intense knowledge of the application field. The knowledge base, the inference system and the user interface are the components associated.

Building that kind of system requires a big investment in time and resources, and it has to be carefully evaluated if it is worth it.

You should only build a knowledge system when:

* The usual programming techniques can not solve the problem.
* There are experts that have a good structured knowledge of the system domain.
* We don´t always have human experience on the environments where the knowledge is needed.

If there is a point to build a knowledge system, then you have to build a **model.**

A model is an abstraction used for specific goals. When we know the model goal, we can do an approximation of the phenomena we want to model. It represents a structured way to understand the entities and the processes that allows to build the solution on the real world.
The model allows has to understand better the process and also be able to predict.

## Systems based on rules

These systems are used mostly to solve problems of _classification_ and _diagnose_. There are based on **facts** and **rules**

* Facts: Knowledge about the objects of the system.
* Rules: Establish the relation between the objects.
  * Follow this format: **IF** [_premise_] **THEN** [_conclusion_] where both premise and conclusion are assertions of the facts.

Using the facts and rules, the inference system extract conclusions about the knowledge base which can be concluding new facts or assert the certainty of a fact.

**Rule system architecture**

![Rule system architecture](/assets/images/artificialIntelligence/ruleSystemArchitecture.png#postImageMedium)

* **Rules base:** First formal aspect of the representation. It contains de group of **rules**, the info of the domain.
* **Working memory:** Second formal aspect of the representation. It contains the group of **facts** which are temporary and relative to the specific problem trying to solve.
* **Interpret:** It is the inference aspect, it concludes new facts.

About the cyclic system of inference:

![Inference](/assets/images/artificialIntelligence/inference.png#postImageSmall)

* **Recovery:** Selects the rules that we can apply. The selected subgroup is named _conflict set_.
* **Refinement:** Selects a rule from the subgroup.
* **Execution:** Applies the rule.

The cycle ends once it has been proven whatever it is we are trying to prove or the conflict set is empty. So, we have a goal (a solution state) and a search problem (the group of rules). We can apply the search strategies explained before.

**Strategies for drive the search**

* Textual order
* Refractoriness
* Recency
* Specificity

**Strategies for doing the inference**

* Forward reasoning

We start from the knowledge and start applying the rules until the goal is reached. To know if we can apply a rule, we look to the _precedent_. If it is fulfilled, it is added to the work memory the rule conclusions.

* Backward reasoning

We start from the goal and select the rules that fulfill the goal.

## Systems with structured representation

The structured representation allows to _relate_ the units from which the knowledge is defined. This is accomplished modeling the interconnections between the objects of the domain. Some of this representations are:

* Frames
* Semantic networks
* Scripts

The difference between them is blurry since their structure is similar: several concepts and relations between them. Using **Frames** as an example, it can represent concepts defining the situation and domain of the problem. It can take into account the typical values, the exceptions and the incomplete or redundant information. It also allows modifications, inclusions or suppression's of their properties, creating a frame restructure.

### Formal Aspects

From the formal point of view, a frame system is a network where each node represents an object, and the arcs mean the relations that can be established between the objects. This representation structures the knowledge in a similar way than the object-oriented programming paradigm.

As so, the relation between the objects are the same of the OOP like:

* Class
* Sub Class
* Super Class
* Instance
* Inherence

![Frame example](/assets/images/artificialIntelligence/frameExample.png#postImageBig)

There to fields types: member slot and own slot. Each instance of the class has a _copy_ of the member slot and can be modified and the own slot are belong to the frame, so each instances share them. Some of the elements typically included on the fields are:

* Values of the domain
* Reference to another frame, the value indicates an object of the same system. Like on the example above, we have Maria as the owner of the frame car.
* Value restrictions
* Functions: The frame as a function associated that it is called every time there is a need of calculate the field.
* Demons: Procedures called as _secondary effect_ of a relevant action on the knowledge base.

### Inferential Aspects

When asking a frame representation, the problem normally is to know if an object satisfies some property or to know the value that an specific field associates with the object. For doing that, the frame system uses inherence to find _the field_ which is solution to the problem.

It can be a problem when there is multiple inherence (which happens most of the time). Depending of the order on which the relations are considered, the system will answer one thing or another. So, the multiple inherence is a _search problem_ because to find a result, we have to consider different alternatives and not all of them lead to a solution.

:   _In abstraction, the problem of finding the solution field is search on a graph since we find a node which satisfies the property. As so, we can use all the search strategies explained before._

The algorithms must take into account the intersections where there are several paths: before considering what is in the object associated to the intersection, the nodes in the paths that carry it must have been taken into account from the origin.

To solve that problem, we can use the <a href="https://en.wikipedia.org/wiki/Topological_sorting" target="_blank">topological sorting algorithm.</a>

## Case based Systems

The case based reasoning is formed on the idea of using previous experiences and solve new situations in a similar way that we solved the previous ones.

There is a Case Data Base storing pass experiences in form of _cases_. Each case is composed by a situation and a solution. In order to solve the new situation, you try to adapt an old solution to the new problem.
This kind of systems are suited for problems involving _design, diagnose and planning_. The definition is not made by rules or frameworks but by **operations.**

### Inferential Aspects

The inferential is composed by four steps:

* Retrieval
* Reuse
* Revision
* Retain

![Inferential Aspect Case Based](/assets/images/artificialIntelligence/inferentialAspectCaseBased.png#postImageMedium)

## Model based Systems inferential Aspects

The model based systems knowledge is based on cause/effect relations.

A model-based diagnostics system must find the set of failures most likely to explain the behaviour that is observed in the system.
To do so, it raises different alternatives and rejects those that do not match with the model and maintain those that are corroborated by the model.

## Fuzzy Logic Systems

Based on rules defined on _fuzzy groups_ terms. Considering the rule system that we know:

**IF** [_premise_] **THEN** [_conclusion_] now both premise and conclusion are fuzzy groups.

Fuzzy Groups:

* CERTAINLY YES
* POSSIBLY YES
* CANNOT SAY
* POSSIBLY NO
* CERTAINLY NO

We can think of the fuzzy groups as a _generalization_ of the regular groups, because the regular groups are boolean so a particular case of the fuzzy groups.

To represent a fuzzy models, there are several ways, being the most important one the **membership function**. Which declare for each element of the domain, which are on the group and which are not.

It is a boolean function that when applied to the elements of the domain, returns it's pertinence (or not) to the group.

A visual example of membership function representing the fuzzy group _"approximately zero"_ named **μZ**

    μZ(x)=1/(1+x2)

![Membership function](/assets/images/artificialIntelligence/membershipFunction.png#postImageBig)

The fuzzy model allow you to define concepts in which it is not easy (or it is not possible) clearly define a point where to separate between those elements that are of the concept and those that are not. Some classic examples are those related with temperature (such as cold, hot or heat) or height (high or low).

Another example. We can consider the threshold 1,79m to consider a person _tall_. The membership function to model the concept is:

![Membership function for height](/assets/images/artificialIntelligence/membershipFunctionHeight.png#postImageBig)

### Operations over fuzzy sets:

#### Negation

Considering the membership function μA(x), we can define the negation as: μnoA(x) = N(μA(x)) where N(1)=0 and N(0)=1

But this is not enough, because the membership function is not boolean. We need to define N (named outline conditions) as N: [0,1] → [0,1]

We can also consider that the negation of the negation must be the original: N(N(a))=a for all a values [0,1]

Summing up:

The negation function is N: [0,1] → [0,1] satisfying all these conditions:

1. **OUTLINE CONDITION:** N(0)=1 i N(1)=0
1. **MONOTONY:** for all a,b on [0,1], if a≤b then N(a)≥N(b)
1. **INVOLUTION:** for all a in [0,1], N(N(a))=a

Using the height example:

![Membership function for height](/assets/images/artificialIntelligence/membershipFunctionNoHeight.png#postImageBig)

#### Union

Now we have two sets each one of it with it's own membership function, so if we consider **μA** and **μB**, we want to calculate the union **μA∪B**

As we did with the negation function N in that case we are going to use the union function S which is named **t-conorm**

    μA ∪ B(x) = S(μA(x), μB(x))

μA ∪ B(x) is a membership function as well, so S is a function that due two values on the interval [0,1] returns another on the same interval, so:

The t-conorm function S: [0,1] x [0,1] → [0,1] satisfying the conditions:

1. **COMMUTATIVITY:** S(a,b) = S(b,a)
1. **ASSOCIATIVITY:** S(a,S(b,c)) = S(S(a,b),c)
1. **MONOTONY:** if a≤c and b≤d then S(a,b) ≤ S(c,d)
1. **NEUTRAL ELEMENT:** S(a,0)=a

where a, b, c and d are values on the interval [0,1]

Using the height example:

![Membership function for height](/assets/images/artificialIntelligence/membershipFunctionUnionHeight.png#postImageBig)

#### Intersection

With a similar way we can define the intersection function:  μA ∩ B(x) = T(μA(x), μB(x))

This time the T function is called **t-norm:**

T:[0,1] x [0,1] → [0,1] satisfying the conditions:

1. **COMMUTATIVITY:** T(a,b) = T(b,a)
1. **ASSOCIATIVITY:** T(a,T(b,c)) = T(T(a,b),c)
1. **MONOTONY:** if a≤c and b≤d then T(a,b) ≤ T(c,d)
1. **NEUTRAL ELEMENT:** T(a,0)=a

where a, b, c and d are values on the interval [0,1]

Again, with the height example:

![Membership function for height](/assets/images/artificialIntelligence/membershipFunctionIntersectionHeight.png#postImageBig)

### Building a fuzzy system:

Any knowledge based system, should consider the group of **rules** to cover all the domain of the system. For that, we consider the Error **(ε)** and the Error Increment **(Δε)**

We will build the rules in a way that his premise be fulfilled only in the region that corresponds to him. To
achieve this we must demand that the values of the error and of the increase of the error are in the corresponding portion of their domain. Thus, if A and B are subregions of the domain of ε i of Δε, then the rule:

    if ε is A i Δε is B then the control variable...

Following that structure, generally:

    if X1 is t1,a and X2 is t2,b and X3 is t3,c i ... i Xn is tn,z then Y is tY,o

### Linguistic variables:

A variable whose values are words or sentences in a natural or artificial language. Can be represented as:

    <X, LX, UX, SX>

* **X** -> Linguistic variable name
* **L** -> Linguistic values that variable X can have
* **U** -> Universe where the variable has values
* **S** -> Semantic function giving sense to the linguistic values

Example:

    <temperature, Ltemperature=[cold,warm,hot], Utemperature=[-50,50], Stemperature>

Where Stemperature is:

    Stemperature (cold) = μcold
    Stemperature (warm) = μwarm
    Stemperature (hot) = μhot

Being **μhot**, **μwarm** and **μcold**:

![Membership function for temperature](/assets/images/artificialIntelligence/membershipFunctionTemperature.png#postImageMedium)

![Membership function for temperature Graphic](/assets/images/artificialIntelligence/membershipFunctionTemperatureGraphic.png#postImageMedium)

### Variable selection and rules construction:

Considering what we just saw:

* Linguistic terms
* Membership Functions (with graphs)
* Rules

We have to choose the input variables and the output variables. Then for each of these variables, it's linguistic terms, the universe and the fuzzy sets.

If we have n input variables, X1,..., Xn, we build one rule for each tuple (t1,a, t2,b, t3,c, ..., tn,z) where ti,j is a linguistic term of Xi (si ti,j ∈ LXi) a rule like:

    if X1 is t1,a and X2 is t2,b and X3 is t3,c and ... and Xn is tn,z then Y is tY,o

## References:

* _Photo <a href="https://www.dreamstime.com/bulb-future-technology-brain-innovation-background-creative-idea-concept-artificial-intelligence-image132826187" target="_blank">132826187</a> © <a href="https://www.dreamstime.com/blackboard373_info" target="_blank">Blackboard373</a> | <a href="https://www.dreamstime.com/photos-images/artificial-intelligence.html" target="_blank">Dreamstime.com</a>_
* _<a href="http://estudios.uoc.edu/es/asignaturas-libres/informatica-multimedia-telecomunicacion/inteligencia-artificial/presentacion#_euocuc322detallpreus_WAR_euocentrega2portlet_INSTANCE_MSj1_detallpreus" alt="UOC - Intel·ligència artificial" target="_blank">UOC - Intel·ligència artificial</a>_
* _Vicenç Torra i Reventós. Què és la intel·ligència artificial_
* _<a href="https://www.amazon.es/Lintelligence-artificielle-Haton/dp/2130455123/ref=sr_1_1?ie=UTF8&qid=1505999369&sr=8-1&keywords=Haton+L’intelligence+Artificielle" alt="Haton, J.P.; Haton, M.C. (1993). L’intelligence Artificielle. París: Presses Universitaires de France" target="_blank">Haton, J.P.; Haton, M.C. (1993). L’intelligence Artificielle. París: Presses Universitaires de France</a>_
* _<a href="https://amzn.to/2NvDS02" alt="Luger, G.F. (1995). Computation & Intelligence. Menlo Park: MIT Press." target="_blank">Luger, G.F. (1995). Computation & Intelligence. Menlo Park: MIT Press.</a>_
* _Vicenç Torra i Reventós. Resolució de problemes i cerca_
* _<a href="https://amzn.to/2QXSZ4B" target="_blank">Russell, S.; Norvig, P. (1995). Artificial Intelligence: A modern approach. Prentice-Hall.</a>_
* _Vicenç Torra i Reventós. Sistemes basats en el coneixement_
* _<a href="https://amzn.to/3aewvDP" target="_blank">Stefik, M. (1995). Introduction to Knowledge Systems. Morgan Kauffman.</a>_
* _Vicenç Torra i Reventós. Incertesa i raonament aproximat_
* _<a href="https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_fuzzy_logic_systems.htm" target="_blank">Tutorial Point: Fuzzy Logic Systems</a>_
