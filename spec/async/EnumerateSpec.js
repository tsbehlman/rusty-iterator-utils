const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { enumerate } = require( "../../index" ).async;
const fixtures = require( "../fixtures/enumerate.js" );

describe( "enumerate", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( enumerate( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			enumerate( [ "a", "b", "c" ] )[ Symbol.asyncIterator ](),
			[ [ 0, "a" ], [ 1, "b" ], [ 2, "c" ] ]
		);
	} );
} );