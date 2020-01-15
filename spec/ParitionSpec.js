const { getFixtures } = require( "./TestUtils" );
const utils = require( "../src/index" );

const [ [ , fixtures ] ] = getFixtures( "partition" );

describe( "partition", () => {
	for( const [ testName, iterable, partitioner, trueValues, falseValues ] of fixtures ) {
		it( testName, () => {
			expect( utils.partition( iterable, partitioner ).map( iterator => utils.collect( iterator ) ) )
				.toEqual( [ trueValues, falseValues ] );
			expect( utils.partition( iterable, partitioner ).map( iterator => utils.collect( iterator[ Symbol.iterator ]() ) ) )
				.toEqual( [ trueValues, falseValues ] );
		} );
	}
} );

describe( "async partition", () => {
	for( const [ testName, iterable, partitioner, trueValues, falseValues ] of fixtures ) {
		it( testName, async () => {
			expect( await utils.async.collect( utils.async.partition( iterable, partitioner ).map( iterator => utils.async.collect( iterator ) ) ) )
				.toEqual( [ trueValues, falseValues ] );
			expect( await utils.async.collect( utils.async.partition( iterable, partitioner ).map( iterator => utils.async.collect( iterator[ Symbol.asyncIterator ]() ) ) ) )
				.toEqual( [ trueValues, falseValues ] );
		} );
	}
} );