import React, { useEffect, useMemo, useRef, useState } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from 'react-feather';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';

import { useStyle } from '@magento/venia-ui/lib/classify';
import AriaButton from '@magento/venia-ui/lib/components/AriaButton';
import Icon from '@magento/venia-ui/lib/components/Icon/index';
import Image from '@magento/venia-ui/lib/components/Image/index';
import defaultClasses from '@magento/venia-ui/lib/components/ProductImageCarousel/carousel.module.css';
import Thumbnail from '@magento/venia-ui/lib/components/ProductImageCarousel/thumbnail';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactImageZoom from "react-image-zoom";
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import "./index.css"

const IMAGE_WIDTH = 640;

/**
 * Carousel component for product images
 * Carousel - Component that holds number of images
 * where typically one image visible, and other
 * images can be navigated through previous and next buttons
 *
 * @typedef ProductImageCarousel
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React carousel component that displays a product image
 */
const ProductImageCarousel = props => {
    const { images } = props;
    const { formatMessage } = useIntl();
    const talonProps = useProductImageCarousel({
        images,
        imageWidth: IMAGE_WIDTH
    });

    const {
        currentImage,
        activeItemIndex,
        altText,
        handleNext,
        handlePrevious,
        handleThumbnailClick,
        sortedImages
    } = talonProps;



    const [isOpen, setIsOpen] = useState(false)
    // create thumbnail image component for every images in sorted order
    const propsForZoom = {
        img: `https://mcstaging.heydude.in/media/catalog/product${currentImage.file}`,
        // width: 400,       // source image width
        // zoomWidth: 200,   // zoom window width
        // height: 400,        // make source square if possible

        scale: 0.5,
        offset: { horizontal: 20, vertical: 0 },
        zoomPosition: "right",
        zoomStyle: `
            position: absolute; 
            width: 400px; 
            height: 500px; 
            z-index: 1; 
            border: 2px solid #ddd;
            border-radius: 8px;
            background-color: #fff;

        `,
        zoomLensStyle: `
            background-color: rgba(0,0,0,0.2);
            border: 1px solid #999;
            border-radius: 4px;
            width: 150px !important;
            height: 150px !important;
        `
    };
    const classes = useStyle(defaultClasses, props.classes);
    const previousButton = formatMessage({
        id: 'productImageCarousel.previousButtonAriaLabel',
        defaultMessage: 'Previous Image'
    });

    const nextButton = formatMessage({
        id: 'productImageCarousel.nextButtonAriaLabel',
        defaultMessage: 'Next Image'
    });

    const chevronClasses = { root: classes.chevron };

    const thumbnails = useMemo(
        () =>
            sortedImages.map((item, index) => (

                <Thumbnail
                    key={item.uid}
                    item={item}
                    itemIndex={index}
                    isActive={activeItemIndex === index}
                    onClickHandler={handleThumbnailClick}
                />
            )),
        [activeItemIndex, handleThumbnailClick, sortedImages]
    );


    let image;
    if (currentImage.file) {
        image = (


            <div className={classes.imageContainer}>

                <div onClick={() => {
                    console.log('hello')
                    setIsOpen(true)
                }}>
                    <ReactImageZoom {...propsForZoom} />
                </div>

                <Dialog isOpen={isOpen} onCancel={() => setIsOpen(false)} shouldShowButtons={false} title="Double Click for Zoom">




                    <div  className='root'>
                        <div className={classes.carouselContainer}>
                            <AriaButton
                                className={classes.previousButton}
                                onPress={handlePrevious}
                                aria-label={previousButton}
                                type="button"
                            >
                                <Icon
                                    classes={chevronClasses}
                                    src={ChevronLeftIcon}
                                    size={40}
                                />
                            </AriaButton>
                            <div className={classes.imageContainer}>

                                <TransformWrapper>
                                    <TransformComponent>
                                        <Image
                                            alt={altText}
                                            //  classes={{
                                            //     image: classes.currentImage,
                                            //     root: classes.imageContainer
                                            //  }}
                                            resource={currentImage.file}
                                            width={IMAGE_WIDTH}
                                        />
                                    </TransformComponent>
                                </TransformWrapper>
                            </div>
                            {/* <ImageZoom uri={currentImage.file}></ImageZoom> */}
                            <AriaButton
                                className={classes.nextButton}
                                onPress={handleNext}
                                aria-label={nextButton}
                                type="button"
                            >
                                <Icon
                                    classes={chevronClasses}
                                    src={ChevronRightIcon}
                                    size={40}
                                />
                            </AriaButton>
                        </div>
                        <div className='thumbnailList'>{thumbnails}</div>
                    </div>
                </Dialog>
            </div>

        );
    } else {
        image = (
            <Image
                alt={altText}
                classes={{
                    image: classes.currentImage_placeholder,
                    root: classes.imageContainer
                }}
                src={transparentPlaceholder}
            />
        );
    }
    return (
        <div className={classes.root}>
            <div className={classes.carouselContainer}>
                <AriaButton
                    className={classes.previousButton}
                    onPress={handlePrevious}
                    aria-label={previousButton}
                    type="button"
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronLeftIcon}
                        size={40}
                    />
                </AriaButton>
                {image}
                {/* <ImageZoom uri={currentImage.file}></ImageZoom> */}
                <AriaButton
                    className={classes.nextButton}
                    onPress={handleNext}
                    aria-label={nextButton}
                    type="button"
                >
                    <Icon
                        classes={chevronClasses}
                        src={ChevronRightIcon}
                        size={40}
                    />
                </AriaButton>
            </div>
            <div className={classes.thumbnailList}>{thumbnails}</div>
        </div>
    );
};

/**
 * Props for {@link ProductImageCarousel}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * ProductImageCarousel component
 * @property {string} classes.currentImage classes for visible image
 * @property {string} classes.imageContainer classes for image container
 * @property {string} classes.nextButton classes for next button
 * @property {string} classes.previousButton classes for previous button
 * @property {string} classes.root classes for root container
 * @property {Object[]} images Product images input for Carousel
 * @property {bool} images[].disabled Is image disabled
 * @property {string} images[].file filePath of image
 * @property {string} images[].uid the id of the image
 * @property {string} images[].label label for image
 * @property {string} images[].position Position of image in Carousel
 */
ProductImageCarousel.propTypes = {
    classes: shape({
        carouselContainer: string,
        currentImage: string,
        currentImage_placeholder: string,
        imageContainer: string,
        nextButton: string,
        previousButton: string,
        root: string
    }),
    images: arrayOf(
        shape({
            label: string,
            position: number,
            disabled: bool,
            file: string.isRequired,
            uid: string.isRequired
        })
    ).isRequired
};

export default ProductImageCarousel;
