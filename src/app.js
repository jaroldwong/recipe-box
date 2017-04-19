var React = require('react');
var ReactDOM = require('react-dom');

require('./style.css');

var Recipes = React.createClass({
    getInitialState: function() {
        return {
                recipes: [
                    {name: "grilled cheese", ingredients: ["bread", "american cheese"]},
                    {name: "quesadilla", ingredients: ["tortilla", "cheese"]}
                ]
        };
    }, // getInitialState
    render: function() {
        return(
            <div>
                <h1>Recipe Box</h1>
                <RecipeCard recipes={this.state.recipes} />
            </div>
        );
    }, // render
});

var RecipeCard = React.createClass({
    render: function() {
        return(
            <div>
                {this.props.recipes.map(function(recipe, index){
                    return(
                        <div className="card" key={index}>
                            <h3>{recipe.name.toUpperCase()}</h3>
                            <p>{recipe.ingredients.join(', ')}</p>
                        </div>
                    )
                })}
            </div>
        )
    }, // render
})

ReactDOM.render(<Recipes />, document.getElementById('root'));