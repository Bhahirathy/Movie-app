import './App.css';
import { createContext, useEffect, useState } from "react"
import Pagination from './components/pagination';
import BookFavorite from './components/favourites';
export const store = createContext()

function App() {
  const [page, setPage] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const showPerPage = 10
  const [pagination, setPagination] = useState({ start: 0, end: showPerPage })
  const [favourites, setFavourites] = useState([]);
  const [search,setSearch]=useState("")
  const [cardViewIsActive, setCardViewIsActive] = useState(false);
  const [SelectedIndex,setSelectedIndex]=useState([])

  useEffect(() => {
    fetch("https://fake-movie-database-api.herokuapp.com/api?s=Star%20Wars").then((a) =>
      a.json()
    ).then((res) => {
      setPage(res.Search)
      console.log(res)
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  const onPageChange = (start, end) => {
    setPagination({ start: start, end: end })
  }
  const addToFavorite = id => {
    const data = page.find(item => item.id === id);
    setFavourites(...favourites,data);
  };
  const openCardView = (e, index) => {
    e.preventDefault();
    setCardViewIsActive(!cardViewIsActive);
    setSelectedIndex(index)
  };
 
	
  return (
    <>
      <form className="search">
        <input  onChange={(e) => { setSearchTerm(e.target.value) }} type="text" placeholder='search'></input>
        <button >Search</button>
      </form>
      <div className='container'>
        {
          page.filter((user) => {
            const search = user.Title
            if (searchTerm === "") {
              return user
            } else if (search.toLowerCase().includes(searchTerm.toLowerCase())) {
              return user
            }
          }).slice(pagination.start, pagination.end).map((val,index) => {
            return (
              <>
                <div className='box' >
                  <div className='content'>
                    <h3>{val.Title}</h3>
                    <p>{val.Year}</p>
                  </div>
                  <img src={val.Poster}onClick={(e) => openCardView(e, index)} alt=""></img>
                  <button onClick={addToFavorite}> Add To Favourites</button>
               
                </div>
                <div className='pagenation'>
                  <Pagination showPerPage={showPerPage} total={page.length} onPageChange={onPageChange} />

                </div>
                <div className="container-right">
            {/* <BookFavorite><button onClick={addToFavorite}>Favourites</button></BookFavorite>  */}
            
          </div>
              </>
            )
          })}
      </div>

    </>


  )
}

export default App;
