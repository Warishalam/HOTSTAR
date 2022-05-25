document.querySelector('#searchBar').addEventListener('input', () => {
    debounce(getMoviesList, 1000);
 })
 
 
 async function getMoviesList(){
     try {
         let movieName = document.querySelector('#searchBar').value;
         var result = await fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=99729c5e`)
         var moviesList = await result.json();
         // console.log(moviesList)
         if(moviesList.Response=='True'){
             showMovieList(moviesList.Search);
         }
         else{
             var error = document.createElement('h2');
             error.innerText = moviesList.Error;
             error.setAttribute('id','errorHead');
             document.getElementById('card').append(error);
         }
 
     } catch (error) {
         console.log(error);
     }
    }
 
 //--------> DEBOUNCE
 let timerId;
 function debounce (func, wait){
     if(timerId){
         clearTimeout(timerId);
     }
     timerId = setTimeout(func, wait);
 }
 //---------> DEBOUNCE
 
 function showMovieList(data){
     document.getElementById('movieList').innerHTML='';
     document.getElementById('movieList').style.border ='1px solid #ccccb3';
     data.forEach(element => {
         var div = document.createElement('div');
         div.setAttribute('class','moviesDiv')
 
         var image = document.createElement('img');
         image.src = element.Poster;
         image.setAttribute('class','moviesImage');
 
         var title = document.createElement('p');
         title.innerText = element.Title;
         title.setAttribute('class', 'titles');
 
         div.addEventListener('click', () => {
             // console.log(element.Title);
             getMovieData(element.Title);
             document.querySelector('#searchBar').value='';
             document.getElementById('movieList').innerHTML='';
             document.getElementById('movieList').style.border ='none'
         })
 
         div.append(image,title);
         document.getElementById('movieList').append(div);
     });
 }
 
 async function getMovieData(movieName){
     try {
         var result = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey={Enter your API}`)
         var movieData = await result.json();
         // console.log(movieData)
         displayCard(movieData);
 
     } catch (error) {
         console.log(error);
     }
 }
 
 function displayCard(data){
     document.getElementById('card').innerHTML='';
 
     var div = document.createElement('div');
     div.setAttribute('id','movieCard');
 
     var image = document.createElement('img');
     image.src=data.Poster;
     image.setAttribute('id','cardImage');
 
     var title = document.createElement('h2');
     title.innerText = data.Title;
     title.setAttribute('id', 'title');
 
     var released = document.createElement('p');
     released.innerText = 'Release Date : '+ data.Released;
     released.setAttribute('id', 'released');
 
     var genre = document.createElement('p');
     genre.innerText = 'Genre : '+ data.Genre;
     genre.setAttribute('id', 'genre');
 
     var imdbRating = document.createElement('p');
     imdbRating.innerText = 'imdb Rating : '+ data.imdbRating;
     imdbRating.setAttribute('id', 'imdbRating');
 
     div.append(image,title,genre,released,imdbRating);
     document.getElementById('card').append(div)
 }