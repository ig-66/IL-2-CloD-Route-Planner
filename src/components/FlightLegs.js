import React from "react";
import { Polygon, Polyline } from "react-leaflet";

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180

const calculateMidpoint = (start, end) => ({
	lat: (start.lat + end.lat) / 2,
	lng: (start.lng + end.lng) / 2,
})

const createArrow = (start, end, heading, zoom) => {
	const angle = degreesToRadians((heading * -1) - 90)

	const midPoint = calculateMidpoint(start, end)

	let adjustedZoom = zoom + 4

	const arrowLength =  75 / adjustedZoom
	const arrowHead = [
		[
			midPoint.lat + arrowLength * Math.sin(angle + Math.PI / 6),
			midPoint.lng + arrowLength * Math.cos(angle + Math.PI / 6)
		],
		[midPoint.lat, midPoint.lng],
		[
			midPoint.lat + arrowLength * Math.sin(angle - Math.PI / 6),
			midPoint.lng + arrowLength * Math.cos(angle - Math.PI / 6)
		]
	]

	return arrowHead
}

const FlightLegs = ({ p_flightLegs, zoom }) => {
	return (
		<>
			{p_flightLegs.map((flightLeg, index) => {
				const start = flightLeg.coord.start
				const end = flightLeg.coord.end

				const polylinePositions = [
					[start.lat, start.lng],
					[end.lat, end.lng]
				]

				const arrowPoints = createArrow(start, end, flightLeg.heading, zoom)

				return (
					<React.Fragment key={index}>
						<Polyline
							positions={polylinePositions}
							color="black"
							weight={2}
							opacity={1}
						/>

						<Polygon
							positions={arrowPoints}
							color="black"
							fillColor="black"
							fillOpacity={1}
							weight={2}
							opacity={1}
						/>
					</React.Fragment>
				)
			})}
		</>
	)
}

export default FlightLegs
