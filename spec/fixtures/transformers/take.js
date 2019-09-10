module.exports = [
	[
		"takes 0 items from an empty array",
		[ [], 0 ],
		[]
	],
	[
		"takes 0 items from an array",
		[ [ "a", "b", "c" ], 0 ],
		[]
	],
	[
		"takes 0 items from an array if no takes specified",
		[ [ "a", "b", "c" ] ],
		[]
	],
	[
		"takes 0 items from an array if negative takes specified",
		[ [ "a", "b", "c" ], -2 ],
		[]
	],
	[
		"takes 1 item from an array",
		[ [ "a", "b", "c" ], 1 ],
		[ "a" ]
	],
	[
		"takes 2 items from an array",
		[ [ "a", "b", "c" ], 2 ],
		[ "a", "b" ]
	]
];