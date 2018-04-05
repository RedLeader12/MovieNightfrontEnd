import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import config from '../config.json';


import MovieController from './MovieController';
import Movie from '../containers/Movie';
import Description from '../containers/Description';
import Styles from '../styles/baseStyling';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      description: ''
    };
  }

  descriptionShowHandler = (index) => {
    this.setState({ show: true }, function state() {
      console.log(this.state.show);
      this.descriptionSelectHandler(index);
    });
  }

  descriptionSelectHandler = (index) => {
    if (this.state.show === true) {
      const selected = this.props.list[index].overview;
      this.setState({ description: selected }, function state() {
        console.log(this.state.description);
      });
    }
  }

  resetDescriptionHandler = () => {
    this.setState({ description: '', show: false }, function state() {
      console.log(this.state.description);
      console.log(this.state.show);
    });
  };

  addMovietoFavouritesHandler = (index) => {
    const movie = this.props.list[index];
    axios.post(config.database, {
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      vote_average: movie.vote_average,
      popularity: movie.popularity,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    let buttonName = null;
    if (this.props.button === 'discover') {
      buttonName = '♥';
    } else {
      buttonName = 'Delete';
    }

    const list = this.props.list.map((movie, index) => (
      <Movie
        key={movie.id}
        movie={movie}
        index={index}
        onClickInfo={() => this.descriptionShowHandler(index)}
        show={this.state.show}
        buttonName={buttonName}
        buttonNameClick={() => this.addMovietoFavouritesHandler(index)}
      />
    ));

    let overview = null;
    if (this.state.show === true) {
      overview = (<Description
        overview={this.state.description}
        onClick={this.resetDescriptionHandler}
      />);
    } else {
      overview = null;
    }


    return (
      <div>
        {list}
        {overview}
      </div>
    );
  }
}

export default MovieList;
