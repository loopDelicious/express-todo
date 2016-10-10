const React = require('react');
const $ = require('jquery');

module.exports = React.createClass({

    getInitialState: function() {
        return ({
            loggedIn: false,
            existingUser: true
        })
    },

    handleToggle: function() {
        this.state.existingUser = !this.state.existingUser;
        this.setState({
            existingUser: this.state.existingUser
        });
    },

    handleForm: function(e) {
        e.preventDefault();

        var email = this.refs.email.value;
        var password = this.state.existingUser ? this.refs.password.value : null;

        $.ajax({
            url: this.state.existingUser ? '/login' : '/register',
            method: 'post',
            data: {
                email: email,
                password: password,
            },
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
                <form id='login-container' onSubmit={this.handleForm} >
                    <span className="login-intro">{this.state.existingUser ? 'Log in' : 'Create an account'}</span>
                    <input className="text email" ref="email" placeholder="email address" autoFocus="true" />
                    {this.state.existingUser ?
                        <input className="text password" ref="password" placeholder="password" />
                        : null}
                    <button className='button' type="submit">Submit</button>

                    {/*<a className='login-link' href="...">Forgot Password</a>*/}
                    <a className='login-link' onClick={this.handleToggle}>
                        {this.state.existingUser ? 'Create an account' : 'Have an account? Log in.'}
                    </a>
                </form>
            </div>
        )
    },

});