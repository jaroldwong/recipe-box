var React = require('react');
var ReactDOM = require('react-dom');

require('./style.css');

var Recipes = React.createClass({
    getInitialState: function() {
        const seed = [{
            name: "grilled cheese",
            ingredients: ["bread", "american cheese"],
            editing: false
        },
        {
            name: "quesadilla",
            ingredients: ["tortilla", "cheese"],
            editing: false
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
                <RecipeCard recipes={this.state.recipes} onEdit={this.onEdit} onUpdate={this.onUpdate} onDelete={this.onDelete} />
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

    onEdit: function(clickedIndex) {
        var updatedRecipes = this.state.recipes;

        updatedRecipes[clickedIndex].editing = true;
        this.setState({
            recipes: updatedRecipes
        })
    }, // onEdit

    onUpdate: function(recipe){
        console.log(recipe)
    }, // onUpdate

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
    displayOrEdit: function(recipe, index) {
        if (recipe.editing === true) {
            return(
            <form id="edit-recipe" className="card" onSubmit={this.handleUpdate}>
                <input type="text" placeholder={recipe.name} required ref="updatedName" />
                <input type="text" placeholder={recipe.ingredients} required ref="updatedIngredients" />
                <input type="submit" value="Update" />
            </form>
            )
        } else {
            return(
            <div onDoubleClick={this.handleEdit.bind(this, index)}>
                <span onClick={this.handleDelete.bind(this, index)}>X</span>
                <h3>{recipe.name.toUpperCase()}</h3>
                <p>{recipe.ingredients.join(', ')}</p>
            </div>
            )
        }
    },
    render: function() {
            return(
                <div>
                    {this.props.recipes.map(function(recipe, index){
                        return(
                            <div className="card" key={index}>
                                {this.displayOrEdit(recipe, index)}
                            </div>
                        )
                    }.bind(this))}
                </div>
            )
    }, // render
    handleEdit: function(clickedIndex) {
        this.props.onEdit(clickedIndex);
    },
    handleDelete: function(clickedIndex) {
        this.props.onDelete(clickedIndex);
    },
    handleUpdate: function(e) {
        e.preventDefault();

        var updatedRecipe = {
            name: this.refs.updatedName.value,
            ingredients: this.refs.updatedIngredients.value.split(',')
        }

        this.props.onUpdate(updatedRecipe);
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