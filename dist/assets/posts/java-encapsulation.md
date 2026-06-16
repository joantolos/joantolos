Encapsulation is so common and well known that sometimes I feel there are some basic misconceptions that may confuse a little. It is one of the fundamental object oriented programming concepts but sometimes can be interpreted wrong. Let's start with the basics.

# What is encapsulation

Encapsulation is a mechanism of wrapping the data (variables) and code acting on the data (methods) together as a single unit. In encapsulation, the variables of a class will be hidden from other classes, and can be accessed only through the methods of their current class. Therefore, it is also known as data hiding.

To achieve encapsulation in Java:

1. Declare the variables of a class as private.
2. Provide public setter and getter methods to modify and view the variables values.

# Example: Public cat

This is an example of public fields, with no encapsulation whatsoever:

```javascript
public class CatPublic {
    public String name;
    public Integer age;
}
```    

So, you can access and modify the fields freely like this:

```javascript
@Test
public void catPublicTest() {
    CatPublic catPublic = new CatPublic();
    catPublic.name = "Gardfield";
    catPublic.age = 10;

    Assert.assertEquals("Gardfield", catPublic.name);
    Assert.assertEquals(10, catPublic.age);
}
```    

# Example: Encapsulated cat

This is an example of encapsulated fields:

```javascript
public class CatEncapsulated {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```    

So, you can access and modify the fields using the methods, like this:

```javascript
@Test
public void catEncapsulatedTest() {
    CatEncapsulated catEncapsulated = new CatEncapsulated();
    catEncapsulated.setName("Gardfield");
    catEncapsulated.setAge(10);

    Assert.assertEquals("Gardfield", catEncapsulated.getName());
    Assert.assertEquals(10, catEncapsulated.getAge());
}
```    

# What is the difference then?

Why use setters and getters if I can access and modify the data anyway? Why don't make the properties public? There are some obvious advantages:

1. Getters and setter can have validation in them, fields can't
2. Using getter you can get subclass of wanted class.
3. Getters and setters are polymorphic, fields aren't.
4. Debugging can be much simpler, because breakpoint can be placed inside one method not near many references of that given field.
5. They can hide implementation changes. You can change the field name for example, and not affect the rest of the code.

But, and this is a big but, regarding **accessibility** and **mutability**, it is the same thing at the end of the day. So, from a strictly practical point of view, you can modify a private field.

If what we want to achieve is immutability, in order to write functional code, we may want to explore other alternatives.

# Example: Private cat

This is another example of encapsulation, that allows immutability:

```javascript
public class CatPrivate {
    private final String name;
    private final int age;

    public CatPrivate(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

}
```    

As you can see, we can only set the values on object creation, and then access them as much as we want. But the fields are **final** which means that can not be modified. That makes this class immutable:

```javascript
@Test
public void catPrivateTest() {
    CatPrivate catPrivate = new CatPrivate("Gardfield", 10);

    Assert.assertEquals("Gardfield", catPrivate.getName());
    Assert.assertEquals(10, catPrivate.getAge());
}
```    

Is there a better way to represent this data structure? Enter **records**

# Example: Cat record

This is the same structure but transformed to a Java record.

```javascript
public record CatRecord(String name, int age) {

}
```    

Java records were introduced in Java 14 and have been part of other popular languages for a long time in some way or another. Java finally got the message, and put them as part of the language. The advantages are huge, this is how we can use it, following the other examples:

```javascript
@Test
public void catRecordTest() {
    CatRecord catPrivate = new CatRecord("Gardfield", 10);

    Assert.assertEquals("Gardfield", catPrivate.name());
    Assert.assertEquals(10, catPrivate.age());
}
```    

Look that the way to use is almost equals to the private version but the syntax for the record is extremely simple.

# Record on steroids

There is a little trick that you can do with records. You can put several of them together in an interface, like this:

```javascript
public interface Animals {

    record Cat(String name, int age) {

    }

    record Dog(String name, int age) {

    }
}
```    

And then you can access each one of them, like this:

```javascript
@Test
public void animalsTest() {
    Animals.Cat cat = new Animals.Cat("Gardfield", 10);
    Assert.assertEquals("Gardfield", cat.name());
    Assert.assertEquals(10, cat.age());

    Animals.Dog dog = new Animals.Dog("Snoopy", 15);
    Assert.assertEquals("Snoopy", dog.name());
    Assert.assertEquals(15, dog.age());
}
```    

That way you can compile several entities on the same interface and makes the code much simpler and easy to read.

# Take away

Choose your types wisely. This new record type offers a bunch of benefits. Be aware of accessibility and mutability of your data. I personally prefer to work with immutable data because is less prone to errors and it's easier to debug.

## References:

* _Photo <a href="https://www.dreamstime.com/stock-photo-lock-key-search-unlock-lock-lock-key-search-unlock-lock-image99198372" target="_blank">99198372</a> © <a href="https://www.dreamstime.com/rawpixelimages_info" target="_blank">Rawpixelimages</a> | <a href="https://www.dreamstime.com/photos-images/key.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://www.tutorialspoint.com/java/java_encapsulation.htm" alt="Java encapsulation" target="_blank">Java encapsulation</a>_
* _<a href="https://stackoverflow.com/questions/1568091/why-use-getters-and-setters-accessors" alt="Why use getters and setters/accessors?" target="_blank">Why use getters and setters/accessors?</a>_
* _<a href="https://docs.oracle.com/en/java/javase/14/language/records.html" alt="Oracle: Java records" target="_blank">Oracle: Java records</a>_
