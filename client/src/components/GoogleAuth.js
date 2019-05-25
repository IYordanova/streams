import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    signInSuccess

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '597723345482-fu6q5sv4nr9s9oqnbvc04fbc5abemau9.apps.googleusercontent.com',
                scope: 'email'
            }).then((a) => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.auth.attachClickHandler(
                    document.getElementById('signInButton'),
                    {},
                    (googleUser) => {
                      this.currentUser = googleUser;
                      this.onAuthChange(true);
                    },
                    (error) => {
                      console.error(error);
                    }
                );
                this.onAuthChange(this.currentUser);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.currentUser.getId());
        } else {
            this.props.signOut();
        }
    }

    signOut = (e) => {
        e.preventDefault();
        this.auth.signOut();
        this.onAuthChange(false);
    }

    renderAuthButton() {
        return (
            <div>
                <button id="signInButton" className="ui red google button" style={{display: `${!this.props.isSignedIn ? 'inline-block' : 'none'}`}}>
                    <i className="google icon"/>
                    Sign in with Google
                </button>
                <button id="signOutButton" className="ui red google button" onClick={ this.signOut } style={{display: `${this.props.isSignedIn ? 'inline-block' : 'none'}`}}>
                    <i className="google icon"/>
                    Sign out
                </button>
            </div>
         );
    }

    render() {
        return (
            <div>
               { this.renderAuthButton() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
