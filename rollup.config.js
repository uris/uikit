import fs from 'node:fs';
import path from 'node:path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import stripCode from 'rollup-plugin-strip-code';

const buildInputs = () => {
	const inputs = {
		index: 'src/index.ts',
		hooks: 'src/hooks/index.ts',
		providers: 'src/providers/index.ts',
		stores: 'src/stores/index.ts',
		theme: 'src/theme/index.ts',
	};

	const uikitDir = path.resolve('src/uikit');
	for (const entry of fs.readdirSync(uikitDir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const componentEntry = path.join(uikitDir, entry.name, 'index.ts');
		if (fs.existsSync(componentEntry)) {
			inputs[`uikit/${entry.name}`] = componentEntry;
		}
	}

	const hooksDir = path.resolve('src/hooks');
	for (const entry of fs.readdirSync(hooksDir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const hookName = entry.name;
		const tsEntry = path.join(hooksDir, hookName, `${hookName}.ts`);
		const tsxEntry = path.join(hooksDir, hookName, `${hookName}.tsx`);
		if (fs.existsSync(tsEntry)) {
			inputs[`hooks/${hookName}`] = tsEntry;
			continue;
		}
		if (fs.existsSync(tsxEntry)) {
			inputs[`hooks/${hookName}`] = tsxEntry;
		}
	}

	const providersDir = path.resolve('src/providers');
	for (const fileName of fs.readdirSync(providersDir)) {
		if (!fileName.endsWith('.ts') && !fileName.endsWith('.tsx')) continue;
		if (fileName === 'index.ts') continue;
		if (fileName.includes('.stories.')) continue;
		const providerName = fileName.replace(/\.(ts|tsx)$/, '');
		inputs[`providers/${providerName}`] = path.join(providersDir, fileName);
	}

	const storesDir = path.resolve('src/stores');
	if (fs.existsSync(storesDir)) {
		for (const entry of fs.readdirSync(storesDir, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const storeEntry = path.join(storesDir, entry.name, 'index.ts');
			if (fs.existsSync(storeEntry)) {
				inputs[`stores/${entry.name}`] = storeEntry;
			}
		}
	}

	const themeEntries = [
		['theme/colors', 'src/theme/colors/colors.ts'],
		['theme/corners', 'src/theme/corners/corners.ts'],
		['theme/type', 'src/theme/type/type.ts'],
		['theme/themes', 'src/theme/themes.ts'],
	];
	for (const [outputName, inputPath] of themeEntries) {
		if (fs.existsSync(path.resolve(inputPath))) {
			inputs[outputName] = inputPath;
		}
	}

	return inputs;
};

// Dynamic import of rollup-plugin-visualizer to avoid bundling it in production
const rollup = async () => {
	const { visualizer } = await import('rollup-plugin-visualizer');

	return {
		input: buildInputs(),
		output: [
			{
				dir: 'dist/cjs',
				format: 'cjs',
				sourcemap: false,
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js',
			},
			{
				dir: 'dist/esm',
				format: 'esm',
				sourcemap: false,
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js',
			},
		],
		external: ['react', 'react-dom', 'motion'],
		plugins: [
			stripCode({
				start_comment: 'START.DEBUG',
				end_comment: 'END.DEBUG',
			}),
			peerDepsExternal(),
			resolve({ extensions: ['.js', '.ts', '.tsx'] }),
			commonjs(),
			babel({
				exclude: ['node_modules/**', 'src/stories/**'],
				presets: ['@babel/preset-react'],
				babelHelpers: 'bundled',
			}),
			typescript({
				tsconfig: './tsconfig.rollup.json',
				exclude: ['src/stories/**', '**/*.stories.ts', '**/*.stories.tsx'],
			}),
			postcss(),
			svgr({
				icon: true, // Optimize for icon size
				svgo: true, // Enable SVGO for optimizing SVGs
				svgoConfig: {
					// Custom SVGO config (optional)
					plugins: [{ name: 'removeViewBox', active: false }],
				},
			}),
			// Export SVGs and PNgs as URLs for assets
			// include public path to make sure these get refenced ok
			url({
				include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
				limit: 0, // Always copy images as assets
				fileName: 'assets/[name][extname]',
				emitFiles: true,
				publicPath: '../', // Change to navigate from dist/index.js to dist/assets
			}),
			visualizer({
				filename: 'reports/package-size-visualizer.html',
				gzipSize: true,
				brotliSize: true,
			}),
		],
	};
};
export default rollup;
