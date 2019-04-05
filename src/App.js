import React, { Component } from 'react';

import {recipes} from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

import './App.css';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=a7f36b988578bb2cf1aaf95f8f3db9c1",
    details_id: 35375,
    pageIndex: 0
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

  componentDidMount() {
    this.getRecipes();
  }

  displayRecipeDetailOrRecipeList = (index) => {
    switch(index) {
      default: 
      case 1:
        return (
          <RecipeList recipes={this.state.recipes} />
        )
      case 0:
        return (
          <RecipeDetails 
            id={this.state.details_id} 
            handleIndex={this.handleIndex} 
          />
        )
    }
  }

  handleIndex = index => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  }

  render() {
    // console.log(this.state.recipes);

    return (
      <React.Fragment>
        {this.displayRecipeDetailOrRecipeList(this.state.pageIndex)}
      </React.Fragment>
    );
  }
}

export default App;
