# Ch19 - HTTP and data

Most real programs talk to other programs. A web page asks a server for a list of orders, a service sends a payment request, a sensor reports a reading. Each conversation is a **request** sent to an address, and a **response** coming back with a status and a body, usually in a format called JSON. The body arrives from outside the program, so its type isn't known in advance, and this chapter is about reading it safely.

The lessons here use requests and responses built in memory, so they run offline. The code is the same as it would be for a real server, so what you learn carries over.

## What you'll learn

1. How a response carries a status and a body, and how to read the body as JSON.
2. How to check data that arrives from outside the program before you trust it.
3. How to build a request with its method, address, and headers.
4. How to check a response's status, and turn a failed request into a clear error.

The chapter ends with a summary, and two homework exercises.
