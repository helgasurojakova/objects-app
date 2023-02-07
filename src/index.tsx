import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

const root = createRoot(document.getElementById('root')!)

root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
)
