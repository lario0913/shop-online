import React from 'react';
import './App.css';
import {Switch, Route, Redirect } from 'react-router-dom'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component'

import {selectCurrentUser} from './redux/user/user.selectors'
import {checkUserSession} from './redux/user/user.actions'



class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const {checkUserSession} = this.props
    checkUserSession()
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route  path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />

          <Route exact path='/signIn' render={ () => 
            this.props.currentUser ?
            (<Redirect to='/' />) :
            (<SignInAndSignUpPage/>)
          } />
        </Switch>
      </div>
  )
 }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
