const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { windows } = require( "../../index" ).async;
const fixtures = require( "../fixtures/windows.js" );

describe( "windows", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			await verifyAsyncIterator( windows( ...inputs ), expectedOutputs );
		} );
	}

	itAsync( "returns an iterable iterator", async () => {
		await verifyAsyncIterator(
			windows( [ 1, 2, 3 ], 1 )[ Symbol.asyncIterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );