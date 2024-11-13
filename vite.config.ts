import * as path from 'node:path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { createVersionPlugin } from './scripts/plugins/version';

const {
    ENTRY = 'src/entry/core/index.ts',
} = process.env;

export default defineConfig({
    plugins: [
        nodeResolve({
            preferBuiltins: true,
        }),
        cleanup({
            comments: 'none',
            extensions: ['js', 'ts'],
        }),
        checker({
            typescript: true,
        }),
        dts({
            rollupTypes: true,
        }),
        createVersionPlugin(path.resolve(__dirname)),
    ],
    build: {
        target: 'esnext',
        lib: {
            entry: path.resolve(__dirname, ENTRY),
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        minify: false,
        outDir: path.resolve(__dirname, 'dist'),
    },
});
