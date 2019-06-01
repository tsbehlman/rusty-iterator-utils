const { verifyIterator } = require( "./TestUtils" );
const { skip } = require( "../index" );

describe( "skip", () => {
	it( "skips 0 items in an empty array", () => {
		verifyIterator(
			skip( [], 0 ),
			[]
		);
	} );
	
	it( "skips 0 items in an array", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ], 0 ),
			[ "a", "b", "c" ]
		);
	} );
	
	it( "skips 0 items in an array if no skips specified", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ] ),
			[ "a", "b", "c" ]
		);
	} );
	
	it( "skips 0 items in an array if negative skips specified", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ], -2 ),
			[ "a", "b", "c" ]
		);
	} );
	
	it( "skips 1 item in an array", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ], 1 ),
			[ "b", "c" ]
		);
	} );
	
	it( "skips 2 items in an array", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ], 2 ),
			[ "c" ]
		);
	} );
	
	it( "returns an iterable iterator", () => {
		verifyIterator(
			skip( [ "a", "b", "c" ], 0 )[ Symbol.iterator ](),
			[ "a", "b", "c" ]
		);
	} );
} );