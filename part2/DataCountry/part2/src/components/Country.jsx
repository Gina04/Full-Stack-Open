const Country = ({showAll, onHandlerChange}) =>{
    return(
        <div>
            <label>finde countries:</label>
            <input value={showAll} onChange={onHandlerChange}/>
        </div>
    )
}

export default Country;