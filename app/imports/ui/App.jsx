import React /*, { useState, useRef }*/ from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Inicio from "./Inicio.jsx";

// App component - represents the whole app
const App = () => {
  return (
    <HashRouter>
      {/* envolvemos nuestra aplicación en el Router  */}
      <Switch>
        {/* también la envolvemos en el componente Switch */}
        <Route path="/" component={Inicio} exact />
        {/* y creamos nuestras rutas */}
        {/*<Route path="/books" component={BookList} exact />
      <Route path="/books/:bookId" component={BookDetail} exact />*/}
      </Switch>
    </HashRouter>
  );
};

export default App;
