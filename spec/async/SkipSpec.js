const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { skip } = require( "../../index" ).async;
const fixtures = require( "../fixtures/skip.js" );

describe( "skip", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( skip( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			skip( [ "a", "b", "c" ], 0 )[ Symbol.asyncIterator ](),
			[ "a", "b", "c" ]
		);
	} );
} );