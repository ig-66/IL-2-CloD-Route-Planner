import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Waypoints from './components/Waypoints';
import Keybinds from './components/Keybinds';
import TASCalculator from './components/TASCalculator';
import RoutePlanner from './utils/RoutePlanner';

function App() {

	const [mapObj, setMapObj] = useState(null);
	const [distanceUnit, selectDistanceUnit] = useState('km');
	const [baseSpeed, setBaseSpeed] = useState(400);
	const [isMagneticHeading, setMagneticHeading] = useState(false);
	
	const [flightLegs, setFlightLegs] = useState([]);
	const [markers, setMarkers] = useState([]);
	
	const routePlanner = new RoutePlanner(setFlightLegs, setMarkers, 'metric', 1000, baseSpeed)

	useEffect(() => {
		setMapObj(routePlanner.getMapObj()) // gets the default map object
	}, [])

	if (mapObj === null) return <div>Loading ...</div>

	return (
		<div className="App">
			<Header 
				p_speed={baseSpeed}
				p_isMagnetic={isMagneticHeading}
				onMapSelect={(mapName) => setMapObj(routePlanner.getMapObj(mapName))} 
				onDistanceUnitSelect={selectDistanceUnit}
				onSpeedChange={setBaseSpeed}
				onHeadingTypeChange={(isMag) => setMagneticHeading(isMag)}
				/>
			<TASCalculator 
				p_speed={baseSpeed}
				p_unit={distanceUnit}
				onSetTAS={(tas) => setBaseSpeed(tas)}
				/>
			<Keybinds/>
			<Map p_mapObj={mapObj}/>
			{/* <Waypoints p_waypoints={waypoints} p_flightLegs={flightLegs} p_distanceUnit={distanceUnit}/> */}
		</div>
	);
}

export default App;
