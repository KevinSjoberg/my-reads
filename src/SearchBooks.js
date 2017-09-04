import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import { search } from './BookAPI';

export default class SearchBooks extends Component {
  state = {
    books: [],
    error: '',
    query: ''
  }

  searchBooks(query) {
    this.setState({ query, error: '' });

    if(query.length < 1) {
      this.setState({ books: [] });
      return;
    }

    search(query, 20).then(books => {
      if (Array.isArray(books)) {
        this.setState({ books })
      } else {
        this.setState({ error: books.error })
      }
    });
  }

  render() {
    const { books, error, query } = this.state;
    const { shelves, onUpdateBook } = this.props;

    console.log("error", this.state.error);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.searchBooks(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          {error !== '' ? (
            <h2>No books found. Error: <pre>{error}</pre></h2>
          ) : (
            <BookList books={books} shelves={shelves} onUpdateBook={onUpdateBook} />
          )}
        </div>
      </div>
    );
  }
}

