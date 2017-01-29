import React from 'react';
import Splash from './components/Splash';
import LoggedOutHeader from './shared/LoggedOutHeader';

const Welcome = () => (
    <div>
        <LoggedOutHeader/>
        <Splash/>
    </div>
);

export default Welcome;
