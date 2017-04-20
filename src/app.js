var React = require('react');
var ReactDOM = require('react-dom');

require('./style.css');

var Recipes = React.createClass({
    getInitialState: function() {
        const seed = [{
            name: "grilled cheese",
            ingredients: ["bread", "american cheese"],
            editing: false,
            expand: false
        },
        {
            name: "quesadilla",
            ingredients: ["tortilla", "cheese"],
            editing: false,
            expand: false
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
                <RecipeCard recipes={this.state.recipes} toggleExpand={this.toggleExpand} onEdit={this.onEdit} onUpdate={this.onUpdate} onDelete={this.onDelete} />
            </div>
        );
    }, // render

    toggleExpand: function(clickedIndex) {
        var updatedRecipes = this.state.recipes;
        var currentState = updatedRecipes[clickedIndex].expand;
        updatedRecipes[clickedIndex].expand = !currentState;
        this.setState({
            recipes: updatedRecipes
        })
    }, // toggleExpand

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

    onUpdate: function(recipe, i){
        var updatedRecipes = this.state.recipes;

        updatedRecipes[i] = recipe;
        localStorage.setItem('state', JSON.stringify(updatedRecipes));        
        this.setState({
            recipes: updatedRecipes
        });
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
            <form id="edit-recipe" className="card" onSubmit={this.handleUpdate.bind(this, index)}>
                <input type="text" defaultValue={recipe.name} required ref="updatedName" />
                <input type="text" defaultValue={recipe.ingredients} required ref="updatedIngredients" />
                <input type="submit" value="Update" />
            </form>
            )
        } else {
            return(
            <div className="card-content" onDoubleClick={this.handleEdit.bind(this, index)}>
                <span className="delete" onClick={this.handleDelete.bind(this, index)}>X</span>
                <h3>{recipe.name.toUpperCase()}</h3>
                {this.toggleExpand(recipe)}
            </div>
            )
        }
    },
    toggleExpand: function(recipe) {
        if (recipe.expand === true) {
            return(
                <p>{recipe.ingredients.join(', ')}</p>
            )
        }
    },
    render: function() {
            return(
                <div>
                    {this.props.recipes.map(function(recipe, index){
                        return(
                            <div className="card" onClick={this.handleClick.bind(this, index)} key={index}>
                                {this.displayOrEdit(recipe, index)}
                            </div>
                        )
                    }.bind(this))}
                </div>
            )
    }, // render
    handleClick: function(clickedIndex) {
        this.props.toggleExpand(clickedIndex);
    },
    handleEdit: function(clickedIndex) {
        this.props.onEdit(clickedIndex);
    },
    handleDelete: function(clickedIndex) {
        this.props.onDelete(clickedIndex);
    },
    handleUpdate: function(i, e) {
        e.preventDefault();

        var updatedRecipe = {
            name: this.refs.updatedName.value,
            ingredients: this.refs.updatedIngredients.value.split(',')
        }

        this.props.onUpdate(updatedRecipe, i);
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