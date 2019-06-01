Array.prototype[ Symbol.asyncIterator ] = async function*() {
	for( const value of this[ Symbol.iterator ]() ) {
		yield value;
	}
};