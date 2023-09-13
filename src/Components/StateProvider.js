import React,{createContext,useContext,useReducer} from 'react'

// prepares data layer
export const StateContext = createContext();

// Wrap our app and provide datalayer to every component 
export const StateProvider = ({reducer,initialState,children})=>(
    <StateContext.Provider value = {useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

// Pull information from datalayer
// By this all data of the value object will be available inside useStateValue
export const useStateValue = () => useContext(StateContext)