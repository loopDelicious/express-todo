const React = require('react');
const $ = require('jquery');

module.exports = React.createClass({

    getInitialState: function() {
        return ({
            data: '',
            complete: false
        })
    },

    handleForm: function(e) {
        e.preventDefault();

        var data = this.refs.data.value;

        $.ajax({
            url: this.state.complete ? '/login' : '/register',
            method: 'post',
            data: data,
            success: function() {
                this.props.loginCallback();
            }.bind(this),
            error: function(res) {
                alert(res.error)
            },
        })
    },

    render: function() {
        return (
            <div>
                <form id='task-input' onSubmit={this.handleForm} >

                    <input className="text task" ref="new-task" placeholder="Add an item to the TODO list" autoFocus="true" />
                    <button className='button' type="submit">Submit</button>

                </form>
            </div>
        )
    },

});