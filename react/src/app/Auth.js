//http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
import singleton from 'singleton'

class Auth extends singleton {
    get isLoggedIn() {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).authenticated : false
    }

    login(token) {
        localStorage.setItem('user', JSON.stringify({authenticated: true}))
    }

    logout() {
        localStorage.setItem('user', JSON.stringify({authenticated: false}))
    }
}

export default Auth.get()