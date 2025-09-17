const { Targetables } = require('@magento/pwa-buildpack');

function Intercept(targets) {
  const targetables = Targetables.using(targets);

  const PriceSummary = targetables.reactComponent(
    '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js'
  );

  PriceSummary.insertAfterJSX(
    'DiscountSummary',
    `
    >
    <li className={classes.lineItems}>
      <Cupons 
        cartId={talonProps.cartId} 
        couponAlreadyApplied={talonProps.couponAlreadyApplied} 
        couponCode={talonProps.couponAlreadyApplied ? talonProps.flatData?.discounts?.[0]?.label : ''} 
      />
    </li>
    <
  `
  );

  PriceSummary.addImport("import { Cupons } from 'apply-coupun-pwa'");

  const talonsTarget = targets.of('@magento/peregrine').talons;
talonsTarget.tap(talonWrapperConfig => {
  console.log('Available talons:', Object.keys(talonWrapperConfig.CartPage || {}));
});
const path = require('path');


  talonsTarget.tap((talonWrapperConfig) => {
    talonWrapperConfig.CartPage.PriceSummary.usePriceSummary.wrapWith(
      
      require.resolve(path.join(
    __dirname,
    'src/talons/getCartId.js'
  ))
    );
  });
};
module.exports = Intercept;