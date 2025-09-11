// componentOverrideMapping.js
const veniaUi = '@magento/venia-ui';

module.exports = {
    
    [`@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js`]:
        'src/components/CheckoutPage/priceSummary.js',
    [`@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary.js`]:
        'src/perigrine/OrderSummary/usePriceSummary.js',
    [`@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods.js`]:
        'src/perigrine/CheckoutPage/usePaymentMethod.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethods.js`]:
        'src/components/CheckoutPage/paymentMethod.js',
    [`@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage.js`]:
        'src/perigrine/CheckoutPage/useCheckoutPage.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.js`]:
    'src/components/CheckoutPage/checkoutPage.js'


};
