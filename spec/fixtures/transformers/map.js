module.exports = [
	[
		"maps an empty array",
		[ [], value => value ],
		[]
	],
	[
		"maps an array of values to identical values",
		[ [ 1, 2, 3 ], value => value ],
		[ 1, 2, 3 ]
	],
	[
		"maps an array of values to incremented values",
		[ [ 1, 2, 3 ], value => value + 1 ],
		[ 2, 3, 4 ]
	],
	[
		"maps an array of values to new values based on index",
		[ [ "a", "b", "c" ], ( value, index ) => value + index ],
		[ "a0", "b1", "c2" ]
	]
];