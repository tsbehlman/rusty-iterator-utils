const { getFixtures } = require( "./TestUtils" );
const utils = require( "../src/index" );

const suites = getFixtures( "transformers" );

for( const [ functionName, fixtures ] of suites ) {
	const syncFunction = utils[ functionName ];
	const asyncFunction = utils.async[ functionName ];

	describe( functionName, () => {
		for( const [ testName, inputs, expectedOutputs ] of fixtures ) {
			it( testName, () => {
				expect( utils.collect( syncFunction( ...inputs ) ) ).toEqual( expectedOutputs );
				expect( utils.collect( syncFunction( ...inputs )[ Symbol.iterator ]() ) ).toEqual( expectedOutputs );
			} );
		}
	} );

	describe( "async " + functionName, () => {
		for( const [ testName, inputs, expectedOutputs ] of fixtures ) {
			it( testName, async () => {
				expect( await utils.async.collect( asyncFunction( ...inputs ) ) ).toEqual( expectedOutputs );
				expect( await utils.async.collect( asyncFunction( ...inputs )[ Symbol.asyncIterator ]() ) ).toEqual( expectedOutputs );
			} );
		}
	} );
}