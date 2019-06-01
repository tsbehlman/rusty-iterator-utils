const { itAsync, verifyAsyncIterator } = require( "../TestUtils" );
const { collect } = require( "../../index" ).async;
const fixtures = require( "../fixtures/collect.js" );

describe( "collect", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		itAsync( name, async () => {
			expect( await collect( ...inputs ) ).toEqual( expectedOutputs );
		} );
	}
} );