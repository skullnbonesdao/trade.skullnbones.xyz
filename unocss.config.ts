import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'
import presetDaisy from 'unocss-preset-daisy'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
    shortcuts: [],
    presets: [
        presetUno(),
        presetWind(),
        presetDaisy(),

        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
            collections: {
                carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default),
            },
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'DM Sans',
                serif: 'DM Serif Display',
                mono: 'DM Mono',
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
