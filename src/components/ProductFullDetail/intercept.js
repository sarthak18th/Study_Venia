const { Targetables } = require('@magento/pwa-buildpack');

function Intercept(targets) {
  const targetables = Targetables.using(targets);

  const ProductFullDetail = targetables.reactComponent(
    '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
  );

  // Inject <PincodeCheck /> after the <Form> inside ProductFullDetail
  ProductFullDetail.insertAfterJSX(
    'Form',
    '<PincodeCheck sku={product?.sku} />'
  );

  // Add import statement for your component
  ProductFullDetail.addImport(
    "import { PincodeCheck } from 'pincode-layout'"
  );
}

module.exports = Intercept;
