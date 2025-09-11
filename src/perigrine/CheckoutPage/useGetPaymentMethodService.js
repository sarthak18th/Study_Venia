import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { GET_PAYMENT_METHODS } from './getPaymentMethods';

export function useGetPYMethodsService() {
  const [getPaymentMethodsQuery, { loading, error }] = useLazyQuery(GET_PAYMENT_METHODS, {
    fetchPolicy: 'no-cache'
  });

  const getAllPaymentMethods = useCallback(
    (cartId) =>
      new Promise((resolve, reject) => {
        getPaymentMethodsQuery({
          variables: { cartId },
          onCompleted: res => resolve(res),
          onError: reject
        });
      }),
    [getPaymentMethodsQuery]
  );

  return { getAllPaymentMethods, loading, error };
}
