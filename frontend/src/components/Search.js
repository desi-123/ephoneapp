import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const searchHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <form onSubmit={searchHandler}>
      <div className="input-search">
        <input
          type="text"
          id="search_field"
          className="input-search--input"
          placeholder="Enter Phone Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-search">
          <button className="input-search--btn">
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
