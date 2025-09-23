import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Info } from 'react-feather';
import { string, number, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import Price from '@magento/venia-ui/lib/components/Price';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';
import { useGalleryItem } from '@magento/peregrine/lib/talons/Gallery/useGalleryItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import Image from '@magento/venia-ui/lib/components/Image/index';
import GalleryItemShimmer from '@magento/venia-ui/lib/components/Gallery/item.shimmer';
import defaultClasses from '@magento/venia-ui/lib/components/Gallery/item.module.css';
import WishlistGalleryButton from '@magento/venia-ui/lib/components/Wishlist/AddToListButton/index';

import AddToCartButton from '@magento/venia-ui/lib/components/Gallery/addToCartButton';
// eslint-disable-next-line no-unused-vars
import Rating from '@magento/venia-ui/lib/components/Rating/index';
import { useStyle } from '@magento/venia-ui/lib/classify';
import QuickView from './quickView';

// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const GalleryItem = props => {
     const [hovered, setHovered] = useState(false);
    const {
        handleLinkClick,
        item,
        itemRef,
        wishlistButtonProps,
        isSupportedProductType
    } = useGalleryItem(props);
    console.log('item',item)
    const { storeConfig } = props;
    console.log('storeConfig',storeConfig)

    const productUrlSuffix = storeConfig && storeConfig.product_url_suffix;

    const classes = useStyle(defaultClasses, props.classes);
    
    if (!item) {
        return <GalleryItemShimmer classes={classes} />;
    }

    // eslint-disable-next-line no-unused-vars
    const { name, price_range, small_image, url_key, rating_summary } = item;

    const { url: smallImageURL } = small_image;
    const productLink = resourceUrl(`/${url_key}${productUrlSuffix || ''}`);

    const wishlistButton = wishlistButtonProps ? (
        <WishlistGalleryButton {...wishlistButtonProps} />
    ) : null;
    
    const addButton = isSupportedProductType ? (
        <div >

        <AddToCartButton item={item} urlSuffix={productUrlSuffix} />
       
        </div>
        
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'galleryItem.unavailableProduct'}
                    defaultMessage={'Currently unavailable for purchase.'}
                />
            </p>
        </div>
    );
    const currencyCode =
        price_range?.maximum_price?.final_price?.currency ||
        item.price.regularPrice.amount.currency;

    // fallback to regular price when final price is unavailable
    const priceSource =
        (price_range?.maximum_price?.final_price !== undefined &&
        price_range?.maximum_price?.final_price !== null
            ? price_range.maximum_price.final_price
            : item.prices.maximum.final) ||
        (price_range?.maximum_price?.regular_price !== undefined &&
        price_range?.maximum_price?.regular_price !== null
            ? price_range.maximum_price.regular_price
            : item.prices.maximum.regular);
    const priceSourceValue = priceSource.value || priceSource;

    // Hide the Rating component until it is updated with the new look and feel (PWA-2512).
    const ratingAverage = null;
    // const ratingAverage = rating_summary ? (
    //     <Rating rating={rating_summary} />
    // ) : null;

    return (
        <div onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)} data-cy="GalleryItem-root" className={classes.root} ref={itemRef}>
            <Link
                aria-label={name}
                onClick={handleLinkClick}
                to={productLink}
                className={classes.images}
            >
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        loaded: classes.imageLoaded,
                        notLoaded: classes.imageNotLoaded,
                        root: classes.imageContainer
                    }}
                    height={IMAGE_HEIGHT}
                    resource={smallImageURL}
                    widths={IMAGE_WIDTHS}
                />
                {ratingAverage}
            </Link>
            <Link
                onClick={handleLinkClick}
                to={productLink}
                className={classes.name}
                data-cy="GalleryItem-name"
            >
                <span>{name}</span>
            </Link>

            <div data-cy="GalleryItem-price" className={classes.price}>
                <Price value={priceSourceValue} currencyCode={currencyCode} />
            </div>

            <div className={classes.actionsContainer}>
                {' '}
                {addButton}
                {wishlistButton}
            </div>
          
                 <QuickView hovered={hovered}item={item.url_key}></QuickView>

        
        </div>
    );
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageLoaded: string,
        imageNotLoaded: string,
        imageContainer: string,
        images: string,
        name: string,
        price: string,
        root: string
    }),
    item: shape({
        id: number.isRequired,
        uid: string.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string.isRequired
        }),
        stock_status: string.isRequired,
        __typename: string.isRequired,
        url_key: string.isRequired,
        sku: string.isRequired,
        price_range: shape({
            maximum_price: shape({
                final_price: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }),
                regular_price: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }).isRequired,
                discount: shape({
                    amount_off: number.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }),
    storeConfig: shape({
        magento_wishlist_general_is_enabled: string.isRequired,
        product_url_suffix: string
    })
};

export default GalleryItem;
