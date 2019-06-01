module.exports = [
	[
		"windows an empty array",
		[ [], 1 ],
		[]
	],
	[
		"windows an empty array by 2",
		[ [], 2 ],
		[]
	],
	[
		"windows an array by 1",
		[ [ 1, 2, 3 ], 1 ],
		[ [ 1 ], [ 2 ], [ 3 ] ]
	],
	[
		"windows an array by 1 by default",
		[ [ 1, 2, 3 ] ],
		[ [ 1 ], [ 2 ], [ 3 ] ]
	],
	[
		"windows an array by 2",
		[ [ 1, 2, 3 ], 2 ],
		[ [ 1, 2 ], [ 2, 3 ] ]
	],
	[
		"windows an array by 3",
		[ [ 1, 2, 3 ], 3 ],
		[ [ 1, 2, 3 ] ]
	],
	[
		"windows an array of 4 by 3",
		[ [ 1, 2, 3, 4, 5, 6 ], 3 ],
		[ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ] ]
	]
];