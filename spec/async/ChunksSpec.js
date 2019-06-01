const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { chunks } = require( "../../index" ).async;
const fixtures = require( "../fixtures/chunks.js" );

describe( "chunks", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( chunks( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			chunks( [ 1, 2, 3 ], 1 )[ Symbol.asyncIterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );