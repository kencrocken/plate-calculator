import plateCalculator from '../src/index.js';

const form = document.querySelector('[data-demo-form]');
const resultOutput = document.querySelector('[data-result-output]');
const errorOutput = document.querySelector('[data-error-output]');

const parseAddedPlates = (value) => {
	if (!value.trim()) {
		return [];
	}

	return value
		.split(',')
		.map((entry) => Number.parseFloat(entry.trim()))
		.filter((entry) => !Number.isNaN(entry));
};

const parseAvailablePlates = (value) => {
	if (!value.trim()) {
		return {};
	}

	return value.split(',').reduce((availablePlates, entry) => {
		const [plateWeight, qty] = entry.split(':').map((part) => part.trim());
		const parsedWeight = Number.parseFloat(plateWeight);
		const parsedQty = Number.parseInt(qty, 10);

		if (!Number.isNaN(parsedWeight) && !Number.isNaN(parsedQty)) {
			availablePlates[parsedWeight] = parsedQty;
		}

		return availablePlates;
	}, {});
};

const renderResult = (payload) => {
	resultOutput.textContent = JSON.stringify(payload, null, 2);
};

const parseRequiredNumber = (value, fieldName) => {
	const parsedValue = Number.parseFloat(value);

	if (Number.isNaN(parsedValue)) {
		throw new Error(`${fieldName} must be a valid number.`);
	}

	return parsedValue;
};

form.addEventListener('submit', (event) => {
	event.preventDefault();
	errorOutput.textContent = '';

	const formData = new FormData(form);
	const addedPlates = parseAddedPlates(formData.get('addedPlates'));
	const availablePlates = parseAvailablePlates(formData.get('availablePlates'));
	const returnClosest = formData.get('returnClosest') === 'on';

	try {
		const result = plateCalculator.calculate(
			parseRequiredNumber(formData.get('targetWeight'), 'Target weight'),
			{
				barbellWeight : parseRequiredNumber(formData.get('barbellWeight'), 'Barbell weight'),
				addedPlates,
				availablePlates,
				returnClosest,
			},
		);

		renderResult(result);
	} catch (error) {
		resultOutput.textContent = '';
		errorOutput.textContent = error.message;
	}
});

renderResult(plateCalculator.calculate(225));
