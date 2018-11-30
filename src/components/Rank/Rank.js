import React from 'react';
import './Rank.css';

const Rank = ({logUSer}) =>{
	let firstName =	logUSer.name.split(" ")
	return (
			<div>
				<div className='white f3'>
					<span style={{textTransform:'capitalize'}}>{`${firstName[0]}`}</span>
					{`, your entries number is...`}
				</div>
				<div className='white f1 b animated flash'>
					{`#${logUSer.entries}`}
				</div>
			</div>
		);
}

export default Rank;