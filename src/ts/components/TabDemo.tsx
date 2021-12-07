import React, { SyntheticEvent } from 'react'

import { Container, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'

function TabPanel(props: {
	children: React.ReactNode
	index: number
	value: number
}): React.ReactElement {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

export default function TabDemo(): React.ReactElement {
	const [value, setValue] = React.useState(0)

	const handleChange = (_event: SyntheticEvent, newValue: number): void =>
		setValue(newValue)
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Container>
					<Tabs value={value} onChange={handleChange} variant='scrollable'>
						<Tab label='Item One' id='tab1' />
						<Tab label='Item Two' id='tab2' />
						<Tab label='Item Three' id='tab3' />
					</Tabs>
				</Container>
			</Box>
			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
		</Box>
	)
}
