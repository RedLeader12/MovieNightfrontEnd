import React, { Component } from 'react';
import FavouritesList from '../containers/FavouritesList';

class Favourite extends Component {
  render () {
    return (
        <div className="FavouritesList">
            <img src={this.props.posterPath} /> 
            <span> {this.props.title} </span>
        </div>
    );
  }
}
export default Favourite;
