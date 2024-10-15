import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';
import Waypoints from './components/Waypoints';

function App() {
	const MAP_RATIOS = { channel: 13.7338063, tobruk: 26.284864 };

	const [map, selectMap] = useState('channel');
	const [unit, selectUnit] = useState('metric');
	const [mapRatio, setMapRatio] = useState(MAP_RATIOS.channel);

	const [waypoints, setWaypoints] = useState([]);
	const [flightLegs, setFlightLegs] = useState([]);

	useEffect(() => {
		if (map === 'channel') {
			setMapRatio(MAP_RATIOS.channel);
		}
		else {
			setMapRatio(MAP_RATIOS.tobruk);
		}
	}, [map]);

	return (
		<div className="App">
			<Header onMapSelect={selectMap} onUnitSelect={selectUnit}/>
			<Map 
				p_map={map}
				onNewWaypoints={setWaypoints}
				onNewFlightLegs={setFlightLegs}
				/>
			<Waypoints p_waypoints={waypoints} p_flightLegs={flightLegs} />
		</div>
	);
}

export default App;
