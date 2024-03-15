import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {StoreContext} from './store/page/context'
import {pageStore} from './store/page/index'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <StoreContext.Provider value={pageStore}>
            <App/>
        </StoreContext.Provider>
    </React.StrictMode>
);
