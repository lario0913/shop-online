import React from 'react'
import './cart-dropdown.styles.scss'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartItems} from '../../redux/cart/cart.selectors' 
import {toggleCartHidden} from '../../redux/cart/cart.action'

import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component' 


export const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown' >
        <div className='cart-items'>
            {   cartItems.length ? (
                cartItems.map(cartItem => <CartItem id={cartItem.id} item={cartItem} />)
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )
                
            }
        </div>
        <CustomButton onClick={()=> {
            history.push('/checkout')
            dispatch(toggleCartHidden())
            }}>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))