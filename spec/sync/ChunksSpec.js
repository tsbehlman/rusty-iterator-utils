const { verifyIterator } = require( "../TestUtils" );
const { chunks } = require( "../../index" );
const fixtures = require( "../fixtures/chunks.js" );

describe( "chunks", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( chunks( ...inputs ), expectedOutputs );
		} );
	}
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			chunks( [ 1, 2, 3 ], 1 )[ Symbol.iterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );