const defaultWeightSets = {
	POUNDS : [45, 35, 25, 10, 5, 2.5],
	METRIC : [1.25, 25, 20, 16, 10, 7.5, 5, 2.5],
};

const calculate = (targetWeight, opts = {}) => {
	const options = Object.assign({
		set : defaultWeightSets.POUNDS,
		barbellWeight : 45,
		availablePlates : {},
		returnClosest : true,
		addedPlates : [],
	}, opts);

	let currentWeight = options.barbellWeight;

	options.set = options.set.concat(options.addedPlates);

	options.set.sort((a, b) => (a - b)).reverse();

	const result = {
		plates : [],
	};

	const multiplier = 2;

	options.set.forEach((plateWeight) => {
		let limitation = options.availablePlates[plateWeight];

		if (limitation % multiplier) {
			limitation -= 1;
		}

		if (currentWeight < targetWeight && (limitation == null || limitation >= multiplier)) {
			const testWeight = plateWeight;

			if (testWeight <= targetWeight - currentWeight) {
				let qty = Math.floor((targetWeight - currentWeight) / testWeight);

				if (qty % multiplier) {
					qty -= 1;
				}

				if (limitation && qty > limitation) {
					qty = limitation;
				}

				if (qty) {
					result.plates.push({
						plateWeight,
						qty,
					});
				}

				currentWeight += testWeight * qty;
			}
		}
	});

	if (options.returnClosest === false && currentWeight !== +targetWeight) {
		throw new Error(`Achieving ${targetWeight} is impossible with current weight set and/or limitations. Closest possible weight is ${currentWeight}`);
	}

	result.closestWeight = currentWeight;

	return result;
};

export default {
	weightSets : defaultWeightSets,
	calculate,
};
