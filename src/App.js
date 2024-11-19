import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Waypoints from './components/Waypoints';
import Keybinds from './components/Keybinds';
import TASCalculator from './components/TASCalculator';

import map_channel from './assets/maps/map_channel.jpg'
import map_tobruk from './assets/maps/map_tobruk.jpg'

function App() {
	const [mapName, setMapName] = useState('channel');
	const [mapObj, setMapObj] = useState(null);
	const [distanceUnit, selectDistanceUnit] = useState('km');
	const [baseSpeed, setBaseSpeed] = useState(400);
	const [isMagneticHeading, setMagneticHeading] = useState(false);
	const [waypoints, setWaypoints] = useState([]);
	const [flightLegs, setFlightLegs] = useState([]);

	// Inside your component
	useEffect(() => {
		if (mapName === 'channel') {
			const newMapObj = {
				map: map_channel,
				magVariation: 10,
				zoom: {
					max: 0.005,
					min: -2,
					default: 2,
				},
				center: { x: 400, y: 150 },
				mapRatio: 13.7338063,
			};
			setMapObj(newMapObj);
		} else {
			const newMapObj = {
				map: map_tobruk,
				magVariation: 1.5,
				zoom: {
					max: 0.005,
					min: -16,
					default: 1,
				},
				center: { x: 150, y: 650 },
				mapRatio: 26.284864,
			};
			setMapObj(newMapObj);
		}
	}, [mapName]); // Correct dependency array

	if (mapObj === null) return <div>Loading ...</div>

	return (
		<div className="App">
			<Header 
				p_speed={baseSpeed}
				p_isMagnetic={isMagneticHeading}
				onMapSelect={(map) => setMapName(map)} 
				onDistanceUnitSelect={selectDistanceUnit}
				onSpeedChange={setBaseSpeed}
				onHeadingTypeChange={(isMag) => setMagneticHeading(isMag)}
				/>
			<TASCalculator 
				p_speed={baseSpeed}
				p_unit={distanceUnit}
				onSetTAS={(tas) => {console.log(`App.js > TAS: ${Math.round(tas)}`); setBaseSpeed(tas)}}
				/>
			<Keybinds/>
			{/* <Map 
				p_map={map}
				p_unit={distanceUnit}
				p_baseSpeed={baseSpeed}
				p_flightLegs={flightLegs}
				p_isMagneticHeading={isMagneticHeading}
				onNewWaypoints={setWaypoints}
				onNewFlightLegs={setFlightLegs}
			/> */}
			<Map p_mapObj={mapObj}/>
			{/* <Waypoints p_waypoints={waypoints} p_flightLegs={flightLegs} p_distanceUnit={distanceUnit}/> */}
		</div>
	);
}

export default App;
