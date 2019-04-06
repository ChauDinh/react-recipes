import React, { Component } from 'react';

import {recipes} from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

import './App.css';

class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=a7f36b988578bb2cf1aaf95f8f3db9c1",
    base_url: "https://www.food2fork.com/api/search?key=a7f36b988578bb2cf1aaf95f8f3db9c1",
    details_id: 35375,
    pageIndex: 1,
    search: "",
    query: '&q='
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
          <RecipeList 
            recipes={this.state.recipes} 
            handleDetails={this.handleDetails} 
            value={this.state.search} 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
          />
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

  handleChange = e => {
    this.setState({
      search: e.target.value
    }, () => console.log(this.state.search))
  }

  handleSubmit = e => {
    e.preventDefault();
    const {base_url, query, search} = this.state;

    this.setState(() => {
      return {
        url: `${base_url}${query}${search}`,
        search: ""
      }
    }, () => {
      this.getRecipes();
    })
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
