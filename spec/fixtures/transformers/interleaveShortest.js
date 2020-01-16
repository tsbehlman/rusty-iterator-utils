module.exports = [
	[
		"interleaves nothing",
		[],
		[]
	],
	[
		"interleaves one empty array",
		[ [] ],
		[]
	],
	[
		"interleaves two empty arrays",
		[ [], [] ],
		[]
	],
	[
		"interleaves one array",
		[ [ 1, 2, 3 ] ],
		[ 1, 2, 3 ]
	],
	[
		"interleaves two arrays of equal size",
		[ [ 1, 3, 5 ], [ 2, 4, 6 ] ],
		[ 1, 2, 3, 4, 5, 6 ]
	],
	[
		"interleaves two arrays of decreasing size",
		[ [ 1, 3, 5 ], [ 2, 4 ] ],
		[ 1, 2, 3, 4, 5 ]
	],
	[
		"interleaves two arrays of increasing size",
		[ [ 1, 3 ], [ 2, 4, 6 ] ],
		[ 1, 2, 3, 4 ]
	],
	[
		"interleaves an array with an empty array",
		[ [ 1, 2, 3 ], [] ],
		[ 1 ]
	],
	[
		"interleaves an empty array with an array",
		[ [], [ 1, 2, 3 ] ],
		[]
	],
	[
		"interleaves three arrays",
		[ [ "a", "b", "c" ], [ 1, 2, 3 ], [ "d", "e", "f" ] ],
		[ "a", 1, "d", "b", 2, "e", "c", 3, "f" ]
	]
];