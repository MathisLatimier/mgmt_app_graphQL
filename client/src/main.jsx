import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Query } from 'mongoose'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />

    </ApolloProvider>
  </StrictMode>,
)
