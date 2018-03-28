import React, { Component } from 'react';
import config from '../config.json'
import axios from 'axios'
import qs from 'qs'

import Styles from '../styles/baseStyling'
import Movie from '../components/Movie.js'

class MovieList extends Component {
    constructor(props) {
    super(props)
        this.state = {
        moviesList: [],
        search: ''
        }
    }

componentDidMount() {
  let self=this;

    window.fetch(config.api)
        .then(function(results) {
        return results.json();
        })
        .then(function(data){
            console.log(data.results)
            let final = data.results
            final.map(movie => {
                let number = movie.popularity
                movie.popularity = Math.round( number * 10 ) / 10;
                return movie 
            })
            self.setState({
            moviesList: final
            })
        })
        .catch(function(error) {
        console.log(error)
        });
}

componentDidUpdate() {
    let self=this;
    if(this.state.search.length > 0){
        window.fetch(config.queryApi + this.state.search + '&page=1')
        .then(function(results) {
        return results.json();
        })
        .then(function(data){
            console.log(data.results)
            let final = data.results
            final.map(movie => {
                let number = movie.popularity
                movie.popularity = Math.round( number * 10 ) / 10;
                return movie 
            })
            self.setState({
            moviesList: final
            })
        })
        .catch(function(error) {
        console.log(error)
        }); 
    }
}

searchInputHandler = (event) => {
    let string = event.target.value
    let changedString = string.split(' ').join('20%')
    this.setState({ search: changedString}) 
    console.log(this.state.search)
  }

favouriteSelectHandler = (index) => {
    let selected = this.state.moviesList[index]

    axios.post(config.database, {
        overview: selected.overview ,
        poster_path: selected.poster_path,
        release_date: selected.release_date,
        title: selected.title, 
        vote_average: selected.vote_average,
        popularity: selected.popularity,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.config);
      });
}

render() {

    let movies = this.state.moviesList.map((movie, index) =>(
        <Movie
        key = {index}
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        posterPath={"https://image.tmdb.org/t/p/w200"+ movie.poster_path}
        popularity={movie.popularity}
        onClick={() => this.favouriteSelectHandler(index)}
        /> 
    ))

    return (
        <div >
        <input type="text" name="search" onChange={this.searchInputHandler}/>
        <div className="MovieList" style={localStyles.MovieList}> 
            {movies}
        </div> 
        </div>
    );
  }
}
    
export default MovieList;

const localStyles = { 
    MovieList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 30, 
        border: '2px solid green'
    },
  }