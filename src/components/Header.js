import React, { useEffect, useState } from 'react'; // Importing Modules

const Header = ({ onMapSelect }) => {

	const [newMap, setNewMap] = useState('channel')
	
	const handleChange = (event) => {
		setNewMap(event.target.value)
	};

	useEffect(() => {
		onMapSelect(newMap)
	}, [newMap])

	return (
		<header style={{position:'absolute', zIndex:10}}>
			<select value={newMap} onChange={handleChange}>
				<option value="channel">Channel</option>
				<option value="tobruk">Tobruk</option>
			</select>
		</header>
	);
}
export default Header;
