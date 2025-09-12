import React, { Fragment, useEffect, useState } from 'react';
import { useGetCuponService } from '../talons/useGetCupons';
import Button from '@magento/venia-ui/lib/components/Button';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import './index.css'
import { useCouponService, removeCouponService } from '../talons/getCartItems';
function Cupons({ cartId, couponAlreadyApplied, couponCode }) {
  const { getAllCupons } = useGetCuponService();
  const { checkApplyCoupon } = useCouponService()
  const { checkRemoveCoupon } = removeCouponService()
  const [isOpen, setIsOpen] = useState(false)
  const [cuponsData, setcuponsData] = useState([])



  useEffect(() => {
    const fetchCupons = async () => {
      try {
        const res = await getAllCupons();
        setcuponsData(res.coupons)
        console.log(cuponsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCupons();
  }, []);


  const applyCoupon = async (coupon_code) => {
    try {
      const res = await checkApplyCoupon(cartId, coupon_code)
      console.log(res)
      setIsOpen(false)
    }
    catch (err) {
      console.log(err)
    }
  }
  const removeCoupon = async () => {
    try {
      const res = await checkRemoveCoupon(cartId)
      console.log(res)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>


      {couponAlreadyApplied ? (
        <div id='RemoveCoupon'>
          <div id='couponTextContainer'>

            <text id='couponText'>
              Coupon Applied
            </text>
            <text id='codeText'>
              {couponCode}
            </text>
          </div>
          <Button priority='high' classes={{ root_highPriority: 'couponApplyBtn' }} onClick={() => removeCoupon()}>
            Remove
          </Button>
        </div>
      ) :
        <div className="couponRow" onClick={() => setIsOpen(true)}>
          <span className="couponText">Enter Offer Code</span>
          <span className="couponApplyBtn">Apply</span>
        </div>


      }

      <Dialog
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={applyCoupon}
        shouldShowButtons={false}
      >
        <div>
          <ul>
            {cuponsData.map(item => (
              <Fragment key={item.coupon_code}>
                <div id='couponContainer'>
                  <div >

                    <li id='couponName'>{item.coupon_name}</li>
                    <li id='couponDesc'>{item.description}</li>
                  </div>
                  <Button onClick={() => applyCoupon(item.coupon_code)}>
                    {item.coupon_code}
                  </Button>
                </div>
              </Fragment>
            ))}
          </ul>

        </div>
      </Dialog>
    </div>

  );
}


export default Cupons;
