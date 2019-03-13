const { verifyIterator } = require( "./TestUtils" );
const { chunks } = require( "../index" );

describe( "chunks", () => {
	it( "chunks an empty array", () => {
		verifyIterator(
			chunks( [], 1 ),
			[]
		);
	} );
	
	it( "chunks an empty array by 2", () => {
		verifyIterator(
			chunks( [], 2 ),
			[]
		);
	} );
	
	it( "chunks an array by 1", () => {
		verifyIterator(
			chunks( [ 1, 2, 3 ], 1 ),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
	
	it( "chunks an array by 1 by default", () => {
		verifyIterator(
			chunks( [ 1, 2, 3 ] ),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
	
	it( "chunks an array by 2", () => {
		verifyIterator(
			chunks( [ 1, 2, 3, 4 ], 2 ),
			[ [ 1, 2 ], [ 3, 4 ] ]
		);
	} );
	
	it( "chunks an array by 3", () => {
		verifyIterator(
			chunks( [ 1, 2, 3 ], 3 ),
			[ [ 1, 2, 3 ] ]
		);
	} );
	
	it( "chunks an array of 4 by 3", () => {
		verifyIterator(
			chunks( [ 1, 2, 3, 4 ], 3 ),
			[ [ 1, 2, 3 ], [ 4 ] ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			chunks( [ 1, 2, 3 ], 1 )[ Symbol.iterator ](),
			[ [ 1 ], [ 2 ], [ 3 ] ]
		);
	} );
} );