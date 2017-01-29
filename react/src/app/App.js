import React from 'react'

//If user is logged in then we should direct to the main page.
//If user is not logged in then we should direct to the welcome page.

const App = (props) => (
    <div>{props.children}</div>
)

export default App
