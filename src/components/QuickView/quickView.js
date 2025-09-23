import React, { useEffect, useState } from 'react'
// import ProductFullDetail from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail'
import Dialog from '@magento/venia-ui/lib/components/Dialog'
import Button from '@magento/venia-ui/lib/components/Button'
import { useGetProductDetail } from './useGetProductDetailQuery';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import './quickView.css'

import ProductFullDetail from '../../CoupunsForPwa/ProductFullDetail/productFullDetail';
function QuickView({ item ,hovered}) {
    console.log(item)
    const [product, setProduct] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const { checkProduct, loading } = useGetProductDetail()
    const getproduct = async () => {
        const res = await checkProduct(item)
        console.log('res', res.products.items[0])
        if (res) {
            setProduct(res?.products?.items[0])
        }
    }

    console.log('sddsd', product)
    console.log(loading)
    return (

        <div>
            {hovered && <div>

                <Button onClick={() => {
                    getproduct()
                    setIsOpen(true)
                }}>
                    Quick View
                </Button>
            </div>}
            <Dialog formProps={''} shouldShowButtons={false} classes={{ dialog:"dialog",header:'ui' }} isOpen={isOpen} onCancel={() => setIsOpen(false)}>


                <segment className='custom-dialog-wrapper'>

                    {product && product.id ? (
                        <ProductFullDetail product={product}  />
                    ) : (
                        <ProductOptionsShimmer></ProductOptionsShimmer>
                    )}
                </segment>

            </Dialog>
        </div>
    )
}

export default QuickView