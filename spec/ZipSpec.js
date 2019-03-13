const { verifyIterator } = require( "./TestUtils" );
const { zip } = require( "../index" );

describe( "zip", () => {
	it( "zips an empty array", () => {
		verifyIterator(
			zip( [] ),
			[]
		);
	} );
	
	it( "zips two empty arrays", () => {
		verifyIterator(
			zip( [], [] ),
			[]
		);
	} );
	
	it( "zips one array", () => {
		verifyIterator(
			zip( [ 1, 2, 3 ] ),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
	
	it( "zips two arrays", () => {
		verifyIterator(
			zip( [ "a", "b", "c" ], [ 1, 2, 3 ] ),
			[ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ]
		);
	} );
	
	it( "zips an array into an array with more values", () => {
		verifyIterator(
			zip( [ "a" ], [ 1, 2, 3 ] ),
			[ [ "a", 1 ], [ undefined, 2 ], [ undefined, 3 ] ]
		);
	} );
	
	it( "zips an array into an array with fewer values", () => {
		verifyIterator(
			zip( [ "a", "b", "c" ], [ 1 ] ),
			[ [ "a", 1 ], [ "b", undefined ], [ "c", undefined ] ]
		);
	} );
	
	it( "zips three arrays", () => {
		verifyIterator(
			zip( [ "a", "b", "c" ], [ 1, 2, 3 ], [ "d", "e", "f" ] ),
			[ [ "a", 1, "d" ], [ "b", 2, "e" ], [ "c", 3, "f" ] ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			zip( [ 1, 2, 3 ] )[ Symbol.iterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );