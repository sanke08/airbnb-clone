"use client"
import React from 'react'
import { Provider } from "react-redux"
import store from './store'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </QueryClientProvider>
        </Provider>
    )
}

export default ReduxProvider