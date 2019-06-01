module.exports.verifyIterator = function( iterator, expectations ) {
	let iteratorResult = iterator.next();

	for( const expectation of expectations ) {
		if( iteratorResult.done ) {
			fail( "Returned fewer nodes than expected" );
			return;
		}
		expect( iteratorResult.value ).toEqual( expectation );
		iteratorResult = iterator.next();
	}

	if( !iteratorResult.done ) {
		fail( "Returned more nodes than expected" );
		return;
	}
	expect( iteratorResult.value ).toBe( undefined );
};

module.exports.verifyAsyncIterator = async function( iterator, expectations ) {
	let iteratorResult = await iterator.next();

	for( const expectation of expectations ) {
		if( iteratorResult.done ) {
			fail( "Returned fewer nodes than expected" );
			return;
		}
		expect( iteratorResult.value ).toEqual( expectation );
		iteratorResult = await iterator.next();
	}

	if( !iteratorResult.done ) {
		fail( "Returned more nodes than expected" );
		return;
	}
	expect( iteratorResult.value ).toBe( undefined );
};

Array.prototype[ Symbol.asyncIterator ] = async function*() {
	for( const value of this[ Symbol.iterator ]() ) {
		yield value;
	}
};

module.exports.itAsync = function( title, asyncTest ) {
	it( title, done => asyncTest().then( done ).catch( done.fail ) );
};