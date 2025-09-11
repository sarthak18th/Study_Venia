/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');
// const pincodeIntercept = require('@your-scope/pincode-layout');
function localIntercept(targets) {
    // pincodeIntercept(targets);

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    });

    // 👇 Add your COD payment type here
    targets.of('@magento/venia-ui').checkoutPagePaymentTypes.tap(payments => {
        payments.add({
            paymentCode: 'cashondelivery',         // must match Magento backend
            importPath: 'src/components/Checkout/cashOnDelivery'   // path to your COD component
        });
    });
}

module.exports = localIntercept;
