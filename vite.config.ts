import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        clearMocks: true,
        coverage: {
            exclude: ['src/**/index.ts', '**/*.d.ts'],
            include: ['src/**/*.{ts,tsx}'],
            reporter: ['text', 'text-summary', 'lcov'],
        },
        css: {
            modules: {
                classNameStrategy: 'non-scoped',
            },
        },
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts',
    },
})
