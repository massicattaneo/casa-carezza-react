import React, { createContext, useContext, useState } from 'react'

const initialState = {
    exchangeError: '',
    exchangeLoaded: false,
    exchangeRates: [],
    exchangeTimestamp: Date.now(),
    localSearches: []
}

const useMyState = () => useState(initialState)

const MyContext = createContext(null)

export const useSharedState = () => {
    return useContext(MyContext)
}

export const SharedStateProvider = ({ children }) => (
    <MyContext.Provider value={useMyState()}>{children}</MyContext.Provider>
)