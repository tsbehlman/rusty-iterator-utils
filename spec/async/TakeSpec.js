const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { take } = require( "../../index" ).async;
const fixtures = require( "../fixtures/take.js" );

describe( "take", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( take( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			take( [ "a", "b", "c" ], 0 )[ Symbol.asyncIterator ](),
			[]
		);
	} );
} );