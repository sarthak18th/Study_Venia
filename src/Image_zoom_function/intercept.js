const path = require('path');
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');


module.exports = targets => {
//     console.log(path.dirname)
//   targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
//     Object.assign(compiler.options.resolve.alias, {
//       '@magento/venia-ui/lib/components/ProductImageCarousel':
//         path.resolve(__dirname, './src/components/ProductImageCarousel.js')
//     });
//   });

 targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });
};
