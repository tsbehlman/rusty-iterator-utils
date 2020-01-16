# rusty-iterator-utils

[![Build Status](https://travis-ci.org/tsbehlman/rusty-iterator-utils.svg?branch=master)](https://travis-ci.org/tsbehlman/slim-cover)

A collection of utility functions for [JavaScript iterables and iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) inspired by [Rust's Iterator trait](https://doc.rust-lang.org/std/iter/trait.Iterator.html), [Rust's slice primitive](https://doc.rust-lang.org/std/primitive.slice.html), and third-party crate [Itertools](https://github.com/rust-itertools/itertools).  Useful for lazily evaluating sequences or streams of data.

### Functions

Each utility function is accompanied by an equivalent under the exported `async` object which supports async iterables.

* <a href="#selfIterable">selfIterable</a>
* <a href="#collect">collect</a>
* <a href="#zip">zip</a>
* <a href="#zipLongest">zipLongest</a>
* <a href="#enumerate">enumerate</a>
* <a href="#skip">skip</a>
* <a href="#take">take</a>
* <a href="#chain">chain</a>
* <a href="#chunks">chunks</a>
* <a href="#chunksExact">chunksExact</a>
* <a href="#windows">windows</a>
* <a href="#partition">partition</a>
* <a href="#forEach">forEach</a>
* <a href="#map">map</a>
* <a href="#filter">filter</a>
* <a href="#reduce">reduce</a>

#### <a name="selfIterable"></a>`selfIterable( iterator )`

Modifies the given object which conforms to the [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) so that it is itself iterable.  Required only if you need to pass an iterator to one of the below utility functions and it does not already implement the `Symbol.iterator` method (or `Symbol.asyncIterator` if using the async variant).

#### <a name="collect"></a>`collect( iterable )`

Based on [the `collect` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.collect), [JavaScript's `Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), and [JavaScript's `Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

A shorthand for `Array.from`, or for the async variant a version of `Promise.all` which accepts an async iterable such as a [readable Node.js stream](https://nodejs.org/api/stream.html#stream_readable_symbol_asynciterator).

#### <a name="zip"></a>`zip( ...iterables )`

Based on [the `zip` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.zip)

Returns an iterator where each value is an array of each given iterable's current value.  If any iterable runs out of values before the others, its value is considered to be `undefined`.

```javascript
collect( zip( [ "a", "b", "c" ], [ 1, 2, 3 ] ) )
// => [ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ]

collect( zip( [ "a", "b" ], [ 1, 2, 3, 4 ] ) )
// => [ [ "a", 1 ], [ "b", 2 ] ]
```

#### <a name="zipLongest"></a>`zipLongest( ...iterables )`

Based on [the `zip_longest` method from Itertools](https://docs.rs/itertools/0.7.8/itertools/trait.Itertools.html#method.zip_longest)

Like `zip`, but continues until all iterables are exhausted.  The value of an exhausted iterable is represented as `undefined`.

```javascript
collect( zip_longest( [ "a", "b", "c" ], [ 1, 2, 3 ] ) )
// => [ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ]

collect( zip_longest( [ "a" ], [ 1, 2, 3 ] ) )
// => [ [ "a", 1 ], [ undefined, 2 ], [ undefined, 3 ] ]
```

#### <a name="chain"></a>`chain( ...iterables )`

Based on [the `chain` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.chain)

Returns an iterable which acts as a concatenation of all given iterables.

```javascript
collect( chain( [ "a", "b", "c" ], [ 1, 2, 3 ] ) )
// => [ "a", "b", "c", 1, 2, 3 ]
```

#### <a name="enumerate"></a>`enumerate( iterable )`

Based on [the `enumerate` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.enumerate)

Returns an iterator whose values are array pairs, the first of each pair being the zero-based index of the value and the second being the current value from the iterable.

```javascript
collect( enumerate( [ "foo", "bar", "baz" ], 2 ) )
// => [ [ 0, "foo" ], [ 1, "bar" ], [ 2, "baz" ] ]
```

#### <a name="skip"></a>`skip( iterable, numItemsToSkip )`

Based on [the `skip` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.skip)

Returns an iterator which has dropped the first `numItemsToSkip` items.

```javascript
collect( skip( [ "a", "b", "c", "d" ], 2 ) )
// => [ "c", "d" ]
```

#### <a name="take"></a>`take( iterable, numItemsToTake )`

Based on [the `take` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.take)

Returns an iterable that stops after the first `numItemsToTake` items.

```javascript
collect( take( [ "a", "b", "c", "d" ], 2 ) )
// => [ "a", "b" ]
```

#### <a name="chunks"></a>`chunks( iterable, chunkSize = 1 )`

Based on [Rust's `std::slice::Chunks`](https://doc.rust-lang.org/std/slice/struct.Chunks.html)

Returns an iterator whose values are non-overlapping partitions of the iterable, each containing at most `chunkSize` items.

```javascript
collect( chunks( [ 1, 2, 3, 4 ], 2 ) )
// => [ [ 1, 2 ], [ 3, 4 ] ]

collect( chunks( [ 1, 2, 3, 4 ], 3 ) )
// => [ [ 1, 2, 3 ], [ 1 ] ]
```

#### <a name="chunksExact"></a>`chunksExact( iterable, chunkSize = 1 )`

Based on [Rust's `std::slice::ChunksExact`](https://doc.rust-lang.org/std/slice/struct.ChunksExact.html)

Returns an iterator whose values are non-overlapping partitions of the iterable, each containing exactly `chunkSize` items.  Any remaining items which do not fit in a full partition are omitted (as many as `chunkSize - 1` items).

```javascript
collect( chunksExact( [ 1, 2, 3, 4 ], 2 ) )
// => [ [ 1, 2 ], [ 3, 4 ] ]

collect( chunksExact( [ 1, 2, 3, 4 ], 3 ) )
// => [ [ 1, 2, 3 ] ]
```

#### <a name="windows"></a>`windows( iterable, windowSize = 1 )`

Based on [Rust's `std::slice::Windows`](https://doc.rust-lang.org/std/slice/struct.Windows.html)

Returns an iterator whose values are overlapping partitions of the iterable, each containing exactly `chunkSize` items.

```javascript
collect( windows( [ 1, 2, 3, 4 ], 2 ) )
// => [ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]

collect( windows( [ 1, 2, 3, 4 ], 3 ) )
// => [ [ 1, 2, 3 ], [ 2, 3, 4 ] ]
```

#### <a name="partition"></a>`partition( iterable, partitioner )`

Based on [the `partition` method for Rust's `std::iter::Iterator`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.partition)

Returns two iterators: one containing the values for which `partitioner` returned `true` and one for all other values.

```javascript
const [ evens, odds ] = partition( [ 1, 2, 3, 4, 5 ], value => ( value % 2 ) == 0 )
collect( evens )
// => [ 2, 4 ]
collect( odds )
// => [ 1, 3, 5 ]
```

#### <a name="forEach"></a>`forEach( iterable, callback )`

Based on [JavaScript's `Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

A version of `Array.prototype.forEach` which can be applied to any iterable.

#### <a name="map"></a>`map( iterable, callback )`

Based on [JavaScript's `Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

A version of `Array.prototype.map` which can be applied to any iterable.  Returns an iterable containing the mapped values.

#### <a name="filter"></a>`filter( iterable, callback )`

Based on [JavaScript's `Array.prototype.filter `](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

A lazy version of `Array.prototype.filter` which can be applied to any iterable.  Returns an iterable containing only the values which passed the filter callback.

#### <a name="reduce"></a>`reduce( iterable, reducer, accumulator )`

Based on [JavaScript's `Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

A version of `Array.prototype.reduce` which can be applied to any iterable.  Returns the result of the reduction.
