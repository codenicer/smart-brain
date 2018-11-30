import React,{Fragment} from 'react';
import './SignIn.css';
import {Paper,Button,TextField ,CircularProgress} from '@material-ui/core';


class SignIn extends React.Component {
constructor(props){
	super(props);
	this.state ={
		inputEmail:'',
		inputPassword:'',
		waitState: false,
	}
	this.onbtnSubmitClick = this.onbtnSubmitClick.bind(this);
};
//========EVENTS================
onWaitState = () =>{
		if(!this.state.waitState){
			return( <Fragment>
					 	 <Button id='btnLogin'  onClick={this.onbtnSubmitClick}  variant="contained" color="primary" >Login</Button>
						 <Button style={{marginTop:'.8rem'}} onClick={() => this.props.onRouteChange('Register')} size="small">Regiter </Button>
				</Fragment>)
		}else{
			return(<Fragment>
					 	<CircularProgress style={{margin:'1rem'}}/>
					</Fragment>
		)}
	}
 ontxtEmailChange = (e) =>{
 	this.setState({inputEmail: e.target.value});
 };
 ontxtPasswordChange = (e) => {
 	this.setState({inputPassword: e.target.value});
 };
 onKeypressEnter =(e) =>{
 	if(e.charCode === 13)this.onbtnSubmitClick();
 };
 async onbtnSubmitClick(){
 	 const{displayError,loadUser,onRouteChange, validateEmail} = this.props;
 	 this.setState({waitState:true});
     const logemail = document.querySelectorAll('input')[0];
	 if(validateEmail(logemail.value)){
		const res = await fetch('https://nicer-smart-brain.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type' :'application/json'},
			body: JSON.stringify({
				email: this.state.inputEmail,
				password: this.state.inputPassword
				})
			})
		const data = await res.json();
		if(data === 'Invalid account'){
			this.setState({waitState:false});
			displayError(data);
		}else{
			loadUser(data);
			onRouteChange('Home');
		}
	 }else{
	 	displayError('Invalid email format');
	 	this.setState({waitState:false});
	 }
 };
//=========RENDER================
 render(){
		return (
		<form className='Loginform animated slideInLeft' >
				<div style={{height:'34px'}}>
			  		<p id='errr'>Email or Password is incorect</p> 
			  	</div>
			<Paper  style={{background:'rgba(255,255,255,.2)'}} onKeyPress={this.onKeypressEnter} className='formContainer '>
				<div id='formBox'>
					<div className='formContent'>
					  <TextField InputProps={{readOnly: this.state.waitState}} onChange={this.ontxtEmailChange}  id="outlined-email-input"label="Email"type="email"margin="normal" variant="outlined"/>
					</div>
					<div className='formContent'>
					<TextField  InputProps={{readOnly: this.state.waitState}} onChange={this.ontxtPasswordChange} id="outlined-password-input" label="Password" type="password" margin="normal" variant="outlined"/>
					</div>
					<div className='formContent'>
						{
							this.onWaitState()
						}
					</div>
				</div>
			</Paper>
		</form>
		);
 }
}

export default SignIn;