require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import FoodCard from './FoodCard'

class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      cards: [{}]
    }
  }

  addCard(e) {
    e.preventDefault();

    this.state.cards.push({});

    this.setState({
      cards: this.state.cards
    });
  }

  updateCard(id, data) {
    this.state.cards[id] = data;

    var emptyCards = this.state.cards.reduce(function (e, f) {
      e += !f.name ? 1 : 0;
      return e;
    }, 0);

    if (emptyCards === 0) {
      this.state.cards.unshift({})
    }

    this.setState({
      cards: this.state.cards
    });
  }

  getMetrics(cards) {
    console.log(cards);

    return cards.reduce(function (e, f) {
      if (!f.fats) { return e; }

      e.n = e.n || 0;

      let getTotals = function (keys, e, f) {
        keys.forEach(function (e, f, key) {
          e[key] = e[key] ? e[key] + (f[key] * f.amt) : f[key] * f.amt;
        }.bind(this, e, f));

        return e;
      }

      return getTotals(['amt', 'calories', 'fats', 'satFats', 'carbs', 'sugars'], e, f);
    }, {});
  }

  render() {
    var renderCard = function (card, id) {
      return (
        <FoodCard key={ id } data={ card } onUpdate={ this.updateCard.bind(this, id) }></FoodCard>
      )
    }

    let metrics = this.getMetrics(this.state.cards);

    return (
      <div className="index container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Welcome to Foodie</h1>
            <h3>What are you eating?</h3>
            <div className="metrics row">
              <div className="col-sm-3">
                <h1>{ Math.round(metrics.calories) }</h1>
                <strong>Calories</strong>
              </div>
              <div className="col-sm-3">
                <h1>{ Math.round(metrics.fats) }g</h1>
                <strong>Fat</strong>
              </div>
              <div className="col-sm-3">
                <h1>{ Math.round(metrics.sugars) }g</h1>
                <strong>Sugars</strong>
              </div>
            </div>
            <div className="cards">
              { this.state.cards.map(renderCard.bind(this)) }
            </div>
            <div className="add-card">
              <a href="" onClick={ this.addCard.bind(this) }>+ Add Card</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
