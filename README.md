# plate-calculator

A small library that calculates how many plates you need to put on a barbell to reach a target weight. It can also take into account the plates you actually own.

## Project structure

- `src/` - library source
- `demo/` - Vite demo script
- `index.html` - Vite demo page
- `spec/` - Jasmine tests
- `dist/` - generated library bundles

## Scripts

- `npm run dev` - start the Vite demo server
- `npm run build` - build the library bundles into `dist/`
- `npm run build:demo` - build the demo into `demo-dist/`
- `npm run preview` - preview the built demo
- `npm test` - run the Jasmine test suite

## Installation

### npm

```bash
npm install plate-calculator
```

Published package consumers install the built artifacts directly from `dist/`. The `files` field controls that published payload, and the `prepare` script ensures the bundles exist before publishing from this repository.

### Browser bundle

Run `npm run build`, then include `dist/plate-calculator.umd.js` in your page.

## Usage

The package exposes a default export named `plateCalculator` with a `calculate` function.

```js
import plateCalculator from 'plate-calculator';

const result = plateCalculator.calculate(225);
```

CommonJS consumers can still use the package root, which resolves to the generated `dist/plate-calculator.cjs` bundle:

```js
const plateCalculator = require('plate-calculator');
```

The calculate function signature is:

```js
plateCalculator.calculate(weight, options);
```

### Options

Default options:

```js
{
  set: plateCalculator.weightSets.POUNDS,
  barbellWeight: 45,
  availablePlates: {},
  returnClosest: true,
  addedPlates: [],
}
```

#### `set`
An array of plate sizes. Use this to replace the default plate list entirely.

#### `barbellWeight`
The weight of the barbell. The default is a 45 lb olympic bar.

#### `availablePlates`
An object describing how many plates are available for each weight.

```js
{ 45: 2, 35: 0 }
```

`null` or `undefined` means unlimited availability.

#### `returnClosest`
When `true`, the calculator returns the closest achievable weight if the exact value is impossible. When `false`, it throws an error instead.

#### `addedPlates`
An array of additional plate sizes to append to the current set.

```js
addedPlates: [0.5]
```

### Return value

```json
{
  "plates": [{ "plateWeight": 45, "qty": 4 }],
  "closestWeight": 225
}
```

## Browser global usage

After building the library, include the generated UMD bundle directly from a built or published `dist/` folder:

```html
<script src="./dist/plate-calculator.umd.js"></script>
<script>
  const result = window.plateCalculator.calculate(225);
  console.log(result);
</script>
```

The generated UMD bundle exposes `window.plateCalculator`.

## Local demo

Run:

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal to interact with the demo app.
