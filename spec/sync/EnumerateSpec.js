const { verifyIterator } = require( "../TestUtils" );
const { enumerate } = require( "../../index" );
const fixtures = require( "../fixtures/enumerate.js" );

describe( "enumerate", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( enumerate( ...inputs ), expectedOutputs );
		} );
	}
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			enumerate( [ "a", "b", "c" ] )[ Symbol.iterator ](),
			[ [ 0, "a" ], [ 1, "b" ], [ 2, "c" ] ]
		);
	} );
} );