const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { chain } = require( "../../index" ).async;
const fixtures = require( "../fixtures/chain.js" );

describe( "chain", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( chain( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			chain( [ 1, 2, 3 ] )[ Symbol.asyncIterator ](),
			[ 1, 2, 3 ]
		);
	} );
} );