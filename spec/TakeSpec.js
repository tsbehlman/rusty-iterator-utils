const { verifyIterator } = require( "./TestUtils" );
const { take } = require( "../index" );

describe( "take", () => {
	it( "takes 0 items from an empty array", () => {
		verifyIterator(
			take( [], 0 ),
			[]
		);
	} );
	
	it( "takes 0 items from an array", () => {
		verifyIterator(
			take( [ "a", "b", "c" ], 0 ),
			[]
		);
	} );
	
	it( "takes 0 items from an array if no takes specified", () => {
		verifyIterator(
			take( [ "a", "b", "c" ] ),
			[]
		);
	} );
	
	it( "takes 0 items from an array if negative takes specified", () => {
		verifyIterator(
			take( [ "a", "b", "c" ], -2 ),
			[]
		);
	} );
	
	it( "takes 1 item from an array", () => {
		verifyIterator(
			take( [ "a", "b", "c" ], 1 ),
			[ "a" ]
		);
	} );
	
	it( "takes 2 items from an array", () => {
		verifyIterator(
			take( [ "a", "b", "c" ], 2 ),
			[ "a", "b" ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			take( [ "a", "b", "c" ], 0 )[ Symbol.iterator ](),
			[]
		);
	} );
} );