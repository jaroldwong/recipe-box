var React = require('react');
var ReactDOM = require('react-dom');

require('./style.css');

var Recipes = React.createClass({
    render: function() {
        return(
            <div>
                Recipe Box
            </div>
        );
    }
});

ReactDOM.render(<Recipes />, document.getElementById('root'));