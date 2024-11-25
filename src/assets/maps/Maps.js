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
			default: -1,
		},
		center: [3000, 2600],
		mapRatio: 13.7338063,
	},
	tobruk: {
		name: 'tobruk',
		displayName: 'Tobruk',
		map: map_img_tobruk,
		magVariation: 1.5,
		zoom: {
			max: 2,
			min: -64,
			default: -64,
		},
		center: [4160, 4820],
		mapRatio: 26.284864,
	},
}

export default Maps
