import React from 'react'

function BookInfo() {
  return (
      <div><ul class="nav justify-content-center">
          <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Book List</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Issued Books</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Issue</a>
          </li>
          <li class="nav-item">
              <a class="nav-link " href="/AddBook" >Add Book</a>
          </li>
      </ul></div>
  )
}

export default BookInfo