const { verifyIterator } = require( "../TestUtils" );
const { chain } = require( "../../index" );
const fixtures = require( "../fixtures/chain.js" );

describe( "chain", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( chain( ...inputs ), expectedOutputs );
		} );
	}

	it( "returns an iterable iterator", () => {
		verifyIterator(
			chain( [ 1, 2, 3 ] )[ Symbol.iterator ](),
			[ 1, 2, 3 ]
		);
	} );
} );