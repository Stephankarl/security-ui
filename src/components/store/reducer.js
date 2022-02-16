import { combineReducers } from 'redux'
import houseReducers from './house'

const rootReducer = combineReducers({
    house: houseReducers
})

export default rootReducer