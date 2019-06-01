const { verifyIterator } = require( "../TestUtils" );
const { zip } = require( "../../index" );
const fixtures = require( "../fixtures/zip.js" );

describe( "zip", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( zip( ...inputs ), expectedOutputs );
		} );
	}
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			zip( [ 1, 2, 3 ] )[ Symbol.iterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );