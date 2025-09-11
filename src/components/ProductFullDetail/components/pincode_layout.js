import React, { useState } from 'react';
import { Form } from 'informed';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Button from '@magento/venia-ui/lib/components/Button';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { FormattedMessage, useIntl } from 'react-intl';
import './pdp.css';
import { usePincodeService } from '../talons/usePincodeService';

const PincodeCheck = ({ sku}) => {
    const { formatMessage } = useIntl();
    const { checkServiceAvailability } = usePincodeService();
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')
    const[pincode,setPincode]=useState('')
    const checkPincode = async () => {
        try {
            console.log('hello')
            const result = await checkServiceAvailability(pincode,sku);
            if (result.is_serviceable === 1) {
                setDate(result.deliver_in_days);
                setMessage('');
            } else {
                setMessage(result.message);
                setDate(null);
            }
        } catch (err) {
            console.error(err);
        }
    };
    

    return (
        <div id="pincodecontainer">
            <Form onSubmit={checkPincode} >


                <Field
                    id="pincodeField"
                    label={formatMessage({
                        id: 'pincode.label',
                        defaultMessage: 'Enter Pincode'
                    })}
                >

                    <div id='inputconatiner' >

                        <TextInput
                            field="pincode"
                            maxLength={6}
                            validate={isRequired}
                            value={pincode}
                            onChange={e => {
                                const val = e.target.value;
                                if (val.length <= 6) {
                                    setPincode(val);
                                }
                            }}
                        />
                    </div>
                </Field>
                <div id="checkpincode">

                    <Button type="submit" >
                        <FormattedMessage
                            id="pincode.check"
                            defaultMessage="Check Delivery"
                        />
                    </Button>
                </div>

            </Form>

            {date ? (
                <div>
                    <span>
                        <FormattedMessage
                            id="pincode.expectedDate"
                            defaultMessage="The expected delivery date is"
                        />
                    </span>
                    <span id="pincodetext">{date}</span>
                </div>
            ) : (
                <span id="pincodetext">{message}</span>
            )}
        </div>
    );
};

export default PincodeCheck;
