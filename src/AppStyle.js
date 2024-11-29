const AppStyle = {
	nonInteractableFullscreenComp: {
		position: 'absolute',
		height: '100vh',
		width: '100vw',
		pointerEvents: 'none',
		overflow: 'hidden'
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		padding: '4px 8px',
		borderRadius: '7px',
		pointerEvents: 'none',
		whiteSpace: 'nowrap',
		zIndex: 10,
		fontSize: 10
	},
	button: {
		cancel: {
			backgroundColor: 'red',
			color: 'white',
			fontWeight: 'bolder',
			borderRadius: 5,
			padding: 2,
			paddingInline: 7,
		},
		blue: {
			backgroundColor: 'blue',
			color: 'white',
			fontWeight: 'bolder',
			borderRadius: 5,
			padding: 2,
			paddingInline: 7,
		},
		green: {
			backgroundColor: 'green',
			color: 'white',
			fontWeight: 'bolder',
			borderRadius: 5,
			padding: 2,
			paddingInline: 7,
		}
	}
}

export default AppStyle;
