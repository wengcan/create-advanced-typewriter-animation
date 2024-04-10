import fs from 'node:fs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
// import { babel } from '@rollup/plugin-babel';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const getVersionFromTag = () => {
    const tagRef = process.env.GITHUB_REF;
    if (tagRef && tagRef.startsWith('refs/tags/')) {
        return tagRef.slice('refs/tags/'.length);
    }
    return null;
};

const tagVersion = getVersionFromTag();

const version = tagVersion || packageJson.version;


const year = new Date().getFullYear();
const banner = `//${packageJson.name}  v${version} Copyright (c) ${year} ${packageJson.author}`
const inputSource = packageJson.source;
const outputFileName = 'bundle';
const createConfig = ({es5, browser = true, minified = true, ...config }) => {
    return   {
        input: inputSource,
        output: {
            ...config.output,
            banner
        },
        plugins: [
            typescript(),
            // ...(es5 ? [babel({
            //     babelHelpers: 'bundled',
            //     presets: ['@babel/preset-env']
            // })] : []),    
            ...(minified ? [
                terser({
                    format: {
                        preamble: banner
                    }
                })
            ] : []), 
            ...(config.plugins || []),       
        ]
    }
}

export default [
    createConfig({
        output: {
            file: `dist/esm/${outputFileName}.js`,
            format: "esm",
            exports: "named"
        }
    }),
    createConfig({
        es5: true,
        minified: true,
        output: {
          file: `dist/umd/${outputFileName}.js`,
          format: "umd",
          exports: "default",
          name: 'createAdvancedTypingAnimation'
        }
    })
];