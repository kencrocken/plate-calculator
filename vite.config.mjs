import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
	if (mode === 'library') {
		return {
			build : {
				assetsInlineLimit : Number.MAX_SAFE_INTEGER,
				cssCodeSplit : false,
				emptyOutDir : true,
				lib : {
					entry : resolve(rootDir, 'src/index.js'),
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
		build : {
			outDir : 'demo-dist',
		},
		server : {
			open : false,
		},
	};
});
