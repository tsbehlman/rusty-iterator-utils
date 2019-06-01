const { verifyIterator } = require( "../TestUtils" );
const { take } = require( "../../index" );
const fixtures = require( "../fixtures/take.js" );

describe( "take", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( take( ...inputs ), expectedOutputs );
		} );
	}
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			take( [ "a", "b", "c" ], 0 )[ Symbol.iterator ](),
			[]
		);
	} );
} );