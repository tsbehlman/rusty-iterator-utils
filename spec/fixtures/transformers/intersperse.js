module.exports = [
	[
		"intersperses an empty array",
		[ [], "a" ],
		[]
	],
	[
		"intersperses an array with one value",
		[ [ 1 ], "a" ],
		[ 1 ]
	],
	[
		"intersperses an array with two values",
		[ [ 1, 2 ], "a" ],
		[ 1, "a", 2 ]
	],
	[
		"intersperses an array with three values",
		[ [ 1, 2, 3 ], "a" ],
		[ 1, "a", 2, "a", 3 ]
	]
];