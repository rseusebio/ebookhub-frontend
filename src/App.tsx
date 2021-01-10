import    React, { FunctionComponent } from    "react";
import    { BrowserRouter,
            Switch, 
            Route 
          }                            from    "react-router-dom";
import    LogInPage                    from    "./pages/LogIn";
import    HomePage                     from    "./pages/Home";
import    PrivateRoute                 from    "./navigation/PrivateRoute";

import './App.css';

const  App: FunctionComponent = () => {
  return (
    <BrowserRouter>

      <Switch>

        <PrivateRoute path="/private">

          <div>
            <p> Welcome back, user </p>
          </div>

        </PrivateRoute>

        <PrivateRoute path="/home">

          <HomePage/>
          
        </PrivateRoute>

        <Route path="/">

          <LogInPage/>

        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
