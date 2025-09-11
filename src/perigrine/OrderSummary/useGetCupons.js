import { useLazyQuery } from '@apollo/client';
import { GET_CUPONS } from '../../components/CheckoutPage/getCupons';
import { useCallback } from 'react';

export function useGetCuponService() {
  const [getCuponQuery, { loading, error }] = useLazyQuery(GET_CUPONS, {
    fetchPolicy: 'no-cache'
  });

  const getAllCupons = useCallback(
    () =>
      new Promise((resolve, reject) => {
        getCuponQuery({
          variables: { pageSize: 100, currentPage: 1 },
          onCompleted: res => resolve(res?.getCouponCodes),
          onError: reject
        });
      }),
    [getCuponQuery]
  );

  return { getAllCupons, loading, error };
}
