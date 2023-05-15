const { config, entry } = require('@esportsplus/rspack');


module.exports = ({ production: p }) => {
    let production = p !== 'false';

    return config.web({
        entry: {
            css: {
                variables: entry([
                    '@esportsplus/ui/css/components/variables.css',
                    'src/app/components/**/variables.scss',
                    '@esportsplus/ui/css/utilities/variables.css'
                ]),
                styles: entry([
                    'node_modules/@esportsplus/ui/css/{normalizer,fonts/montserrat,components/styles}.css',
                    'src/app/components/**/index.scss',
                    '@esportsplus/ui/css/utilities/styles.css'
                ])
            },
            js: {
                app: entry('src/app/{routes,bootstrap}/**/*.ts')
            }
        },
        mode: production ? 'production': 'development',
        use: ({ web }) => {
            web.html({
                title: 'Atomic Swap'
            });
            web.polyfill.node();
            web.server({
                server: 'https'
            });
        }
    });
};