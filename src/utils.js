export const booksByShelf = (books, shelf) =>
  books.filter(book => book.shelf === shelf)

export const titleize = (string) =>
  string
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); })
