//http://stackoverflow.com/questions/35850871/how-to-connect-state-to-props-with-mobx-js-observer-when-use-es6-class/36164488#36164488
import singleton from 'singleton'
import {observable, computed} from 'mobx'

class Auth extends singleton {

    @observable loggedIn = false

    @computed get isLoggedIn() {
        return this.loggedIn
    }

    login(token) {
        this.loggedIn = true
    }

    logout() {
        this.loggedIn = false
    }
}

export default Auth.get()