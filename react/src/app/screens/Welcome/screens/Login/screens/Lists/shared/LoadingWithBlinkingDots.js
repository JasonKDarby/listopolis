//Credit to Chris Nager!  http://codepen.io/chrisnager/pen/yfwgE
import React from 'react';
import './LoadingWithBlinkingDots.css';

export default () => (
    <div className="loader">
        {/*Not a fan of this array but it's js so...*/}
        Loading{ [1,2, 3].map(x => <span className="loader__dot" key={x}>.</span>) }
    </div>
);
