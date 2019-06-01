module.exports = [
	[
		"skips 0 items in an empty array",
		[ [], 0 ],
		[]
	],
	[
		"skips 0 items in an array",
		[ [ "a", "b", "c" ], 0 ],
		[ "a", "b", "c" ]
	],
	[
		"skips 0 items in an array if no skips specified",
		[ [ "a", "b", "c" ] ],
		[ "a", "b", "c" ]
	],
	[
		"skips 0 items in an array if negative skips specified",
		[ [ "a", "b", "c" ], -2 ],
		[ "a", "b", "c" ]
	],
	[
		"skips 1 item in an array",
		[ [ "a", "b", "c" ], 1 ],
		[ "b", "c" ]
	],
	[
		"skips 2 items in an array",
		[ [ "a", "b", "c" ], 2 ],
		[ "c" ]
	]
];