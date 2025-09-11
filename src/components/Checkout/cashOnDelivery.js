import { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/paymentMethods.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import React from 'react';

const CashOnDelivery = props => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        getPaymentMethodsQuery,
        setPaymentMethodOnCartMutation
    } = operations;
    const {
        onPaymentSuccess,
        onPaymentError,
        resetShouldSubmit,
        shouldSubmit,

    } = props;
    console.log(props)
    const [setPaymentMethod, { loading, error }] = useMutation(setPaymentMethodOnCartMutation)
    const [{ cartId }] = useCartContext();

    useEffect(() => {
        const runMutation = async () => {
            try {
                await setPaymentMethod({
                    variables: {
                        cartId,
                        paymentMethod: { code: 'cashondelivery' }
                    }
                });
                if (onPaymentSuccess) {
                    onPaymentSuccess();
                }
            } catch (err) {
                if (onPaymentError) {
                    onPaymentError(err);
                }
            } finally {
                resetShouldSubmit();
            }
        };

        if (shouldSubmit) {
            runMutation();
        }
    }, [shouldSubmit, resetShouldSubmit, onPaymentError, onPaymentSuccess, setPaymentMethod, cartId]);

    if (loading) {
        return <span>Applying Cash on Delivery...</span>;
    }

    if (error) {
        return <span>Error setting COD: {error.message}</span>;
    }

    

    return (
      
        <div>

        </div>
    );
};

export default CashOnDelivery;
