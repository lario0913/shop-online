import React from 'react'

import {auth} from '../../firebase/firebase.utils'

import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'

import {HeaderContainer, LogoContainer, OptionsContainer, LinkOption} from './header.styles'

export const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to='/' >
            <Logo className='logo' />
        </LogoContainer>

        <OptionsContainer>
            <LinkOption to='/shop'>SHOP</LinkOption>
            <LinkOption to='/shop'>CONTACT</LinkOption>
            {
                currentUser ?
                <LinkOption as='div' onClick={() => auth.signOut()} >SIGN OUT</LinkOption> :
                <LinkOption to='/signIn'>SIGN IN</LinkOption>
            }
            
            <CartIcon />
        </OptionsContainer>
        {
            hidden ?
            null :
            <CartDropdown />
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)