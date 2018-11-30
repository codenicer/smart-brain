import React,{Fragment} from 'react';
import {Typography,Button} from '@material-ui/core';

const SuccessLogin = ({onRouteChange}) =>{
	return (
			<Fragment>
				 <Typography  style={{fontFamily: 'Black Han Sans'}} component="h2" variant="display3" gutterBottom>Welcome to Smart-Brain</Typography>
       				 <Typography variant="subtitle2" gutterBottom>
       					{`
							Thank you for signing-up to my web-app, have fun :)
						`}
    				  </Typography>
       				  <Typography gutterBottom noWrap>
						{`
							NOTE: your password has will be sent to your email address in less than 5mins, in case you forget it .
						`}
       				 </Typography>
       				 <Button style={{marginTop:'.8rem' , textDecoration:'underline'}} onClick={()=>onRouteChange('signIn')} size="small">Sign-In</Button>
			</Fragment>
		)
}

export default SuccessLogin;