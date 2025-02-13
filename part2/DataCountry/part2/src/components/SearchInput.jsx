const SearchInput =({search, onSearchChange}) =>{
    return(
        <div>
            <h1>Country Finder</h1>
            <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search for a country"
            />
        </div>

    )
}

export default SearchInput