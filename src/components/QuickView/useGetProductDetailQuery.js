import { useLazyQuery } from '@apollo/client';

import { useCallback } from 'react';
import { GET_PRODUCT_FULL_DETAIL } from './getProductDetail';
import { GET_PRODUCT_DETAIL_QUERY } from '@magento/peregrine/lib/talons/RootComponents/Product/product.gql';
export function useGetProductDetail() {
  const [getProductDetail, { loading, error }] = useLazyQuery(
    GET_PRODUCT_DETAIL_QUERY,
    { fetchPolicy: 'no-cache' }
  );

  // This returns a promise that resolves when query completes
  const checkProduct = useCallback(
    (urlKey) =>
      new Promise((resolve, reject) => {
        getProductDetail({
          variables: {urlKey},
          onCompleted: (res) =>
            resolve(res),
          onError: reject,
        });
      }),
    [getProductDetail]
  );

  return { checkProduct, loading, error };
}