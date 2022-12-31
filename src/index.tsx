import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {green, lightBlue} from "@material-ui/core/colors";
import {CssBaseline} from "@material-ui/core";
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./reducers/store";

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: green,
        type: "dark",
    },
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>
);

// root.render(
//     <React.StrictMode>
//         <ThemeProvider theme={theme}>
//             <CssBaseline/>
//             {/*<App />*/}
//             <AppWithReducer/>
//         </ThemeProvider>
//     </React.StrictMode>
// );

reportWebVitals();
