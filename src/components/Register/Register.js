import React,{Fragment} from 'react';
import {Paper,Button,TextField ,CircularProgress} from '@material-ui/core';

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			regFullName :'',
			regEmail :'',
			regPassword:'',
			regSuccess:'',
			waitState: false,
		}
	}
	//===========EVENTS=============
	onFnameTxtChange = (e) =>{
		this.setState({'regFullName': e.target.value});
	}
	onEmailTxtChange =(e) =>{
		this.setState({'regEmail': e.target.value});
	}
	onPasswordTxtChange =(e) => {
		this.setState({'regPassword': e.target.value});
	}
	onPressEnter = (e) =>{
		if(e.charCode === 13)this.onSubmitRegister();
	}

	onSubmitRegister = (e) =>{
		const{displayError , validateEmail , onRouteChange} = this.props;
		const txtname = document.querySelectorAll('input')[0];
		const txtemail = document.querySelectorAll('input')[1];
		const txtpassword =  document.querySelectorAll('input')[2];
		if(!txtname.value || !txtemail.value|| !txtpassword.value ){
			this.props.displayError('Please fill-up the all requirements');
		}else{
			 if(!(validateEmail(txtemail.value))){
				displayError('Invalid email format');
			}else{
				const method = {
					'method': 'post',
					'headers': {'Content-Type': 'application/json'},
					'body': JSON.stringify({
						'email': this.state.regEmail,
						'name': this.state.regFullName,
						'password': this.state.regPassword})
				}
				this.setState({waitState:true})
				fetch('https://nicer-smart-brain.herokuapp.com/register',method)
				.then(res => res.json())
				.then(status =>{
					if(status === 'success'){
						onRouteChange('SuccessRegister');
					}else{
						displayError(status);
					}
				});
			}
		}
	}
	onWaitState = () =>{
		if(!this.state.waitState){
			return( <Fragment>
					 	<Button id='btnLogin' onClick={this.onSubmitRegister} variant="contained" color="primary" >Register</Button>
						 <Button style={{marginTop:'.8rem'}} onClick={()=>this.props.onRouteChange('signIn')} size="small">Back </Button>
				</Fragment>)
		}else{
			return(<Fragment>
					 	<CircularProgress style={{margin:'1rem'}}/>
					</Fragment>
		)}
	}
	//================================
	render(){ 
		return (
		<div onKeyPress={this.onPressEnter} style={{marginBottom: '5rem'}}  className='Loginform animated slideInLeft'>
				<div style={{height:'34px'}}>
			  		<p id='errr'>{'fff, SADASD, sss'}</p> 
			  	</div>
			<Paper style={{height: '26rem',width:'19rem', background:'rgba(255,255,255,.2)'}} className='formContainer '>
				<form action='Register'  id='formBox'>
					<div className='formContent'>
					 <TextField InputProps={{readOnly: this.state.waitState}} onChange ={this.onFnameTxtChange}  id="outlined-name"label="Full Name"margin="normal" variant="outlined"/>
					</div>
					<div className='formContent'>
					 <TextField InputProps={{readOnly: this.state.waitState}} onChange ={this.onEmailTxtChange}  id="outlined-email-input"label="Email"type="email"margin="normal" variant="outlined"/>
					</div>
					<div className='formContent'>
					<TextField  InputProps={{readOnly: this.state.waitState}} onChange ={this.onPasswordTxtChange} id="outlined-password-input" label="Password" type="password" margin="normal" variant="outlined"/>
					</div>
					<div className='formContent'>
						{
							this.onWaitState()
						}
					</div>
				</form>
			</Paper>
		</div>
		);
	}
}
export default Register;