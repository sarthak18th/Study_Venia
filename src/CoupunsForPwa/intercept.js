const { Targetables } = require('@magento/pwa-buildpack');
const { useCartContext } = require('@magento/peregrine/lib/context/cart');

module.exports = (targets) => {
  const targetables = Targetables.using(targets);

  // Target PriceSummary component
  const PriceSummary = targetables.reactComponent(
    '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js'
  );

  // Inject <Cupons /> after DiscountSummary
  PriceSummary.insertAfterJSX(
    'DiscountSummary',
    `
      <li className={classes.lineItems}>
        <Cupons 
          cartId={talonProps.cartId} 
          couponAlreadyApplied={talonProps.couponAlreadyApplied} 
          couponCode={talonProps.couponAlreadyApplied ? flatData?.discounts?.[0]?.label : ''} 
        />
      </li>
    `
  );

  PriceSummary.addImport("import { Cupons } from 'apply-coupun-pwa'");

  const talonsTarget = targets.of('@magento/peregrine').talons;

  talonsTarget.tap((talonWrapperConfig) => {
    talonWrapperConfig.CartPage.PriceSummary.usePriceSummary.wrapWith(
      (original, props) => {
        const talonProps = original(props);

        const [{ cartId }] = useCartContext();

        const couponAlreadyApplied =
          talonProps.flatData?.discounts &&
          talonProps.flatData.discounts.length > 0;

        return {
          ...talonProps,
          cartId,
          couponAlreadyApplied
        };
      }
    );
  });
};
