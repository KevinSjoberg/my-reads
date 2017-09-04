import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import { search } from './BookAPI';

export default class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  }

  searchBooks(query) {
    this.setState({ query });

    if(query.length < 1) {
      return;
    }

    search(query, 20).then(books => {
      if (Array.isArray(books)) {
        this.setState({ books })
      }
    });
  }

  render() {
    const { books, query } = this.state;
    const { shelves, onUpdateBook } = this.props;

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
          <BookList books={books} shelves={shelves} onUpdateBook={onUpdateBook} />
        </div>
      </div>
    );
  }
}

