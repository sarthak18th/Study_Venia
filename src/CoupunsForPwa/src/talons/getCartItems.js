import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { APPLY_COUPON ,REMOVE_COUPUN} from './applyCouponQuery';

export function useCouponService() {
  const [applyCouponMutation, { loading, error }] = useMutation(APPLY_COUPON);

  const checkApplyCoupon = useCallback(
    async (cartId, couponCode) => {
      try {
        const { data } = await applyCouponMutation({
          variables: { cartId, couponCode }
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
    [applyCouponMutation]
  );

  return { checkApplyCoupon, loading, error };
}



export function removeCouponService() {
  const [removeCouponMutation, { loading, error }] = useMutation(REMOVE_COUPUN);

  const checkRemoveCoupon = useCallback(
    async (cartId) => {
      try {
        const { data } = await removeCouponMutation({
          variables: { cartId}
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
    [removeCouponMutation]
  );

  return { checkRemoveCoupon, loading, error };
}


