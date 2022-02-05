import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css'
import { Provider } from 'react-redux'
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PhoneProvider } from './context/phone';
import store from './redux/store'
import { SidebarProvider } from './context/sidebar';


ReactDOM.render(
  <React.StrictMode>
    <PhoneProvider>
      <SidebarProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SidebarProvider>
    </PhoneProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
