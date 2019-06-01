const { verifyIterator } = require( "../TestUtils" );
const { windows } = require( "../../index" );
const fixtures = require( "../fixtures/windows.js" );

describe( "windows", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			verifyIterator( windows( ...inputs ), expectedOutputs );
		} );
	}
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			windows( [ 1, 2, 3 ], 1 )[ Symbol.iterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );