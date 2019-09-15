require( "./TestUtils" );
const utils = require( "../src/index" );

describe( "forEach", () => {
	it( "does not call the callback", () => {
		const spy = jasmine.createSpy( "forEachCallback" );
		expect( utils.forEach( [], spy ) ).not.toBeDefined();
		expect( spy ).not.toHaveBeenCalled();
	} );
	
	it( "calls the callback once with the only element", () => {
		const spy = jasmine.createSpy( "forEachCallback" );
		expect( utils.forEach( [ "a" ], spy ) ).not.toBeDefined();
		expect( spy.calls.allArgs() ).toEqual( [ [ "a", 0 ] ] );
	} );
	
	it( "calls the callback once for each element", () => {
		const spy = jasmine.createSpy( "forEachCallback" );
		expect( utils.forEach( [ "a", "b", "c" ], spy ) ).not.toBeDefined();
		expect( spy.calls.allArgs() ).toEqual( [ [ "a", 0 ], [ "b", 1 ], [ "c", 2 ] ] );
	} );
} );

describe( "async forEach", () => {
	it( "throws an error when the iterable is empty and no initial value is passed", async () => {
		const spy = jasmine.createSpy( "forEachCallback" );
		expect( await utils.async.forEach( [], spy ) ).not.toBeDefined();
		expect( spy ).not.toHaveBeenCalled();
	} );
	
	it( "calls the callback once with the only element", async () => {
		const spy = jasmine.createSpy( "forEachCallback" );
		expect( await utils.async.forEach( [ "a" ], spy ) ).not.toBeDefined();
		expect( spy.calls.allArgs() ).toEqual( [ [ "a", 0 ] ] );
	} );
	
	it( "calls the callback once with the only element", async () => {
		const spy = jasmine.createSpy( "forEachCallback" );
		expect( await utils.async.forEach( [ "a", "b", "c" ], spy ) ).not.toBeDefined();
		expect( spy.calls.allArgs() ).toEqual( [ [ "a", 0 ], [ "b", 1 ], [ "c", 2 ] ] );
	} );
} );