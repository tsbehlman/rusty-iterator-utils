function selfIterable( iterator ) {
	iterator[ Symbol.asyncIterator ] = () => iterator;
	return iterator;
}

module.exports.zip = function( ...iterables ) {
	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );

	return selfIterable( {
		next: async function() {
			const values = [];
			let done = false;

			for( const iterator of iterators ) {
				const result = await iterator.next();
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
		next: async function() {
			const values = [];
			let done = true;

			for( const iterator of iterators ) {
				const result = await iterator.next();
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

module.exports.enumerate = async function*( iterable ) {
	let index = 0;
	for await( const value of iterable ) {
		yield [ index++, value ];
	}
};

module.exports.skip = function( iterable, numberOfSkips = 0 ) {
	const iterator = iterable[ Symbol.asyncIterator ]();

	while( numberOfSkips > 0 ) {
		iterator.next();
		numberOfSkips--;
	}

	return iterator;
};

module.exports.take = async function*( iterable, numberToTake = 0 ) {
	if( numberToTake > 0 ) {
		for await( const value of iterable ) {
			yield value;
			if( --numberToTake <= 0 ) {
				break;
			}
		}
	}
};

module.exports.chain = async function*( ...iterables ) {
	for( const iterable of iterables ) {
		for await( const value of iterable ) {
			yield value;
		}
	}
};

module.exports.chunks = async function*( iterable, chunkSize = 1 ) {
	if( chunkSize > 0 ) {
		let chunk = []
		for await( const value of iterable ) {
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

module.exports.chunksExact = async function*( iterable, chunkSize = 1 ) {
	if( chunkSize > 0 ) {
		let chunk = []
		for await( const value of iterable ) {
			chunk.push( value );
			if( chunk.length === chunkSize ) {
				yield chunk;
				chunk = [];
			}
		}
	}
};

module.exports.windows = async function*( iterable, windowSize = 1 ) {
	if( windowSize > 0 ) {
		let window = [];
		for await( const value of iterable ) {
			window.push( value );
			if( window.length === windowSize ) {
				yield window;
				window = window.slice( 1 );
			}
		}
	}
};

module.exports.collect = async function( iterable ) {
	const collection = [];
	for await( const value of iterable ) {
		collection.push( value );
	}
	return collection;
};

module.exports.forEach = async function( iterable, callback ) {
	let index = 0;
	for await( const value of iterable ) {
		callback( value, index++ );
	}
};

module.exports.map = async function*( iterable, mapper ) {
	let index = 0;
	for await( const value of iterable ) {
		yield mapper( value, index++ );
	}
};

module.exports.filter = async function*( iterable, filter ) {
	let index = 0;
	for await( const value of iterable ) {
		if( filter( value, index++ ) ) {
			yield value;
		}
	}
};

module.exports.reduce = async function( iterable, reducer, accumulator ) {
	const iterator = iterable[ Symbol.iterator ]();
	let { done, value } = iterator.next();
	let index = 0;

	// If accumulator is not passed at all - undefined is OK
	if( arguments.length < 3 ) {
		if( done ) {
			throw new TypeError( "reduce of empty iterable with no initial value" );
		}

		accumulator = value;
		( { done, value } = await iterator.next() );
		index++;
	}

	while( !done ) {
		accumulator = reducer( accumulator, value, index );
		( { done, value } = await iterator.next() );
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

	async function* trueIterator() {
		for await ( const partition of iterator ) {
			yield* flush( trueBacklog );
		}
		yield* flush( trueBacklog );
	}

	async function* falseIterator() {
		for await ( const partition of iterator ) {
			yield* flush( falseBacklog );
		}
		yield* flush( falseBacklog );
	}

	return [ trueIterator(), falseIterator() ];
};

module.exports.interleave = async function*( ...iterables ) {
	if( iterables.length === 0 ) {
		return;
	}

	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );

	let allDone = false;

	while( !allDone ) {
		allDone = true;
		for( const iterator of iterators ) {
			const { value, done } = await iterator.next();
			if( !done ) {
				yield value;
				allDone = false;
			}
		}
	}
};

module.exports.interleaveShortest = async function*( ...iterables ) {
	if( iterables.length === 0 ) {
		return;
	}

	const iterators = iterables.map( iterable => iterable[ Symbol.iterator ]() );

	while( true ) {
		for( const iterator of iterators ) {
			const { value, done } = await iterator.next();
			if( done ) {
				return;
			}
			yield value;
		}
	}
};

module.exports.intersperse = async function*( iterable, separator ) {
	const iterator = iterable[ Symbol.iterator ]();
	let { value, done } = await iterator.next();

	while( !done ) {
		yield value;
		( { value, done } = await iterator.next() );
		if( !done ) {
			yield separator;
		}
	}
};

module.exports.selfIterable = selfIterable;