import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';

function App() {
	const [map, selectMap] = useState('channel');
	const [unit, selectUnit] = useState('metric');

	return (
		<div className="App">
			<Header onMapSelect={selectMap} onUnitSelect={selectUnit}/>
			<Map p_map={map} p_unit={unit}/>
		</div>
	);
}

export default App;
