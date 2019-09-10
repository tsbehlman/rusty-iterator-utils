module.exports = [
	[
		"reduces an empty array to the initial accumulator value",
		[ [], acc => acc, 0 ],
		0
	],
	[
		"reduces an array of numbers to a constant value",
		[ [ 1, 2, 3 ], acc => acc, 8 ],
		8
	],
	[
		"reduces an array of numbers to a sum",
		[ [ 1, 2, 3 ], ( acc, value ) => acc + value, 0 ],
		6
	],
	[
		"reduces an array of strings to a concatenated string",
		[ [ "a", "b", "c" ], ( acc, value ) => acc + value, "" ],
		"abc"
	],
	[
		"reduces an array of strings to a sum of their array indices",
		[ [ "a", "<", ":" ], ( acc, value, index ) => acc + index, 0 ],
		3
	]
];