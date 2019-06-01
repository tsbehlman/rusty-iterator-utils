const { verifyIterator } = require( "../TestUtils" );
const { skip } = require( "../../index" );
const fixtures = require( "../fixtures/skip.js" );

describe( "skip", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( skip( ...inputs ), expectedOutputs );
		} );
	}
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ], 0 )[ Symbol.iterator ](),
			[ "a", "b", "c" ]
		);
	} );
} );