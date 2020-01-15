module.exports = [
	[
		"paritions an empty iterable",
		[],
		value => true,
		[],
		[]
	],
	[
		"paritions one value to the true iterable",
		[ 1 ],
		value => true,
		[ 1 ],
		[]
	],
	[
		"paritions all values to the true iterable",
		[ 1, 2, 3 ],
		value => true,
		[ 1, 2, 3 ],
		[]
	],
	[
		"paritions one value to the false iterable",
		[ 1 ],
		value => false,
		[],
		[ 1 ]
	],
	[
		"paritions all values to the false iterable",
		[ 1, 2, 3 ],
		value => false,
		[],
		[ 1, 2, 3 ]
	],
	[
		"paritions into even and odd values",
		[ 1, 2, 3 ],
		value => ( value % 2 ) == 0,
		[ 2 ],
		[ 1, 3 ]
	],
	[
		"paritions into even and odd indexed values",
		[ "a", "b", "c" ],
		( value, index ) => ( index % 2 ) == 0,
		[ "a", "c" ],
		[ "b" ]
	],
	[
		"paritions into halves",
		[ 1, 2, 3, 4, 5, 6 ],
		( value, index ) => index < 3,
		[ 1, 2, 3 ],
		[ 4, 5, 6 ]
	],
	[
		"paritions into opposite halves",
		[ 1, 2, 3, 4, 5, 6 ],
		( value, index ) => index >= 3,
		[ 4, 5, 6 ],
		[ 1, 2, 3 ]
	]
];