import    React               from  "react";
import    ReactDOM            from  "react-dom";
import    App                 from  "./App";
import    reportWebVitals     from  "./reportWebVitals";
import    { ApolloClient, 
            ApolloClientOptions,
            ApolloProvider,  
            InMemoryCache, 
            NormalizedCacheObject, 
            HttpLink}   from "@apollo/client";

import "./index.css";

const uri = "http://localhost:4000/graphql";

const link = new HttpLink({
  uri
});

const cache = new InMemoryCache( );

const options: ApolloClientOptions<NormalizedCacheObject> = {
  cache, 
  // uri,
  link
};

const client = new ApolloClient( options );


ReactDOM.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  // </React.StrictMode>,
  ,document.getElementById( "root" ) 
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals( );
