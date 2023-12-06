I have been working with Javascript for a while (TypeScript actually) and one of the features that I found interesting is the way you can deal with JSON with javascript. Create, modify and manipulate a JSON object with javascript is very easy and intuitive. It actually allows you to do whatever you want, so you may break the JSON if you are not careful.

Trying to do this kind of manipulations with Java is possible, but does not come out of the box and some libraries will be needed. Even then, the amount of freedom is never going to be equal to Javascript but enough to work comfortably.

I am going to describe and provide a simple solution, so you can start dealing with JSON in Java without spending too much time setting it up.

# POJO to JSON and vice-versa: Meet Jackson

Jackson is a suite of data-processing tools for Java (and the JVM platform), including the flagship streaming JSON parser / generator library, matching data-binding library (POJOs to and from JSON) and additional data format modules to process encoded data.

The dependencies (in Gradle) are as follows:

```javascript
implementation 'com.fasterxml.jackson.core:jackson-core:2.11.2'
implementation 'com.fasterxml.jackson.core:jackson-databind:2.11.2'
```

For the example, I am going to use Jackson for parse a simple object in Java and vice-versa. You can find the code **<a href="https://github.com/joantolos/json-parser" alt="example code" target="_blank">example code</a>** but basically, the transformation is made in just a couple of one liner:

```javascript
public String stringify(Object o) throws JsonProcessingException {
    return this.mapper.writeValueAsString(o);
}
```

And:

```javascript
public Object parse(String json, Class c) throws JsonProcessingException {
    return this.mapper.readValue(json, c);
}
```

Being:

```javascript
ObjectMapper mapper = new ObjectMapper();
```

This two simple methods will do the trick, you can check the tests for examples. Jackson is a very well-known, _almost standard_ library for dealing with JSON in Java, so you can't go wrong with it. Provides a lot of functionality and has enough community to be able to solve any problem you may face.

# Beware the circular structures!

Circular structure error occurs when you have a property of the object which is the object itself directly _(a -> a)_ or indirectly _(a -> b -> a)_. This kind of structure can not be parsed into a single JSON as you can imagine. If you try to run the code above with a class containing a circular structure, Jackson will raise the exception:

    Infinite recursion (StackOverflowError) through reference chain

On the **<a href="https://github.com/joantolos/json-parser" alt="example code" target="_blank">example code</a>** there is a dedicated test for that scenario:

```javascript
@Test(expected = JsonMappingException.class)
public void shouldRaiseExceptionTryingToSerializeClassWithCircularStructure()
```

You need to avoid this circular references but if you stumble upon it, it usually means that the object you are trying to parse is not really meant to be represented as a JSON, like a http response or something like that. Or, that you did something horribly wrong.

If you really, REALLY can't avoid the circular structure, you can use the annotations the Jackson provides:

* @JsonManagedReference is the forward part of reference (the one that gets serialised normally).
* @JsonBackReference is the back part of reference (it will be omitted from serialisation).

# Privacy is good... or is it?

Another common error that you may have, is referenced to modifiers. Jackson will only work with fields that are either public or have public getter methods. If you try to serialise a class where everything is private you will face the error:

    InvalidDefinitionException: No serializer found for class com.joantolos.json.parser.JsonParserTest$AllPrivate and no properties discovered to create BeanSerializer (to avoid exception, disable SerializationFeature.FAIL_ON_EMPTY_BEANS)

This is also tested on the example, on the test:

```javascript
@Test(expected = InvalidDefinitionException.class)
public void shouldRaiseExceptionTryingToSerializeClassWithNoPublicPropertiesOrConstructor() throws JsonProcessingException {
    jsonParser.stringify(new AllPrivate());
}
```

The obvious solution is to create the proper getters, but if you cannot access the class for some reason, Jackson will provide a visibility modifier. On the **<a href="https://github.com/joantolos/json-parser" alt="example code" target="_blank">example code</a>**, it is implemented on the method:

```javascript
public void ignoreVisibility() {
    this.mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
}
```

It is also tested:

```javascript
@Test
public void shouldSerializeClassWithNoPublicPropertiesOrConstructorWhenIgnoringVisibility() throws JsonProcessingException {
    jsonParser.ignoreVisibility();
    Assert.assertNotNull(jsonParser.stringify(new AllPrivate()));
}
```

# JSON manipulation, different flavour: Gson

Gson is another API to manipulate and work with JSON in Java. Is made by Google, and it is more modern as far as I understand. To do the same functionality explained before (serialise and deserialize) is more or less the same thing but using the proper Gson dependency. On the **<a href="https://github.com/joantolos/json-parser" alt="example code" target="_blank">example code</a>** we have an implementation of the same methods but in Gson:

```javascript
public String stringify(Object o){
    return gson.toJson( o );
}

public Object parse(String json, Class c){
    return gson.fromJson( json, c );
}
```

So to do this basic operation there is no really a big difference between them. I wanted to mention Gson because I find it very useful for dealing with a Json Object, once it is an object. That means, serialise something and then manipulate it. Like we are used to do on Javascript: add elements on an array, change the layout of the object, merge different objects, etc...

If you need to do that kind of treatment, I personally found Gson way better than Jackson.

# Take away

Gson is very easy to use and will cover all your basic needs for JSON manipulation. On a brand-new project I would go for it.

The advantage of Jackson is that it comes by default on popular frameworks like Spring and also, it offers a lot of annotations that you may find useful. It may be more documentation with Jackson just because it is older.

In any case, you can live with both of them in your project, again, on the **<a href="https://github.com/joantolos/json-parser" alt="example code" target="_blank">example code</a>** are living together.

## References:

* _Photo <a href="https://www.dreamstime.com/detail-screen-javascript-code-specifically-json-object-detail-screen-javascript-code-specifically-json-object-image221720243" target="_blank">221720243</a> © <a href="https://www.dreamstime.com/filipalbert7_info" target="_blank">Filip Albert</a> | <a href="https://www.dreamstime.com/photos-images/json.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://github.com/FasterXML/jackson" alt="Jackson Project Home" target="_blank">Jackson Project Home</a>_
* _<a href="https://github.com/google/gson" alt="Gson Project Home" target="_blank">Gson Project Home</a>_
* _<a href="https://github.com/joantolos/json-parser" alt="GitHub examples code" target="_blank">GitHub examples code</a>_
* _<a href="https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion" alt="Jackson – Bidirectional Relationships" target="_blank">Jackson – Bidirectional Relationships</a>_
* _<a href="https://www.baeldung.com/jackson-jsonmappingexception" alt="Jackson – JsonMappingException (No serializer found for class)" target="_blank">Jackson – JsonMappingException (No serializer found for class)</a>_
