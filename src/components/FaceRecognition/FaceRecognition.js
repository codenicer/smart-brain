import React,{Fragment} from 'react';
import './FaceRecognition.css';
import {CircularProgress,Paper} from '@material-ui/core';

class FaceRecognition extends React.Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}
	render(){
		const{imgURL,box} = this.props
		return(<Fragment>
				{
				  this.props.isClicked ?<Fragment>
				  <CircularProgress style={{marginTop:'1rem'}}/>
				  <p>Detecting Faces...</p>
				  </Fragment> : <div></div>
				}
				<div className='center ma'> 
					<Paper className="absolute mt2">
						<img id='inputimg' className='imgto' alt="" src={imgURL} width='500px' height='auto'/>
							{
									box.length > 0 ? box.map( (x,i) =>
									<div key={i}
									style={{top:x.topRow ,right:x.rightCol ,bottom:x.bottomRow ,left:x.leftcol}}
									className={`bounding-box`}>
									</div>
								)
								: 
								<div></div>
							}
					</Paper>
				</div>
			</Fragment>
		);

	}
	
}

export default FaceRecognition;