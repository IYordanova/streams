import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '597723345482-fu6q5sv4nr9s9oqnbvc04fbc5abemau9.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen((A) => this.onAuthChange(A));
            });
        });
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    onAuthChange = (isSignedIn) => {
        console.log(isSignedIn)
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        if (this.props.isSignedIn) {
            return (
                <button onClick={ this.onSignOut } className="ui red google button">
                 <i className="google icon"/>
                 Sign out
                </button>
             );
        }
        if (!this.props.isSignedIn) {
            return (
              <button onClick={ this.onSignIn } className="ui red google button">
               <i className="google icon"/>
               Sign in with Google
              </button>
           );
        }
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
