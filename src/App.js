import React, { Component ,} from 'react';
import Clarifai  from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js'
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm.js';
import FaceRecognition from'./components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import SuccessLogin from './components/SuccessLogin/SuccessLogin.js'


const apps = new Clarifai.App({
 apiKey: '0b82a19a19be4193aab40b91ac13b6c1'
});
let picLink ='';
let isClick = false;
const particlesOption ={
  particles: {
    number: {
      value: 100,
      density: {
        enable:true,
        value_area:600
      }
    }
  }
};
class App extends Component {
  constructor(){
    super()
    this.state = {
      imgURL:'',
      box: [],
      route: 'signIn',
      isSignIn: false,
      logUSer: {
        id: '', 
        name: '',
        email: '',
        entries: '',
        joined: new Date(),
      }
    }
  };
// =========FUNCTION======================
validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
displayError = (diserr)=>{
    const errr = document.querySelector('#errr');
    const errorStatus = document.createTextNode(`${diserr}`);
    errr.replaceChild(errorStatus,errr.childNodes[0]);
    errr.style.display = 'block';
    errr.style.color = 'red';
    setTimeout( () => errr.style.display = 'none' ,2000);
  } 
loadUser = (data) => {
  this.setState({logUSer:{
        id: data.Id, 
        name: data.FullName,
        email: data.Email,
        entries: data.Entries,
        joined: data.Joined,
  }})
}
ontextChange = e => picLink= e.target.value;//this.setState({input: e.target.value});//pass textbox TEXT to this.input
// =======================================
onKeyPress = (e) =>{
    if(e.charCode === 13)this.onbuttonClick();
}
onbuttonClick = () => {
  var rank = document.querySelectorAll('.white')[1];
  rank.classList.toggle('flash');
  isClick = true;
  this.setState({box: []});
  const setUrl = new Promise((res, reject)=> res = this.setState({imgURL: picLink })) //pass state.input to state.url
  //clarifai API
  setUrl.then(
      setTimeout( ()=>{
     apps.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.imgURL)
     .then(response => {
        const image = {
          'method': 'put',
          'headers': {'Content-Type': 'application/json'},
          'body': JSON.stringify({
            'id': this.state.logUSer.id,
            'currentEntries': this.state.logUSer.entries})
          }
        if(response){
          fetch('https://nicer-smart-brain.herokuapp.com/image',image)
          .then(res => res.json())
          .then(userEntries => {
            this.setState(Object.assign(this.state.logUSer,{entries:userEntries}))
            rank.classList.toggle('flash');
          })
        
        }
      isClick = false;
       this.displayFaceBox(this.calculateFaceLocation(response))
       document.getElementById("inputimg").focus();
      })
  .catch(err => {
      isClick= false;
            this.forceUpdate();
      this.displayError('Invalid image address')

     });
    },0)
    )
  //reponse DATA(Promise) will be cath by our function 'calulateFace'...
  //then the Return value of calulateFace will cath by 'displayFaceBox 'function
  //fucntion over a function or Compose
};
//=========================================
calculateFaceLocation = (data) =>{
  const listOfFaceloc = [];
  const img = document.querySelector('#inputimg')//lets do some DOM manipulation
  const width = Number(img.width);
  const height = Number(img.height);;

  data.outputs[0].data.regions.map(x => listOfFaceloc.push(
            {//add this object to and array
             leftcol: x.region_info.bounding_box.left_col * width,
             topRow: x.region_info.bounding_box.top_row * height,
             rightCol: width - (x.region_info.bounding_box.right_col * width),
             bottomRow: height - (x.region_info.bounding_box.bottom_row * height),
            }
    ));
    return listOfFaceloc; //return this array to our function  
};
// ===========================================
displayFaceBox = (box) => {
  this.setState({box: box});
};
//=============================================
onRouteChange = (route) =>{
 if (!(this.state.route === route)){
    this.setState({route: route})
     if(route === 'Home')
    {
      this.setState({isSignIn: true})

    }else
    {
       this.setState({isSignIn: false,imgURL:''})
    }
 } 
};
whereRoute = (route,box,imgURL,) => {
     if (route === 'signIn') {
       return <SignIn  displayError = {this.displayError}  validateEmail = {this.validateEmail} onRouteChange={this.onRouteChange}  loadUser={this.loadUser} />;
     }else if (route === 'Home'){
       return <div className='animated slideInLeft' style={{marginTop:'1rem'}}>
                  <Rank logUSer={this.state.logUSer}/> 
                  <ImgLinkForm 
                    onKeyPress = {this.onKeyPress}
                    ontextChange={this.ontextChange}
                    onbuttonClick={this.onbuttonClick}
                   />
                      <p style={{display:'none'}} id='errr'>{'test'}</p> 
                     <FaceRecognition box={box} imgURL = {imgURL} isClicked={isClick} />
              </div>
     }else if(route === 'Register'){
       return  <Register 
                    validateEmail = {this.validateEmail}
                    displayError = {this.displayError}
                    onRouteChange={this.onRouteChange} 
                 />
     }else if(route === 'SuccessRegister'){
      return (<div style={{marginTop:'6rem'}} className='animated jackInTheBox'>
                 <SuccessLogin  onRouteChange={this.onRouteChange} />
              </div>)
     }
}
// ==========RENDER=====================
  render() {
    const {imgURL,box,route,isSignIn} = this.state;
    //rendere whereRoute Object
    return (
      <div className="App">
        <Particles className='particles'params={particlesOption}/>
        <div id="navlog">
          <Logo />
          <Navigation onRouteChange={this.onRouteChange} isSignIn={isSignIn} />
        </div>
        {    
          this.whereRoute(route,box,imgURL)
        }
      </div>
    );
  }
}

export default App;
