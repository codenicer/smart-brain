import React from 'react';
import './Navigation.css';
import SignOut from './signout.png';
import Register from './register.png'
const Navigation = ({onRouteChange ,isSignIn}) =>{
	return isSignIn ?
			<nav id='navigation'>
				<div onClick={() => onRouteChange('signIn')} className='linkk f3 link dim black  pa3 pointer'>
					<img id="signlogo" alt ="SignOut" src={SignOut} />
					<p style={{fontFamily: 'EB Garamond'}}>Sign Out </p>
				</div>
			</nav>
			:
			<nav  id='navigation'>
				<div onClick={() => onRouteChange('signIn')} className='linkk f3 link dim black  pa3 pointer'>
					<img  id="signlogo" alt ="SignOut" src={SignOut} />
					<p style={{fontFamily: 'EB Garamond'}} > Sign In </p>
				</div>
				<div onClick={() => onRouteChange('Register')} className='linkk f3 link dim black  pa3 pointer'>
					<img id="signlogo" alt ="SignOut" src={Register} />
					<p style={{fontFamily: 'EB Garamond'}} >Register</p>
				</div>
			</nav>
}

export default Navigation; 