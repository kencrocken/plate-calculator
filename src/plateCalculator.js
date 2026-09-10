const defaultWeightSets = {
	POUNDS : [45, 35, 25, 10, 5, 2.5],
	METRIC : [1.25, 25, 20, 16, 10, 7.5, 5, 2.5],
};

/**
 * Calculates how many plates to put on a bar to reach a target weight.
 * @param {number} targetWeight What you want the bar to weigh.
 * @param {Object} [opts] Options for the calculation.
 * @param {Array<number>} [opts.set=defaultWeightSets.POUNDS] Plate weights to use.
 * @param {number} [opts.barbellWeight=45] Weight of the barbell.
 * @param {Object} [opts.availablePlates={}] Plate counts keyed by plate weight.
 * @param {boolean} [opts.returnClosest=true] Whether to return the closest possible weight.
 * @param {Array<number>} [opts.addedPlates=[]] Extra plate weights to append to the set.
 * @returns {{plates: Array<{plateWeight: number, qty: number}>, closestWeight: number}}
 */
const calculate = (targetWeight, opts = {}) => {
	const options = Object.assign({
		set : defaultWeightSets.POUNDS,
		barbellWeight : 45,
		availablePlates : {},
		returnClosest : true,
		addedPlates : [],
	}, opts);

	let currentWeight = options.barbellWeight;

	const plateSet = options.set.concat(options.addedPlates).sort((a, b) => (b - a));

	const result = {
		plates : [],
	};

	const multiplier = 2;

	plateSet.forEach((plateWeight) => {
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
		if (currentWeight > +targetWeight) {
			throw new Error(`Target weight ${targetWeight} is below the barbell weight of ${options.barbellWeight}.`);
		}

		throw new Error(`Achieving ${targetWeight} is impossible with current weight set and/or limitations. Closest possible weight is ${currentWeight}`);
	}

	result.closestWeight = currentWeight;

	return result;
};

export default {
	weightSets : defaultWeightSets,
	calculate,
};
