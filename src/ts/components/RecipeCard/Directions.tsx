import React from 'react'

import ReactHtmlParser from 'react-html-parser'

import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator,
} from '@mui/lab'
import { Typography } from '@mui/material'

export default function Directions(props: {
	recipeInstructions: string[]
}): React.ReactElement {
	const { recipeInstructions } = props

	if (recipeInstructions.length === 0) {
		return (
			<Typography variant='body1' sx={{ mt: 1 }}>
				No directions available
			</Typography>
		)
	}

	if (recipeInstructions.length === 1) {
		return (
			<Typography variant='body1' sx={{ mt: 1 }}>
				{recipeInstructions[0]}
			</Typography>
		)
	}

	return (
		<Timeline position='right' sx={{ p: 0 }}>
			{recipeInstructions.map((instruction, idx) => (
				<TimelineItem key={instruction}>
					<TimelineOppositeContent
						sx={{
							flex: 0,
							color: 'primary.main',
							width: '2ch',
							marginRight: 2,
						}}
					>
						<b>{idx + 1}</b>
					</TimelineOppositeContent>
					<TimelineSeparator>
						<TimelineDot />
						{idx < recipeInstructions.length - 1 && <TimelineConnector />}
					</TimelineSeparator>
					<TimelineContent>{ReactHtmlParser(instruction)}</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	)
}
