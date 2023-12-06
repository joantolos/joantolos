I am working with a microservice which relays a lot on configuration. This configuration is defined on JSON files that business people can edit in order to change the service behaviour. For example, enable or disable features, define default values, etc... The service includes a mechanism that allows to update this configuration files on real time as soon as the file is updated (using the <a href="https://github.com/Netflix/archaius" target="_blank" alt="Netflix Archaius">Netflix Archaius</a>)

The business people can mess around with the behaviour of the service just editing JSON files.
The new feature that I want to add is the presence or not of specific fields on these JSON files. So, the service will have a local configuration located on the resources' folder. It will load this configuration first and then override all the occurrences with the remote JSON files (which are located on a different repository).

If business people don't want or have the need to modify anything, the service will work with its own local configuration. But, if business decides to define a specific behaviour, it doesn't need to create or define the whole JSON file but only the part that it wants to override. That makes it suitable for properties environment dependent. For example:

![JSON config example](/assets/images/mergingTwoObjectsInJava/localRemote.png#postImageBig)

Lets imaging an e-commerce situation where you can enable or disable the wish list feature, disable/enable the shopping cart and define the maxim number of items. Also, enable or disable the authentication. This is an example just to illustrate the point. What we expect then, is to override the values "maxItems" and "auth" from the local file with their equivalent on the remote one.

So, the expected final configuration of the service should be:

![JSON config example](/assets/images/mergingTwoObjectsInJava/final.png#postImageBig)

And that is the feature. My first approach is to map the local JSON into an object, then map the remote JSON obtaining a second object and merge the two following the rules:

* All present values on the remote object must prevail over the local one.
* The values null on the remote object must be filled with the value of the local one if present.

The result is a third object merged with the rules above. All right, cue to **Java Reflection.**

# Let's talk about reflection

Reflection is an API which is used to examine or modify the behaviour of methods, classes, interfaces at runtime.

The required classes for reflection are provided under java.lang.reflect package.
Reflection gives us information about the class to which an object belongs and also the methods of that class which can be executed by using the object.
Through reflection, we can invoke methods at runtime irrespective of the access specifier used with them.

## Advantages of Using Reflection:

* **Extensibility Features:** An application may make use of external, user-defined classes by creating instances of extensibility objects using their fully-qualified names.
* **Debugging and testing tools:** Debuggers use the property of reflection to examine private members on classes.

## Drawbacks:

* **Performance Overhead:** Reflective operations have slower performance than their non-reflective counterparts, and should be avoided in sections of code which are called frequently in performance-sensitive applications.
* **Exposure of Internals:** Reflective code breaks abstractions and therefore may change behavior with upgrades of the platform.

The idea is to use reflection to iterate the fields of the local object and compare them with its equivalent on the remote one. Then apply the rules to decide which field value will prevail.

# The solution

I have created a simple project on GitHub with the solution and one example: <a href="https://github.com/joantolos/kata-merge-object" target="_blank" alt="kata-merge-object">kata-merge-object</a>

The reflection solution is nice when the content of the JSON field is a primitive. String, integer, etc are treated nicely. But I need to be able to parse more complex JSON files with nested fields, lists and custom objects.

On my example, the Config class contains a Default object which contains itself a Detail object. And that could go on and on depending on your JSON. That's right... recursion.

That is the one thing I don't love about my solution. When the type of the object is a "JSON primitive", that is: String, Integer, Boolean or a list of the above, the mapping can be done directly. When the type is other that those, say a custom object, it calls for the recursion and so on until it reaches a "JSON primitive".

The final merging method is as follows:

```javascript
private static final List<String> PRIMITIVE_JSON_TYPES = Arrays.asList("Integer", "Integer[]", "String", "String[]", "Boolean", "Boolean[]", "ArrayList");

@SuppressWarnings("unchecked")
public <T> T merge(T local, T remote) throws IllegalAccessException, InstantiationException {
    Class<?> clazz = local.getClass();
    Object merged = clazz.newInstance();

    for (Field field : clazz.getDeclaredFields()) {

        field.setAccessible(true);
        Object localValue = field.get(local);
        Object remoteValue = field.get(remote);

        if (localValue != null) {
            if(PRIMITIVE_JSON_TYPES.contains(localValue.getClass().getSimpleName())) {
                field.set(merged, (remoteValue != null) ? remoteValue : localValue);
            } else {
                field.set(merged, this.merge(localValue, remoteValue));
            }
        }
    }
    return (T) merged;
}
```

I don't know if I will use this on the final solution but playing with reflection was definitely fun. Clone the code, play with it, any improvement or new ideas will be more than welcome.

## References:

* _Photo <a href="https://www.dreamstime.com/top-above-high-angle-view-photo-focused-freelancer-people-sit-table-desk-merge-paper-puzzle-pieces-elements-trust-support-image169975411" target="_blank">169975411</a> © <a href="https://www.dreamstime.com/deagreez_info" target="_blank">Roman Samborskyi</a> | <a href="https://www.dreamstime.com/photos-images/merge.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://www.geeksforgeeks.org/reflection-in-java/" target="_blank" alt="Reflexion in Java">Reflexion in Java</a>_
* _<a href="https://stackoverflow.com/questions/30782026/merging-one-object-into-another-object" target="_blank" alt="Merging one object into another">Merging one object into another</a>_
* _<a href="https://github.com/Netflix/archaius" target="_blank" alt="Netflix Archaius">Netflix Archaius</a>_
* _<a href="https://github.com/joantolos/kata-merge-object" target="_blank" alt="Kata merge object">Kata merge object</a>_
