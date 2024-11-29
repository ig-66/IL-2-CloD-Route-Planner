import map_img_channel from './map_channel.jpg'
import map_img_tobruk from './map_tobruk.jpg'

const Maps = 
{
	channel: {
		name: 'channel',
		displayName: 'Channel',
		map: map_img_channel,
		magVariation: 10,
		zoom: {
			max: 2,
			min: -2,
			default: -2,
		},
		center: {
			lat: 2595,
			lng: 2680
		},
		mapRatio: 13.7338063,
	},
	tobruk: {
		name: 'tobruk',
		displayName: 'Tobruk',
		map: map_img_tobruk,
		magVariation: 1.5,
		zoom: {
			max: 2,
			min: -3,
			default: -2,
		},
		center: {
			lat: 4933,
			lng: 4952
		},
		mapRatio: 26.284864,
	},
}

export default Maps
