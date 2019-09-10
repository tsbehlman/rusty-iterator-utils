const fs = require( "fs" );
const path = require( "path" );

Array.prototype[ Symbol.asyncIterator ] = async function*() {
	for( const value of this[ Symbol.iterator ]() ) {
		yield value;
	}
};

module.exports.getFixtures = function( directory ) {
	const fixtures = new Map();
	
	for( const file of fs.readdirSync( path.normalize( "spec/fixtures/" + directory ) ) ) {
		const extension = path.extname( file );
		if( extension === ".js" || extension === ".json" ) {
			fixtures.set( path.basename( file, extension ), require( `./fixtures/${ directory }/${ file }` ) );
		}
	}
	
	return fixtures;
};