import React from 'react'

import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
// import { signInWithGoogle }  from '../../firebase/firebase.utils'
import { signInWithGoogle } from '../../firebase/firebase.utils'


class SignIn extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: ''
        }
    }

    handleSubmit= (event) => {
        event.preventDefault();


        this.setState({
            email: '',
            password: ''
        })
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }
    


    render() {
        const {email, password} = this.state
        return (
            <div className='sign-in'>

                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form action="" onSubmit={this.handleSubmit}>

                    <FormInput label='email' type="email" name='email' required value={email} handleChange={this.handleChange} />
                    

                    <FormInput label='password' type="password" name='password' required value={password} handleChange={this.handleChange} />
                    
                    <div className='buttons'>
                        <CustomButton type='submit' value='Sign In'> Sign In </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn> {' '} Sign In With Google {' '} </CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn