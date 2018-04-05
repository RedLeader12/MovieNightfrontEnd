import React, { Component } from 'react';
import MovieList from '../controllers/MovieList';


const Movie = props => (
  <div className="Movie">
    <img src={`https://image.tmdb.org/t/p/w200${props.movie.poster_path}`} alt="" />
    <span> {props.movie.vote_average} </span>
    <span> {props.movie.title} </span>
    <button onClick={props.onClickInfo}> More Info </button>
    <button onClick={props.buttonNameClick}> {props.buttonName} </button>

  </div>
);


export default Movie;
