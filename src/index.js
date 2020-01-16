function selfIterable( iterator ) {
	iterator[ Symbol.iterator ] = () => iterator;
	return iterator;
}

module.exports.zip = function( ...iterables ) {
	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );

	return selfIterable( {
		next: function() {
			const values = [];
			let done = false;

			for( const iterator of iterators ) {
				const result = iterator.next();
				values.push( result.value );
				done = done || result.done;
			}

			return {
				done,
				value: done ? undefined : values
			};
		}
	} );
};

module.exports.zipLongest = function( ...iterables ) {
	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );

	return selfIterable( {
		next: function() {
			const values = [];
			let done = true;

			for( const iterator of iterators ) {
				const result = iterator.next();
				values.push( result.value );
				done = done && result.done;
			}

			return {
				done,
				value: done ? undefined : values
			};
		}
	} );
};

module.exports.enumerate = function*( iterable ) {
	let index = 0;
	for( const value of iterable ) {
		yield [ index++, value ];
	}
};

module.exports.skip = function( iterable, numberOfSkips = 0 ) {
	const iterator = iterable[ Symbol.iterator ]();

	while( numberOfSkips > 0 ) {
		iterator.next();
		numberOfSkips--;
	}

	return iterator;
};

module.exports.take = function*( iterable, numberToTake = 0 ) {
	if( numberToTake > 0 ) {
		for( const value of iterable ) {
			yield value;
			if( --numberToTake <= 0 ) {
				break;
			}
		}
	}
};

module.exports.chain = function*( ...iterables ) {
	for( const iterable of iterables ) {
		for( const value of iterable ) {
			yield value;
		}
	}
};

module.exports.chunks = function*( iterable, chunkSize = 1 ) {
	if( chunkSize > 0 ) {
		let chunk = []
		for( const value of iterable ) {
			chunk.push( value );
			if( chunk.length === chunkSize ) {
				yield chunk;
				chunk = [];
			}
		}
		if( chunk.length > 0 ) {
			yield chunk;
		}
	}
};

module.exports.chunksExact = function*( iterable, chunkSize = 1 ) {
	if( chunkSize > 0 ) {
		let chunk = []
		for( const value of iterable ) {
			chunk.push( value );
			if( chunk.length === chunkSize ) {
				yield chunk;
				chunk = [];
			}
		}
	}
};

module.exports.windows = function*( iterable, windowSize = 1 ) {
	if( windowSize > 0 ) {
		let window = [];
		for( const value of iterable ) {
			window.push( value );
			if( window.length === windowSize ) {
				yield window;
				window = window.slice( 1 );
			}
		}
	}
};

module.exports.collect = Array.from;

module.exports.forEach = function( iterable, callback ) {
	let index = 0;
	for( const value of iterable ) {
		callback( value, index++ );
	}
};

module.exports.map = function*( iterable, map ) {
	let index = 0;
	for( const value of iterable ) {
		yield map( value, index++ );
	}
};

module.exports.filter = function*( iterable, filter ) {
	let index = 0;
	for( const value of iterable ) {
		if( filter( value, index++ ) ) {
			yield value;
		}
	}
};

module.exports.reduce = function( iterable, reducer, accumulator ) {
	const iterator = iterable[ Symbol.iterator ]();
	let { done, value } = iterator.next();
	let index = 0;
	
	// If accumulator is not passed at all - undefined is OK
	if( arguments.length < 3 ) {
		if( done ) {
			throw new TypeError( "reduce of empty iterable with no initial value" );
		}

		accumulator = value;
		( { done, value } = iterator.next() );
		index++;
	}
	
	while( !done ) {
		accumulator = reducer( accumulator, value, index );
		( { done, value } = iterator.next() );
		index++;
	}
	
	return accumulator;
};

module.exports.partition = function( iterable, partitioner ) {
	const trueBacklog = [];
	const falseBacklog = [];

	const iterator = module.exports.map( iterable, ( value, index ) => {
		const backlog = partitioner( value, index ) ? trueBacklog : falseBacklog;
		backlog.push( value );
	} );

	function* flush( array ) {
		while( array.length > 0 ) {
			yield array.shift();
		}
	}

	function* trueIterator() {
		for( const partition of iterator ) {
			yield* flush( trueBacklog );
		}
		yield* flush( trueBacklog );
	}

	function* falseIterator() {
		for( const partition of iterator ) {
			yield* flush( falseBacklog );
		}
		yield* flush( falseBacklog );
	}

	return [ trueIterator(), falseIterator() ];
};

module.exports.interleave = function*( ...iterables ) {
	if( iterables.length === 0 ) {
		return;
	}

	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );

	let allDone = false;

	while( !allDone ) {
		allDone = true;
		for( const iterator of iterators ) {
			const { value, done } = iterator.next();
			if( !done ) {
				yield value;
				allDone = false;
			}
		}
	}
};

module.exports.interleaveShortest = function*( ...iterables ) {
	if( iterables.length === 0 ) {
		return;
	}
	
	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );
	
	while( true ) {
		for( const iterator of iterators ) {
			const { value, done } = iterator.next();
			if( done ) {
				return;
			}
			yield value;
		}
	}
};

module.exports.intersperse = function*( iterable, separator ) {
	const iterator = iterable[ Symbol.iterator ]();
	let { value, done } = iterator.next();
	
	while( !done ) {
		yield value;
		( { value, done } = iterator.next() );
		if( !done ) {
			yield separator;
		}
	}
};

module.exports.selfIterable = selfIterable;

module.exports.async = require( "./async.js" );