import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queryies'

class BookDetails extends React.Component {
  displayBookDetails () {
    const { book } = this.props.data
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className='other-books'>
            {book.author.books.map((book) => {
              return (
                <div>{book.name}</div>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No Book Selected</div>
      )
    }
  }

  displayBooks () {
    const data = this.props.data
    if (data.loading) {
      return (
        <div>Loading books...</div>
      )
    } else {
      return data.books.map((book) => {
        return (
          <li key={book.id}>{book.name}</li>
        )
      })
    }
  }

  render () {
    return (
      <div id='book-details'>
        <p>Output book details here</p>
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
