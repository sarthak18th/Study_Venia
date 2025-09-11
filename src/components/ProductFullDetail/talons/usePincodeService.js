// usePincodeService.ts
import { useLazyQuery } from '@apollo/client';
import { GET_TRANSIT_AVAILABILITY_AND_DURATION } from './getpincode';
import { useCallback } from 'react';

export function usePincodeService() {
  const [getDateQuery, { loading, error }] = useLazyQuery(
    GET_TRANSIT_AVAILABILITY_AND_DURATION,
    { fetchPolicy: 'no-cache' }
  );

  // This returns a promise that resolves when query completes
  const checkServiceAvailability = useCallback(
    (pincode, sku) =>
      new Promise((resolve, reject) => {
        getDateQuery({
          variables: { pincode, sku },
          onCompleted: (res) =>
            resolve(res.getTransitAvailabilityAndDuration),
          onError: reject,
        });
      }),
    [getDateQuery]
  );

  return { checkServiceAvailability, loading, error };
}
