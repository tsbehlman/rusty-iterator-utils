const fs = require( "fs" );
const path = require( "path" );
require( "./TestUtils" );
const utils = require( "../index" );

const suites = new Map();

for( const file of fs.readdirSync( path.normalize( "spec/fixtures" ) ) ) {
	const extension = path.extname( file );
	if( extension === ".js" || extension === ".json" ) {
		suites.set( path.basename( file, extension ), require( "./fixtures/" + file ) );
	}
}

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