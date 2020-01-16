import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100
    const publishKey = "pk_test_yddzv5xgxyiIqcxetkxtIJRo0016zZnjNa"

    const onToken = token => {
        console.log(token)
        alert("Payment Successful")
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