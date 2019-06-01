module.exports = [
	[
		"enumerates an empty array",
		[ [] ],
		[]
	],
	[
		"enumerates one array",
		[ [ "a", "b", "c" ] ],
		[ [ 0, "a" ], [ 1, "b" ], [ 2, "c" ] ]
	]
];