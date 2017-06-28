require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import $ from 'jquery';
import FoodCard from './FoodCard'

class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      food: null,
      foods: [],
      amt: null
    }
  }

  updateFood() {
    let val = $('.food-input').val();

    let occ = this.state.foods.reduce(function (e, f) {
      if (f.name == val) { e = f; }
      return e;
    }, {});

    if (occ.name) {
      this.setState({
        food: occ
      });

      if (this.state.amt.value) {
        this.getProfile.bind(this)();
      }

      return;
    }

    $.get('http://localhost:3000/api/food?q=' + val).then(function (res) {
      console.log(val, res);
      this.setState({
        foods: res.results
      })
    }.bind(this));
  }

  updateAmt() {
    this.state.amt = {
      value: $('.amt-input').val(),
      text: $('.amt-input option:selected').text()
    };

    if (this.state.food.id) {
      this.getProfile.bind(this)();
    }

    this.setState({
      amt: this.state.amt
    });
  }

  getProfile() {
    $.get('http://localhost:3000/api/food/' + this.state.food.id).then(function (res) {
      this.setState({
        profile: res.results
      });

      res.results.amt = this.state.amt.value;

      this.props.onUpdate(res.results);
    }.bind(this));
  }

  editCard() {
    this.setState({
      profile: undefined
    })
  }

  onComponentDidMount() {
    $('.food-input').focus();
  }

  render() {
    var amt = null;

    if (this.state.food) {
      amt = (
        <select onChange={ this.updateAmt.bind(this) } className="amt-input form-control input-lg input-block">
          <option>-- Select --</option>
          <option value={ 19 }>Grape-sized Amount</option>
          <option value={ 38 }>Golf-ball-sized Amount</option>
          <option value={ 164 }>Tennis Ball sized amount</option>
          <option value={ 229 }>Baseball sized amount</option>
          <option value={ 477 }>Softball sized amount</option>
          <option value={ 7058 }>Basketball sized amount (no...)</option>
        </select>
      )
    }

    let renderDatalist = function (food) {
      let update = function (e) {
        e.preventDefault();
        $('.food-input').val(food.name);

        this.setState({
          foods: []
        });

        this.updateFood.bind(this)();
      }

      return (
        <a key = { food.id } href="" onClick={ update.bind(this) }>{ food.name }</a>
      )
    }

    if (this.state.food && this.state.amt && this.state.profile) {
      return (
        <div className="food-card">
          <div className="row">
            <div className="col-xs-12">
              <h1>{ Math.round(this.state.profile.calories * this.state.amt.value) }</h1>
              <strong>Calories</strong>
              <p>{ this.state.amt.text } of { this.state.food.name }</p>
              <a href="" onClick={ this.editCard.bind(this) }>Edit</a>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="food-card">
        <div className="row">
          <div className="col-xs-12">
            <input autoFocus list="food-list" onKeyUp = { this.updateFood.bind(this) } className="food-input form-control input-lg input-block" placeholder="Search foods..." />
            <div id="food-list">
              { this.state.foods.map(renderDatalist.bind(this)) }
            </div>
            { amt }
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
  data: {}
};

export default AppComponent;
