import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Material UI
import { Grid, Button, Typography } from '@mui/material'
import { lightSwitch } from './store/house'

export default function MasterBedroom() {
    const dispatch = useDispatch()
    const lights = useSelector(state => state.house.list)

    return (
        <Grid item xs={6}>
            <Typography variant='h3' align='center' my={3}>Master Bedroom</Typography>
            <Button variant='contained' 
                fullWidth
                color='inherit'
                style={ (!lights.masterBedroom) ? { color: '#373543' } : { color: '#3cc194' }}
                onClick={() => dispatch(lightSwitch('masterBedroom'))}>{lights.masterBedroom ? 'ON' : 'OFF' }
            </Button>
        </Grid>
    )
}
