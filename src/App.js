import React, { Component } from 'react';

import {recipes} from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

import './App.css';

class App extends Component {
  state = {
    recipes: [],
    url: "https://www.food2fork.com/api/search?key=a7f36b988578bb2cf1aaf95f8f3db9c1"
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({
        recipes: jsonData.recipes
      })
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <RecipeList />
        <RecipeDetails />
      </React.Fragment>
    );
  }
}

export default App;
