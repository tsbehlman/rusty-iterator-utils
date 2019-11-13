module.exports = [
	[
		"chunks an empty array",
		[ [], 1 ],
		[]
	],
	[
		"chunks an empty array by 2",
		[ [], 2 ],
		[]
	],
	[
		"chunks an array by 1",
		[ [ 1, 2, 3 ], 1 ],
		[ [ 1 ], [ 2 ], [ 3 ] ]
	],
	[
		"chunks an array by 1 by default",
		[ [ 1, 2, 3 ] ],
		[ [ 1 ], [ 2 ], [ 3 ] ]
	],
	[
		"chunks an array by 2",
		[ [ 1, 2, 3, 4 ], 2 ],
		[ [ 1, 2 ], [ 3, 4 ] ]
	],
	[
		"chunks an array by 3",
		[ [ 1, 2, 3 ], 3 ],
		[ [ 1, 2, 3 ] ]
	],
	[
		"chunks an array of 4 by 3",
		[ [ 1, 2, 3, 4 ], 3 ],
		[ [ 1, 2, 3 ] ]
	],
	[
		"chunks an array of 5 by 3",
		[ [ 1, 2, 3, 4, 5 ], 3 ],
		[ [ 1, 2, 3 ] ]
	]
];