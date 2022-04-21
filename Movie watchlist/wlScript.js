const watchlistContainer = document.getElementById('wl-results') 
  
const watchlistData = JSON.parse(localStorage.getItem("myMovieWatchlist"))

renderMovies()


function renderMovies() {
    let watchlistHtml 
    watchlistContainer.innerHTML = ``
    if(watchlistData && watchlistData.length > 0) {
        watchlistHtml = watchlistData.join("")
        console.log(watchlistHtml)
        watchlistContainer.innerHTML = watchlistHtml
        setEventListeners()
    } else {
        watchlistContainer.innerHTML = `<div id="initial-wl">
        <h2>Your watchlist is looking a little empty...</h2>
        <a class="wl-add-movie-btn" href="index.html">
        <p>Lets add some movies!</p>
        </a>
        </div>
        `
    }
}


function setEventListeners() {
    const wlBtn = document.getElementsByClassName("wl-btn")
    
    Object.values(wlBtn).forEach( function(item, index) {
        item.addEventListener("click", function() {
            watchlistData.splice(watchlistData[index],1) 
            localStorage.setItem("myMovieWatchlist", JSON.stringify(watchlistData)) 
            setEventListeners()
            renderMovies()           
        })
    })
}

function findFilmBtn(){
    window.location="index.html"
}