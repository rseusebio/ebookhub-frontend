import       React,
            { FunctionComponent }     from       "react";
import      { Route, 
              Redirect }              from       "react-router-dom";
import      { userVar }               from       "../reactive-vars";


const PrivateRoute: FunctionComponent<any> = ({ children, ...rest }) => {

    let user = userVar( );

    const isLoggedIn = user.email && user.username;

    console.info( "PrivateRoute: ", user, isLoggedIn );

    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    isLoggedIn ? (children)
                        : (<Redirect
                            to={
                                {
                                    pathname: "/",
                                    state: { from: location }
                                }} />)
            }

        />
    );
}

export default PrivateRoute;