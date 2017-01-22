import React from 'react';
import LoggedOutHeader from './shared/components/LoggedOutHeader';
import Footer from './shared/components/Footer';
import Body from './shared/components/Body';
import Splash from './components/Splash';
import Welcome from './components/Welcome';
import Who from './components/Who';
import SignUp from './components/SignUp';

const App = () => (
    <div>
        <LoggedOutHeader/>
        <Body fluid>
            <Splash/>
            <Welcome/>
            <Who/>
            <SignUp/>
        </Body>
        <Footer/>
        </Grid>
    </div>
);

export default App;
