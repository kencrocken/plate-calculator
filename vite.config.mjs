import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig(() => {
	if (process.env.BUILD_TARGET === 'lib') {
		return {
			build : {
				emptyOutDir : true,
				lib : {
					entry : resolve(__dirname, 'src/index.js'),
					name : 'plateCalculator',
					formats : ['es', 'cjs', 'umd'],
					fileName : (format) => {
						if (format === 'es') {
							return 'plate-calculator.mjs';
						}

						if (format === 'cjs') {
							return 'plate-calculator.cjs';
						}

						return 'plate-calculator.umd.js';
					},
				},
				outDir : 'dist',
				sourcemap : true,
			},
			publicDir : false,
		};
	}

	return {
		server : {
			open : false,
		},
	};
});
