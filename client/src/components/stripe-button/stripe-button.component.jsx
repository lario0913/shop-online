  import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100
    const publishKey = "pk_test_yddzv5xgxyiIqcxetkxtIJRo0016zZnjNa"

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('payment was successful')
        }).catch(error => {
            // console.log('payment error: ', JSON.parse(error));
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card details'
            )
        })
    }

    return(
        <StripeCheckout 
        label="Pay Now"
        name="Crown Clothings"
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/Cuz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishKey}
        />
    )
}

export default StripeCheckoutButton