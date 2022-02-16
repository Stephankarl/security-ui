
import { useDispatch, useSelector } from 'react-redux'
//Import Files
import MasterBedroom from './components/MasterBedroom'
//Import Functions
import { loadHouseState } from './components/store/house'

//Material UI
import { Grid } from '@mui/material'

function App() {
  const dispatch = useDispatch()

  dispatch(loadHouseState())

  const loading = useSelector(state => state.house.loading)
  if (loading)
    return <div>Loading...</div>

  return (
    <Grid container style={{ display: 'flex', justifyContent: 'center'}}>
      <MasterBedroom />
    </Grid>
  );
}

export default App;
