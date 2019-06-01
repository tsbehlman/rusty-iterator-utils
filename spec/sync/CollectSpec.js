const { verifyIterator } = require( "../TestUtils" );
const { collect } = require( "../../index" );
const fixtures = require( "../fixtures/collect.js" );

describe( "collect", () => {
	for( const [ name, inputs, expectedOutputs ] of fixtures ) {
		it( name, () => {
			expect( collect( ...inputs ) ).toEqual( expectedOutputs );
		} );
	}
} );