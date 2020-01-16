module.exports = [
	[
		"zips an empty array",
		[ [] ],
		[]
	],
	[
		"zips two empty arrays",
		[ [], [] ],
		[]
	],
	[
		"zips one array",
		[ [ 1, 2, 3 ] ],
		[ [ 1 ], [ 2 ], [ 3 ] ]
	],
	[
		"zips two arrays",
		[ [ "a", "b", "c" ], [ 1, 2, 3 ] ],
		[ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ]
	],
	[
		"zips an array into an array with more values",
		[ [ "a" ], [ 1, 2, 3 ] ],
		[ [ "a", 1 ], [ undefined, 2 ], [ undefined, 3 ] ]
	],
	[
		"zips an array into an array with fewer values",
		[ [ "a", "b", "c" ], [ 1 ] ],
		[ [ "a", 1 ], [ "b", undefined ], [ "c", undefined ] ]
	],
	[
		"zips three arrays",
		[ [ "a", "b", "c" ], [ 1, 2, 3 ], [ "d", "e", "f" ] ],
		[ [ "a", 1, "d" ], [ "b", 2, "e" ], [ "c", 3, "f" ] ]
	]
];