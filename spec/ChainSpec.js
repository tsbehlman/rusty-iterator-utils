const { verifyIterator } = require( "./TestUtils" );
const { chain } = require( "../index" );

describe( "chain", () => {
	it( "chains one empty array", () => {
		verifyIterator(
			chain( [] ),
			[]
		);
	} );
	
	it( "chains two empty arrays", () => {
		verifyIterator(
			chain( [], [] ),
			[]
		);
	} );
	
	it( "chains one array", () => {
		verifyIterator(
			chain( [ 1, 2, 3 ] ),
			[ 1, 2, 3 ]
		);
	} );
	
	it( "chains two arrays", () => {
		verifyIterator(
			chain( [ "a", "b", "c" ], [ 1, 2, 3 ] ),
			[ "a", "b", "c", 1, 2, 3 ]
		);
	} );
	
	it( "chains an array with an empty array", () => {
		verifyIterator(
			chain( [ 1, 2, 3 ], [] ),
			[ 1, 2, 3 ]
		);
	} );
	
	it( "chains an empty array with an array", () => {
		verifyIterator(
			chain( [], [ 1, 2, 3 ] ),
			[ 1, 2, 3 ]
		);
	} );
	
	it( "chains three arrays", () => {
		verifyIterator(
			chain( [ "a", "b", "c" ], [ 1, 2, 3 ], [ "d", "e", "f" ] ),
			[ "a", "b", "c", 1, 2, 3, "d", "e", "f" ]
		);
	} );
	
	it( "chains three arrays with an empty array", () => {
		verifyIterator(
			chain( [ "a", "b", "c" ], [], [ "d", "e", "f" ] ),
			[ "a", "b", "c", "d", "e", "f" ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			chain( [ 1, 2, 3 ] )[ Symbol.iterator ](),
			[ 1, 2, 3 ]
		);
	} );
} );