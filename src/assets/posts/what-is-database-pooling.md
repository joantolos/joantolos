You don't build a new pool every time someone wants to take a bath. You build a pool big enough so several people can reuse it. It has a limited capacity, a maintenance and several costs associated, but it is much cheaper than build a single pool for each one of the swimmers. This is the idea behind database connection pool.

# Database connection pool

Establishing a connection to a database is an expensive operation. Database connections typically require network sessions, authentication and more. Open and close them any time we need something from a database is a bad strategy because it will consume a lot of resources.

We need a system to keep connections open, so they can be reused when needed, enter Connection Pooling. Using connection pooling, the connections are kept alive so when one is requested, the system can use one of the active ones instead of create a brand new one from scratch.

![Connection pool diagram](/assets/images/whatIsDatabasePooling/connectionPool.png#postImageSmall)

Following the diagram above, when a client requests a connection, the pool is checked first. If an appropriate connection is available, this one is served to the client. If there is none available in the pool, a new one is created.

An appropriate connection is one that has all the correct information and already has access to the database.

Closing connections works the same way. When a client requires to close a connection, it is put on the pool rather than closing it.

This is the "happy path" to the basic connection pooling use case. Real systems are much sophisticated and include a lot of extra features like handling different user credentials, create a base of connections beforehand, so they are immediately available and a policy about when and how close the connections.

This idea is an abstraction of the more generic creation pattern: Object Pool pattern.

> _The object pool pattern is a software creation design pattern that uses a set of initialised objects kept ready to use – a "pool" – rather than allocating and destroying them on demand. A client of the pool will request an object from the pool and perform operations on the returned object. When the client has finished, it returns the object to the pool rather than destroying it; this can be done manually or automatically._

> _Object pools are primarily used for performance: in some circumstances, object pools significantly improve performance. Object pools complicate object lifetime, as objects obtained from and returned to a pool are not actually created or destroyed at this time, and thus require care in implementation._

We can think about it as a cache of database connections with the maintenance associated to any other cache system like time to life and such.

# How to use it

You want to check the possibilities of connection pooling on your database or data storing system (NoSql included or whatever you use). If your system of choice has pooling already implemented, you just follow the documentation and configure the params according to your needs.

If you want to be a bit more generic... you can use connection pool to _any_ connection made with HTTP protocol, just adding pooling to the http client that you are using. At the end of the day, you will connect to the remote database server via http (at least that is the most common way, there are storage engines that provide a custom protocol). If you can somehow inject a custom http client to your database connection, that client can be configured to be pooling.

This solution is more generic because the http client does not care if at the end of the connection is a data base o any other component.

This is a good option when the configuration of the pooling on the engine itself is too complicated, or it's just not on your hands... Maybe is a remote database and you don't have capabilities or permission to configure it.

# Http client with pooling example

You will have to look at the documentation of the http client library that you are using wether it comes from the programming language itself or it is an external one. For example, if we think of Java, the java.net package provides basic functionality for accessing resources via HTTP.

This option does not provide connection pooling out of the box (at least I have not been able to find it). Instead, if you want to use pooling with this client, you will have to implement your own pool, following the mentioned pattern before: object pooling. But, beware the problems maintaining it.

On the other hand, we can choose a third party library like Apache HttpClient with has connection pooling already implemented. The Apache libraries for Java have a huge community behind them and you can rest assure that they will work ok.

This is a summary of the Apache Http Client documentation (see link below on the sources section):

<a href="https://hc.apache.org/httpcomponents-client-5.1.x/" target="_blank" alt="HttpClient Overview">HttpClient Overview</a>

When equipped with a pooling connection manager such as PoolingClientConnectionManager, HttpClient can be used to execute multiple requests simultaneously using multiple threads of execution.

The PoolingClientConnectionManager will allocate connections based on its configuration. If all connections for a given route have already been leased, a request for a connection will block until a connection is released back to the pool. One can ensure the connection manager does not block indefinitely in the connection request operation by setting 'http.conn-manager.timeout' to a positive value. If the connection request cannot be serviced within the given time period ConnectionPoolTimeoutException will be thrown.

```javascript
PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
CloseableHttpClient httpClient = HttpClients.custom()
        .setConnectionManager(cm)
        .build();

// URIs to perform GETs on
String[] urisToGet = {
    "http://www.domain1.com/",
    "http://www.domain2.com/",
    "http://www.domain3.com/",
    "http://www.domain4.com/"
};

// create a thread for each URI
GetThread[] threads = new GetThread[urisToGet.length];
for (int i = 0; i < threads.length; i++) {
    HttpGet httpget = new HttpGet(urisToGet[i]);
    threads[i] = new GetThread(httpClient, httpget);
}

// start the threads
for (int j = 0; j < threads.length; j++) {
    threads[j].start();
}

// join the threads
for (int j = 0; j < threads.length; j++) {
    threads[j].join();
}
```

While HttpClient instances are thread safe and can be shared between multiple threads of execution, it is highly recommended that each thread maintains its own dedicated instance of HttpContext.

```javascript
static class GetThread extends Thread {

    private final CloseableHttpClient httpClient;
    private final HttpContext context;
    private final HttpGet httpget;

    public GetThread(CloseableHttpClient httpClient, HttpGet httpget) {
        this.httpClient = httpClient;
        this.context = HttpClientContext.create();
        this.httpget = httpget;
    }

    @Override
    public void run() {
        try {
            CloseableHttpResponse response = httpClient.execute(httpget, context);
            try {
                HttpEntity entity = response.getEntity();
            } finally {
                response.close();
            }
        } catch (ClientProtocolException ex) {
            // Handle protocol errors
        } catch (IOException ex) {
            // Handle I/O errors
        }
    }

}  
```

There are a bunch of parameters that we can configure, among them:

- The maximum number of total open connections.
- The maximum number of concurrent connections per route, which is 2 by default.
- The total number of concurrent connections to a specific route, which is 2 by default.

If you take a look at the defaults, you will reach the limits of the connection manager really fast, so you may want to up those parameters to take advantage of pooling.

## References:
* _Photo <a href="https://www.dreamstime.com/stock-photo-clear-blue-water-swimming-pool-crystal-image44894527" target="_blank">44894527</a> © <a href="https://www.dreamstime.com/libux77_info" target="_blank">Libux77</a> | <a href="https://www.dreamstime.com/photos-images/pool.html" target="_blank">Dreamstime.com</a>_
* _<a href="https://stackoverflow.com/questions/4041114/what-is-database-pooling" target="_blank" alt="What is database pooling?">What is database pooling?</a>_
* _<a href="https://en.wikipedia.org/wiki/Connection_pool" target="_blank" alt="Wikipedia: Connection pool">Wikipedia: Connection pool</a>_
* _<a href="https://en.wikipedia.org/wiki/Object_pool_pattern" target="_blank" alt="Wikipedia: Object pool pattern">Wikipedia: Object pool pattern</a>_
* _<a href="https://hc.apache.org/httpcomponents-client-5.1.x/" target="_blank" alt="HttpClient Overview">HttpClient Overview</a>_
* _<a href="https://hc.apache.org/httpcomponents-client-4.5.x/current/tutorial/html/connmgmt.html#d5e405" target="_blank" alt="Multithreaded request execution">Multithreaded request execution</a>_
