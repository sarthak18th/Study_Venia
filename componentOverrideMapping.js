// componentOverrideMapping.js
const veniaUi = '@magento/venia-ui';

module.exports = {
    
    
    [`@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods.js`]:
        'src/perigrine/CheckoutPage/usePaymentMethod.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethods.js`]:
        'src/components/CheckoutPage/paymentMethod.js',
    [`@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage.js`]:
        'src/perigrine/CheckoutPage/useCheckoutPage.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.js`]:
    'src/components/CheckoutPage/checkoutPage.js',
    [`@magento/venia-ui/lib/components/ProductImageCarousel/carousel.js`]:
    'src/components/ImageZoomer/carousel.js',
    [`@magento/venia-ui/lib/components/Gallery/item.js`]:
    'src/components/QuickView/item.js',
    // [`@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js`]:"src/CoupunsForPwa/ProductFullDetail/productFullDetail.js",
// [`@magento/venia-ui/lib/components/Dialog/dialog.js`]:'src/components/QuickView/dialog.js'

};
