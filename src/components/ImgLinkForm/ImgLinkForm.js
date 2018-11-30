import React from 'react';
import './ImgLinkForm.css';


const ImgLinkForm = ({ontextChange,onbuttonClick,onKeyPress}) =>{
	return (
			<div>
				<p className='f3'>
					{`This Magic Brain will detect faces in your pictures. Give it a try.`}
				</p>
				<div onKeyPress={onKeyPress} className='center'>
				 	<div id='fromm' className='center pa4 br3 shadow-5'>
						<input style={{width:'60%',minWidth:'19rem'}} onChange={ontextChange} className='f4 pa2 w-60 center' type='text'/>
						<button style={{width:'15rem'}} id="submitPic" onClick={onbuttonClick} className='br2 grow f4 link ph3 pv2 white'>{`DETECT`}</button>
					</div>
				</div>
			</div>
		);
}

export default ImgLinkForm;