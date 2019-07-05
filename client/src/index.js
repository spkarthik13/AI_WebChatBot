import React from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWorker.register();

//adding a comment