module.exports = [
	[
		"filters an empty array",
		[ [], value => true ],
		[]
	],
	[
		"filters out even numbers",
		[ [ 1, 2, 3 ], value => value & 1 ],
		[ 1, 3 ]
	],
	[
		"filters out even indexed numbers",
		[ [ 1, 2, 3 ], ( value, index ) => index & 1 ],
		[ 2 ]
	]
];