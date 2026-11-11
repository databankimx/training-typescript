# Ch32 - Typed arrays

Most arrays hold any kind of value, and each element is a full JavaScript value with its own overhead. Binary data is different: an image, a network packet, or a file is a sequence of bytes, and it needs a compact, fixed-size representation. Typed arrays provide that. Each one holds numbers of a single fixed size, and the checker knows the size from the array's type.

Two more ideas follow from this. Several typed arrays can share one block of memory, each reading it in a different way, and text must be converted to bytes before it can be stored in that memory.

## What you'll learn

1. How a typed array stores fixed-size numbers, and what happens when a value does not fit.
2. How two views can read the same block of memory.
3. How text becomes bytes, and back again, with the encoder and decoder.

The chapter ends with a summary, and a homework exercise.
