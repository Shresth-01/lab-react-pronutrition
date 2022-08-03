import React, { Component } from 'react';
import { Todaysfood } from './Todaysfood'

export default class Food extends Component{

    constructor(props){
        super(props);

        this.state ={
            fruits:[
                {
                    name:'Apple',
                    calories:52,
                    img: 'https://www.pngall.com/wp-content/uploads/11/Apple-PNG-File.png'
                },
                {
                    name:'Banana',
                    calories:89,
                    img:'https://www.pngall.com/wp-content/uploads/2016/04/Banana-Free-Download-PNG-300x225.png'
                },
                {
                    name:'Dates',
                    calories:20,
                    img:'https://www.pngall.com/wp-content/uploads/4/Whole-Dates-PNG-Picture-300x225.png'
                },
                {
                    name:'Grapes',
                    calories:67,
                    img:'https://www.pngall.com/wp-content/uploads/2016/04/Grape-Download-PNG.png'
                },
                {
                    name:'Choclate',
                    calories:546,
                    img:'https://image.shutterstock.com/image-vector/full-choclate-bar-background-vector-260nw-1985592272.jpg'
                },
                {
                    name:'Orange',
                    calories:47,
                    img:'https://www.pngall.com/wp-content/uploads/2016/05/Orange-Free-Download-PNG-300x225.png'
                },
                {
                    name:'Noodles',
                    calories:138,
                    img:'https://www.pngall.com/wp-content/uploads/5/Noodles-PNG-Image.png'
                },
                {
                    name:'Rice',
                    calories: 130,
                    img:'https://www.pngall.com/wp-content/uploads/2018/04/Rice-300x225.png'
                }
            ],

        searchTxt: '', // Data to be searched
        calories_count: 0, // Total calories
        myFruits: [],
    };
  }
    


  searchFruit = (event) => {
    this.setState({
      searchTxt: event.target.value,
    });
  };
    capatalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      };
      // Add fruits to calories section
      addFruit = async (event) => {
        let count = document.getElementById(event.target.value).value;
        let cal = this.state.fruits.filter((fruit) => {
          return fruit.name === event.target.value;
        });
        let fruitObj = {
          id: event.target.value,
          text: `${count} ${event.target.value} = ${cal[0].calories * count}`,
          btn_id: `${event.target.value}R`,
          calo: cal[0].calories * count,
        };
        await this.setState({
          myFruits: this.state.myFruits.concat(fruitObj),
          calories_count: this.state.calories_count + cal[0].calories * count,
        });
        console.log(this.state.myFruits);
      };
      // Remove fruits from calories
      removeFruit = (event) => {
        console.log(event.target.value);
        document.getElementById(event.target.value).remove();
        let calorie = this.state.myFruits.filter((fruit) => {
          return `${fruit.id}R` === event.target.value;
        });
        console.log(calorie);
        this.setState({
          calories_count: this.state.calories_count - calorie[0].calo,
        });
        console.log(calorie[0].calo);
      };
    
      // Main Render method
      render() {
        return (
          <div className="main-container">
            <div className="search-container">
              <h1>Search</h1>
              <input
                type="text"
                placeholder="Find a food"
                onChange={this.searchFruit}
                id="search"
              />
            </div>
            <div className="food-container">
              <div className="left">
                {this.state.fruits
                  .filter((fruit) => {
                    return fruit.name.includes(this.state.searchTxt);
                  })
                  .map((fruit) => {
                    return (
                      <div key={fruit.name} className="fruit">
                        <img src={fruit.img} alt="" />
                        <div className="detail">
                          <h1>{this.capatalize(fruit.name)}</h1>
                          <h4>{fruit.calories}</h4>
                        </div>
                        <div className="count">
                          <input
                            type="number"
                            defaultValue="1"
                            id={fruit.name}
                            min="0"
                          />
                          <button onClick={this.addFruit} value={fruit.name}>
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* <RightSide
                myFruits={this.state.myFruits}
                removeFruit={this.removeFruit}
                calories_count={this.state.calories_count}
              /> */}
              <div className="right">
                <h1>Today's Food {this.state.calories_count} Calories</h1>
                {this.state.myFruits
                  .filter((fruit) => {
                    return fruit.text !== '';
                  })
                  .map((fruit) => {
                    return (
                      <div key={fruit.name} className="item" id={fruit.btn_id}>
                        <span>{fruit.text}</span>
                        <button onClick={this.removeFruit} value={fruit.btn_id}>
                          X
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
    }
  }