const { verifyIterator } = require( "./TestUtils" );
const { enumerate } = require( "../index" );

describe( "enumerate", () => {
	it( "enumerates an empty array", () => {
		verifyIterator(
			enumerate( [] ),
			[]
		);
	} );
	
	it( "enumerates one array", () => {
		verifyIterator(
			enumerate( [ "a", "b", "c" ] ),
			[ [ 0, "a" ], [ 1, "b" ], [ 2, "c" ] ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			enumerate( [ "a", "b", "c" ] )[ Symbol.iterator ](),
			[ [ 0, "a" ], [ 1, "b" ], [ 2, "c" ] ]
		);
	} );
} );