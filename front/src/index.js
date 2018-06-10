
// // matrial-ui
// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';
// // UI框架
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// //  自定义主题
// import muiTheme from './material/views/theme'
// import store from './material/store';
// // 页面元素
// import Main from './material/views/main';
// import registerServiceWorker from './registerServiceWorker';
// ReactDOM.render(
//     <Provider store={store}>
//         <MuiThemeProvider muiTheme={muiTheme}>
//             <Main />
//         </MuiThemeProvider>
//     </Provider>
//     ,
// document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './rsuite/store';
import Enter from './rsuite/views/enter'
// import default style
import 'rsuite/dist/styles/rsuite.min.css';
ReactDOM.render(
    <Provider store={store}>
        <Enter />
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();


// import React from 'react';
// import ReactDOM from 'react-dom';

// import registerServiceWorker from './registerServiceWorker';

// import BasicExample from './routerTest/routerTest'
// // import default style
// import 'rsuite/dist/styles/rsuite.min.css';
// ReactDOM.render(
//     <BasicExample />
//     ,
// document.getElementById('root'));
// registerServiceWorker();