import AppStyle from '../AppStyle.js';

const Keybinds = () => {
	return (
		<div 
			style={AppStyle.nonInteractableFullscreenComp}>
			<div
				style={{
					...AppStyle.label,
					bottom: '10px',
					right: '10px',
					textAlign: 'left',
					fontSize: 12,
					zIndex: 15,
				}}
			>
				<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
					<a>KEYBINDS:</a><br />
				</div>
				<a style={{ fontWeight: 'bold' }}>LMB(hold):</a><a> Map drag </a><br />
				<a style={{ fontWeight: 'bold' }}>RMB:</a><a> Add new waypoint </a><br />
				<a style={{ fontWeight: 'bold' }}>MMB:</a><a> Remove last waypoint </a>
			</div>
		</div>
	)
}

export default Keybinds;
