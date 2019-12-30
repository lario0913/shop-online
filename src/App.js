import React from 'react';
import './App.css';
import {Switch, Route } from 'react-router-dom'

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'


class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=> {
      if (userAuth) {
        const userRef = await createUserProfileDocument (userAuth)

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser : {
              id: snapShot,
              ...snapShot.data()
            }
          })

          console.log(this.state)
        })

      }
      else {
        this.setState({currentUser: userAuth})
      }
    })
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signIn' component={SignInAndSignUpPage} />
        </Switch>
      </div>
  )
 }
}

export default App;
