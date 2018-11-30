import React from 'react';
import Tilt from 'react-tilt'
import Logoimg from './Brain.png';
import './Logo.css';

const Logo = () =>{
	return(
			<div className="logoholder   mt0">
				<Tilt className="Tilt br2 shadow-2" options={{ max : 120 }} style={{ height: 130, width: 120 }} >
					 <div className="Tilt-inner img">
					 	<p className='bounceInDown' style={{fontSize:'1.1rem',marginTop:'.2rem',fontFamily: 'Shadows Into Light'}}>hover me senpai</p>
					 	<img alt='Brain' src={Logoimg}/>
					 </div>
				</Tilt>
			</div>
		);
}

export default Logo; 