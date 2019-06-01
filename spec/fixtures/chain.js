module.exports = [
	[
		"chains one empty array",
		[ [] ],
		[]
	],
			[
		"chains two empty arrays",
		[ [], [] ],
		[]
	],
	[
		"chains one array",
		[ [ 1, 2, 3 ] ],
		[ 1, 2, 3 ]
	],
	[
		"chains two arrays",
		[ [ "a", "b", "c" ], [ 1, 2, 3 ] ],
		[ "a", "b", "c", 1, 2, 3 ]
	],
	[
		"chains an array with an empty array",
		[ [ 1, 2, 3 ], [] ],
		[ 1, 2, 3 ]
	],
	[
		"chains an empty array with an array",
		[ [], [ 1, 2, 3 ] ],
		[ 1, 2, 3 ]
	],
	[
		"chains three arrays",
		[ [ "a", "b", "c" ], [ 1, 2, 3 ], [ "d", "e", "f" ] ],
		[ "a", "b", "c", 1, 2, 3, "d", "e", "f" ]
	],
	[
		"chains three arrays with an empty array",
		[ [ "a", "b", "c" ], [], [ "d", "e", "f" ] ],
		[ "a", "b", "c", "d", "e", "f" ]
	]
];