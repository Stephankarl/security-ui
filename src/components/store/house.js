import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

import { apiCallBegan } from './api'
import { cachedTime } from './config'

const slice = createSlice({
    name: 'house',
    initialState: {
        loading: false,
        list: {},
        lastFetched: null
    },
    reducers: {
        houseStateRequested: (state) => {
            state.loading = true
        },
        houseStateReceived: (state, { payload }) => {
            state.list = payload
            state.loading = false
            state.lastFetched = Date.now()
        },
        houseStateRequestFailed: (state) => {
            state.loading = false
        },
        lightSwitchSuccess: (state, { payload }) => {
            state.list = payload
        }
    }
})

const { houseStateRequested, houseStateReceived, houseStateRequestFailed, lightSwitchSuccess } = slice.actions
export default slice.reducer

export const loadHouseState = () => (dispatch, getState) => {
    const { lastFetched } = getState().house
    const diffInMin = moment().diff(moment(lastFetched), 'minute')

    if (diffInMin < cachedTime) return

    dispatch(
        apiCallBegan({
            url: '/',
            onStart: houseStateRequested.type,
            onSuccess: houseStateReceived.type,
            onError: houseStateRequestFailed.type
        })
    )
}

export const lightSwitch = (room, light) => (dispatch, getState) => {
    const area = getState().house.list[room]
    const globe = area[light] 
    dispatch(
        apiCallBegan({
            url: '/',
            method: 'post',
            data: {
                [room]: {
                    [light]: !globe
                }
            },
            onSuccess: lightSwitchSuccess.type,
            onError: houseStateRequestFailed.type
        })
    )
}








