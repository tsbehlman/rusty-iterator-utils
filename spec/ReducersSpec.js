const { getFixtures } = require( "./TestUtils" );
const utils = require( "../index" );

const suites = getFixtures( "reducers" );

for( const [ functionName, fixtures ] of suites ) {
	const syncFunction = utils[ functionName ];
	const asyncFunction = utils.async[ functionName ];

	describe( functionName, () => {
		for( const [ testName, inputs, expectedOutput ] of fixtures ) {
			it( testName, () => {
				expect( syncFunction( ...inputs ) ).toEqual( expectedOutput );
			} );
		}
	} );

	describe( "async " + functionName, () => {
		for( const [ testName, inputs, expectedOutput ] of fixtures ) {
			it( testName, async () => {
				expect( await asyncFunction( ...inputs ) ).toEqual( expectedOutput );
			} );
		}
	} );
}