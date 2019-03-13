function selfIterable( iterator ) {
	iterator[ Symbol.iterator ] = () => iterator;
	return iterator;
}

module.exports.zip = function( ...iterables ) {
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

module.exports.selfIterable = selfIterable;