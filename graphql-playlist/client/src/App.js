import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// components
import BookList from './components/BookList'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends React.Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <div id='main'>
          <h1>Ninja's Reading List</h1>
          <BookList />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
