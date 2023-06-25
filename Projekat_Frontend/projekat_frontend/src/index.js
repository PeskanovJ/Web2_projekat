import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GoogleOAuthProvider clientId="56381202791-epanc1l1qkuqj5ah9hm84v383f6og7c4.apps.googleusercontent.com">
<React.StrictMode>
    <App />
</React.StrictMode>
</GoogleOAuthProvider>);


