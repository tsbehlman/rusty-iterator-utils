require( "./TestUtils" );
const utils = require( "../src/index" );

const emptyError = new TypeError( "reduce of empty iterable with no initial value" );

describe( "reduce", () => {
	it( "throws an error when the iterable is empty and no initial value is passed", () => {
		expect( () => utils.reduce( [], acc => acc ) ).toThrow( emptyError );
	} );
} );

describe( "async reduce", () => {
	it( "throws an error when the iterable is empty and no initial value is passed", () => {
		expectAsync( utils.async.reduce( [], acc => acc ) ).toBeRejectedWith( emptyError );
	} );
} );