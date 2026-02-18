import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json";

export default {
	input: "src/index.ts",
	output: [
		{
			file: packageJson.main,
			format: "cjs",
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: "esm",
			sourcemap: true,
		},
	],
	external: ["react", "react-dom", "styled-components", "motion"],
	plugins: [
		peerDepsExternal(),
		resolve({ extensions: [".js", ".ts", ".tsx"] }),
		commonjs(),
		babel({
			exclude: ["node_modules/**", "src/stories/**"],
			presets: ["@babel/preset-react"],
			babelHelpers: "bundled",
		}),
		typescript({
			tsconfig: "./tsconfig.json",
			exclude: ["src/stories/**"],
		}),
		postcss(),
		svgr({
			icon: true, // Optimize for icon size
			svgo: true, // Enable SVGO for optimizing SVGs
			svgoConfig: {
				// Custom SVGO config (optional)
				plugins: [{ name: "removeViewBox", active: false }],
			},
		}),
		// Export SVGs and PNgs as URLs for assets
		// include public path to make sure these get refenced ok
		url({
			include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif"],
			limit: 0, // Always copy images as assets
			fileName: "assets/[name][extname]",
			emitFiles: true,
			publicPath: "../", // Change to navigate from dist/index.js to dist/assets
		}),
	],
};
