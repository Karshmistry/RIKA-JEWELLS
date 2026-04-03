// // // // // import React from "react";
// // // // // import ReactDOM from "react-dom/client";
// // // // // import App from "./App";
// // // // // import { BrowserRouter } from "react-router-dom";

// // // // // const root = ReactDOM.createRoot(document.getElementById("root"));

// // // // // root.render(
// // // // //   <BrowserRouter>
// // // // //     <App />
// // // // //   </BrowserRouter>
// // // // // );
// // // // import React from "react";
// // // // import ReactDOM from "react-dom/client";
// // // // import App from "./App";
// // // // import { BrowserRouter } from "react-router-dom";

// // // // const root = ReactDOM.createRoot(document.getElementById("root"));

// // // // root.render(
// // // //   <BrowserRouter>
// // // //     <App />
// // // //   </BrowserRouter>
// // // // );


// // // import React from "react";
// // // import ReactDOM from "react-dom/client";
// // // import App from "./App";
// // // import ErrorBoundary from './components/ErrorBoundary';
// // // import { BrowserRouter } from "react-router-dom";

// // // const root = ReactDOM.createRoot(document.getElementById("root"));

// // // root.render(
// // //   <BrowserRouter>
// // //     <App />

// // //   </BrowserRouter>


// // // );


// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import App from "./App";
// // import ErrorBoundary from './components/ErrorBoundary';
// // import { BrowserRouter } from "react-router-dom";

// // const root = ReactDOM.createRoot(document.getElementById("root"));

// // root.render(
// //   <React.StrictMode>
// //     <ErrorBoundary>
// //       <BrowserRouter>
// //         <App />
// //       </BrowserRouter>
// //     </ErrorBoundary>
// //   </React.StrictMode>
// // );


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import ErrorBoundary from './components/ErrorBoundary';
// import { BrowserRouter } from "react-router-dom";

// // Add this debug helper to find where object is being rendered
// const originalConsoleError = console.error;
// console.error = function(...args) {
//   if (args[0] && args[0].toString().includes('Objects are not valid as a React child')) {
//     console.log("🔍 Found object rendering error!");
//     console.trace(); // This shows the call stack
//   }
//   originalConsoleError.apply(console, args);
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <ErrorBoundary>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ErrorBoundary>
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter } from "react-router-dom";

// DEBUG: Catch object rendering errors
const originalConsoleError = console.error;
console.error = function (...args) {
  if (args[0] && args[0].toString().includes('Objects are not valid as a React child')) {
    console.log("🔴 OBJECT RENDERING ERROR DETECTED!");
    console.log("Error message:", args[0]);
    console.log("Component stack:");
    console.trace(); // This will show the exact component
  }
  originalConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);