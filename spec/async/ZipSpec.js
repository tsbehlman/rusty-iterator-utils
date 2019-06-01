const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { zip } = require( "../../index" ).async;
const fixtures = require( "../fixtures/zip.js" );

describe( "zip", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( zip( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			zip( [ 1, 2, 3 ] )[ Symbol.asyncIterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );