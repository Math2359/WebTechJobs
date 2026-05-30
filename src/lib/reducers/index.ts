import { configureStore } from '@reduxjs/toolkit'
import { credencialReducer } from './credencial'
import { useSelector, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        credencial: credencialReducer
    }
})

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;