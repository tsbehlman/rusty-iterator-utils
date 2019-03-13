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