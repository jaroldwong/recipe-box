var React = require('react');
var ReactDOM = require('react-dom');

require('./style.css');

var Recipes = React.createClass({
    getInitialState: function() {
        const seed = [{
            name: "grilled cheese",
            ingredients: ["bread", "american cheese"]
        },
        {
            name: "quesadilla",
            ingredients: ["tortilla", "cheese"]
        }
        ];

        const data = JSON.parse(localStorage.getItem('state')) || seed;
        return {recipes: data}
    }, // getInitialState
    render: function() {
        return(
            <div>
                <h1>Recipe Box</h1>
                <AddRecipe onAdd={this.onAdd} />
                <RecipeCard recipes={this.state.recipes} onDelete={this.onDelete} />
            </div>
        );
    }, // render

    onAdd: function(recipe) {
        var updatedRecipes = this.state.recipes;
        updatedRecipes.push(recipe);
        localStorage.setItem('state', JSON.stringify(updatedRecipes));
        this.setState({
            recipes: updatedRecipes
        })
    }, // onAdd

    onDelete: function(clickedIndex) {
        var updatedRecipes = this.state.recipes.filter(function(el, index){
            return index !== clickedIndex;
        });
        localStorage.setItem('state', JSON.stringify(updatedRecipes));        
        this.setState({
            recipes: updatedRecipes
        });
    }
});

var RecipeCard = React.createClass({
    render: function() {
        return(
            <div>
                {this.props.recipes.map(function(recipe, index){
                    return(
                        <div className="card" key={index}>
                            <span onClick={this.handleDelete.bind(this, index)}>X</span>
                            <h3>{recipe.name.toUpperCase()}</h3>
                            <p>{recipe.ingredients.join(', ')}</p>
                        </div>
                    )
                }.bind(this))}
            </div>
        )
    }, // render
    handleDelete: function(clickedIndex) {
        this.props.onDelete(clickedIndex);
    }
})

var AddRecipe = React.createClass({
    render: function() {
        return(
            <form id="add-recipe" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Name" required ref="newName" />
                <input type="text" placeholder="Ingredients (CSV)" required ref="newIngredients" />
                <input type="submit" value="Yum!" />
            </form>
        )
    }, // render

    handleSubmit: function(e) {
        e.preventDefault();

        var newRecipe = {
            name: this.refs.newName.value,
            ingredients: this.refs.newIngredients.value.split(',')
        }
        this.props.onAdd(newRecipe);

        this.refs.newName.value = "";
        this.refs.newIngredients.value = "";
    } // handleSubmit
})

ReactDOM.render(<Recipes />, document.getElementById('root'));