const searchbtn = document.getElementById("search-btn")
const searchText = document.getElementById("search-text")
const cardContainer = document.getElementById("results")
const wlBtn = document.getElementsByClassName("wl-btn")
const wlCardContainer = document.getElementById("results-wl")
const wlPageBtn = document.getElementById("wl-page-btn")
let myStorage = localStorage.getItem("myMovieWatchlist") ? JSON.parse(localStorage.getItem("myMovieWatchlist")) : []
let movieInfo = []


searchbtn.addEventListener("click", function () {
  cardContainer.innerHTML=``
  /* GRAB MOVIE ID */
  const movieData = async () => {
    const res = await fetch(`https://www.omdbapi.com/?s=${searchText.value}&page=1&apikey=5d2b5f4d`)
    const data = await res.json()
    if(data.Response = 'true'){
      /*loop through array + search multiple films */
      const movieId = data.Search.map(id => id.imdbID)
      for (ids of movieId) {
        const res = await fetch(`https://www.omdbapi.com/?i=${ids}&apikey=5d2b5f4d`)
        const data = await res.json()
        cardContainer.innerHTML += htmlText(data)
        movieInfo.push(htmlText(data, "remove"))
        
      }
      Object.values(wlBtn).forEach( (item, index) => {
        item.addEventListener("click", function() {
          myStorage.push(movieInfo[index])
          localStorage.setItem("myMovieWatchlist", JSON.stringify(myStorage))  
        })
      })
    }
    else{
      console.log("nope")
      cardContainer.innerHTML = `
      <div class="default">
       <h2>Sorry, We are unable to find that film :(</h2>
       <img src="images/film.png">
     </div>`
    }
  }
  movieData()

})


function htmlText(data, btnType = "add") {
  const  addBtnHtml = `<button id="watchlist-btn"><img id="small-icon"src="images/plus.png"> <p id="icon-text">Watchlist</p>
  </button>`
  const removeBtnHtml = `<button id="watchlist-btn"><img id="small-icon"src="images/minus.png"> <p id="icon-text">Watchlist</p>`
  return `
            <div class="movie-card">
                <img src="${data.Poster}">
                <div class="card-text">
                    <div class="card-top">
                        <h2>${data.Title}</h2>
                        <h3><img id="small-icon"src="images/star.png">Rating : ${data.imdbRating}</h3>
                    </div>
                    <div class="sub-info">
                        <h3>${data.Runtime}</h3>
                        <h3>${data.Genre}</h3>
                        <div class="wl-btn" >
                         ${btnType === "add" ? addBtnHtml : btnType === "remove" ? removeBtnHtml : ""}
                         </div>
                    </div>
                    <div class="movie-info">
                        <p>${data.Plot}</p>
                    </div>
              </div>
            </div>
         `
}

function watchlistPage(){
  window.location = "watchlist.html"
}