import React from "react";
import { useState,useEffect } from "react";
const BookFavorite=()=> {
    const [page, setPage] = useState([])
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
      const fav = page.map(item => (
      <div className="listmovie" key={item.id}>
        <div className="imagenya">
          <img className="imgstyle" src={item.Poster} alt="" />
        </div>
        <div className="title">
          <h3>{item.Title}</h3>
          <p>
            <br />
            <span>{item.Year}</span>
            <button onClick={() => page.delete(item.id)}>
              Delete from Favorite
            </button>
          </p>
        </div>
      </div>
    ));
    return (
      <div>
        <h2>Favorite</h2>
        {fav}
      </div>
    );
  }


export default BookFavorite;