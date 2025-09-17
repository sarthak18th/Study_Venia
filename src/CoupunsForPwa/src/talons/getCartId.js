import { useCartContext } from '@magento/peregrine/lib/context/cart';

const getCartId = original => {
  return function usePriceSummary(props, ...restArgs) {
    const talonProps = original(props, ...restArgs);

    const [{ cartId }] = useCartContext();

    const couponAlreadyApplied =
      talonProps.flatData?.discounts &&
      talonProps.flatData.discounts.length > 0;

    return {
      ...talonProps,
      cartId,
      couponAlreadyApplied
    };
  };
};

export default getCartId;
