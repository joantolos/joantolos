Since I made the <a href="https://www.joantolos.com/blog/big_o_notation" target="_blank" alt="Big O Notation article">post about Big O Notation</a>, I have been exploring that knowledge using regular simple algorithms like calculating the size of an array and common stuff like that. Just adding a new dimension to the way I think about the problems and also re-thinking the good-old ways of doing stuff.

I use operations implemented on the programming language like accessing an element of an array and now and then I think about how those operations are actually implemented, and what their complexity in terms of Big O could be. I believe is a nice exercise to do from time to time.

I recently discovered this website where you can find several code challenges, submit your proposal and most important, they respond with how your solution performs against other submissions. The site is https://leetcode.com

I want to solve one of those problems and explain two different solutions, one of them performing better than the other and think about them in terms of Big O Notation.

This is the problem description as it is on the site:

# Two sum problem

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Output: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

    Input: nums = [3,2,4], target = 6
    Output: [1,2]

Example 3:

    Input: nums = [3,3], target = 6
    Output: [0,1]

Constraints:

- 2 <= nums.length <= 104
- -109 <= nums <= 109
- -109 <= target <= 109

Only one valid answer exists.

# The naive approach or the brute force approach

This would be my first try. Always.

Since I work with TDD, I feel very comfortable writing code that it is far from its final version. So, I establish all my tests cases and almost always go with the "brute force" approach to make my tests pass.

If we think of the problem of these terms, we end up with a couple loops. The highest order one, is taking the first element of the array and try the sum with the next one until the end, that is the second loop. And so on until we find the solution.

This is the code in Java:

```javascript
public int[] exponentialAlgorithm(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++){
        for (int j = 0; j < nums.length; j++){
            if (i != j && (nums[i] + nums[j] == target)) {
                return new int[]{i, j};
            }
        }
    }

    return null;
}
```

The only mystery is the if condition: the sum of the two elements must be the target and also, they must be different elements of the array, of course.

This algorithm has a complexity of O(n<sup>2</sup>) because of the two loops. This has a very bad performance, <a href="https://www.joantolos.com/blog/big_o_notation" target="_blank" alt="Big O Notation article">as we know</a>, since the number of operations will rapidly increase as the size of the array grows to infinity.

The beauty of Leet Code is that when you submit your answer, it responds with a series of nice statistics about your solution. For this case:

![Exponential performance one](/assets/images/bigONotationExample/exponential1.png#postImageMedium)

![Exponential performance two](/assets/images/bigONotationExample/exponential2.png#postImageBig)

On this last graph you can see that most of the solutions submitted perform a lot better that this one. Thanks to Big O Notation we can understand better why. Algorithms that run on exponential time are not good ones.

# The refined approach

If we want to avoid the exponent, we need to start thinking in ways to solve this looping through the array just **one time**. Meaning, just one loop. In order to do that, you have to have a "bag of tricks" that you will collect while you solve this kind of exercises. In my case, when I need to use one loop instead of two, the kind of things that work are...

- Try to divide the array into smaller ones
- Think about a solution involving recursion
- Try to use an extra data structure to store intermediate results

For this case, the last trick will do the idem. We use a map storing the already "visited" numbers of the array for each loop iteration. Then we calculate the subtraction of the target and the current one (since <a href="https://en.wikipedia.org/wiki/Commutative_property" target="_blank" alt="commutative property">commutative property</a>). If the subtraction is already on the map of "visited", we have our solution, if not, we just add it.

This is the new solution, again, in Java:

```javascript
public int[] linealAlgorithm(int[] nums, int target) {
    Map<Integer, Integer> lookedUpNums = new HashMap<>();
    for (int i = 0; i < nums.length; i++){
        int subtracted = target - nums[i];
        if (lookedUpNums.containsKey(subtracted)) {
            return new int[] { lookedUpNums.get(subtracted), i };
        } else {
            lookedUpNums.put(nums[i], i);
        }
    }
    return null;
}
```    

Pretty clever right? This is the performance of this new algorithm according to Leet Code:

![Lineal performance one](/assets/images/bigONotationExample/lineal1.png#postImageMedium)

![Lineal performance two](/assets/images/bigONotationExample/lineal2.png#postImageBig)

See how it goes from 100 ms to 1 ms and the runtime distribution it way better than the last one.

# Take over

This is fun, isn't it? I am going to continue trying new Leet Code exercises in order to improve myself. It is very challenging for me to think of a problem in a different way **once it is already solved**. So, this little game is useful to me, personally.

Let's take into account Big O Notation more and extract intelligence from it.

## References:
* _Photo by <a href="https://unsplash.com/@barkiple?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" alt="John Barkiple">John Barkiple</a> on <a href="https://unsplash.com/s/photos/complexity?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank" alt="Unsplash">Unsplash</a>_
* _<a href="https://leetcode.com/problems/two-sum" target="_blank" alt="LeetCode">LeetCode</a>_
* _<a href="https://en.wikipedia.org/wiki/Commutative_property" target="_blank" alt="Commutative property">Commutative property</a>_
