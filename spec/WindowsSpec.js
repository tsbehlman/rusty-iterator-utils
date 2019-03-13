const { verifyIterator } = require( "./TestUtils" );
const { windows } = require( "../index" );

describe( "windows", () => {
	it( "windows an empty array", () => {
		verifyIterator(
			windows( [], 1 ),
			[]
		);
	} );
	
	it( "windows an empty array by 2", () => {
		verifyIterator(
			windows( [], 2 ),
			[]
		);
	} );
	
	it( "windows an array by 1", () => {
		verifyIterator(
			windows( [ 1, 2, 3 ], 1 ),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
	
	it( "windows an array by 1 by default", () => {
		verifyIterator(
			windows( [ 1, 2, 3 ] ),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
	
	it( "windows an array by 2", () => {
		verifyIterator(
			windows( [ 1, 2, 3 ], 2 ),
			[ [ 1, 2 ], [ 2, 3 ] ]
		);
	} );
	
	it( "windows an array by 3", () => {
		verifyIterator(
			windows( [ 1, 2, 3 ], 3 ),
			[ [ 1, 2, 3 ] ]
		);
	} );
	
	it( "windows an array of 4 by 3", () => {
		verifyIterator(
			windows( [ 1, 2, 3, 4, 5, 6 ], 3 ),
			[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ] ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			windows( [ 1, 2, 3 ], 1 )[ Symbol.iterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );