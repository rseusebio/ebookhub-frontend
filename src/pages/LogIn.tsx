import      React, { FunctionComponent, useState }  from        "react";
import      { ArrowBack }                           from        "@material-ui/icons";
import      { useMutation }                         from        "@apollo/client";
import      { validate }                            from        "email-validator";
import      { SIGN_IN }                             from        "../gql/mutations";
import      TextField                               from        "@material-ui/core/TextField";
import      Button                                  from        "@material-ui/core/Button";
import      CircularProgress                        from        "@material-ui/core/CircularProgress";
import      SignInData                              from        "../classes/SignInResponse";
import      Alert                                   from        "@material-ui/lab/Alert";
import      { Redirect, 
              useHistory }                          from        "react-router-dom";
import      { userVar }                             from        "../reactive-vars";

import "./LogIn.css";


const LogInForm: FunctionComponent<any> = ( { setSignIn }: any ) => {

    return (
        <div className={"log-in-form"}>

            <h3>
                LogIn
            </h3>

            <input className={"login-input"} type={"text"} id={"username"} placeholder={"username"} />

            <input className={"login-input"} type={"password"} id={"password"} placeholder={"password"} />

            <p className={"login-signin-link"} onClick={ ()=>{  setSignIn( true ); } }> 
                Or sign in instead
            </p>

        </div>
    );
}

enum UserInfo
{   
    OK             = 0,

    SMALL_USERNAME = 1,
    USERNAME_ALREADY_EXISTS, 

    INVALID_EMAIL = 10, 
    EMAIL_ALREADY_USED, 

    SMALL_PASSWORD = 20,
    NO_SPECIAL_CHARS, 
    NO_LOWER_CASE_CHARS, 
    NO_UPPER_CASE_CHARS
}

enum ErrorType
{
    INTERNAL = 0, 
}

const helperTexts = {
    1: "username must have at least 4 characters.", 
    2: "this username name already exists.",
    
    10: "Please, fill in a valid email address.", 
    11: "this email has arealy been used.", 

    20: "password must be at least 6 characters long.",
    21: "password must contain at least 1 special character",
    22: "password must contain at least 1 lowecase character.",
    23: "password must contain at least 1 uppercase character.",
}

const SignInForm: FunctionComponent<any> = ( { setSignIn }: any ) => {

    const usernameId = "sign-in-username";
    const emailId    = "sign-in-email";
    const pwdId      = "sign-in-password";

    let username: string    = ( document.getElementById( usernameId ) as any )?.value    ??    "";
    let email:    string    = ( document.getElementById( emailId )    as any )?.value    ??    "";
    let pwd:      string    = ( document.getElementById( pwdId )      as any )?.value    ??    "";

    const [ pwdStatus,      setPwdStatus      ]     =   useState( UserInfo.OK );
    const [ emailStatus,    setEmailStatus    ]     =   useState( UserInfo.OK );
    const [ usernameStatus, setUsernameStatus ]     =   useState( UserInfo.OK );

    const [ signIn, { data, error, loading } ] = useMutation<SignInData>( SIGN_IN );

    const history = useHistory( );


    const validatePwd = ( pwd: string ): boolean => { 
        const re1 = new RegExp( "[\$@!&\*#%+-]" );
        const re2 = new RegExp( "[A-Z]" );
        const re3 = new RegExp( "[a-z]");

        let isValid = false;

        if( pwd.length < 6 )
        {
            setPwdStatus( UserInfo.SMALL_PASSWORD );
        }
        else if( !re1.test( pwd ) )
        {
            setPwdStatus( UserInfo.NO_SPECIAL_CHARS ); 
        }
        else if( !re2.test( pwd ) )
        {
            setPwdStatus( UserInfo.NO_UPPER_CASE_CHARS ); 
        }
        else if( !re3.test( pwd ) )
        {
            setPwdStatus( UserInfo.NO_LOWER_CASE_CHARS ); 
        }
        else if( pwdStatus != UserInfo.OK )
        {
            setPwdStatus( UserInfo.OK ); 

            isValid = true;
        }
        else 
        {
            isValid = true;
        }

        return isValid;
    };
    const validateEmail = ( email: string ): boolean =>{
        
        let isValid = true;

        if( !validate( email ) )
        {
            setEmailStatus( UserInfo.INVALID_EMAIL );

            isValid = false;
        }
        else if( emailStatus != UserInfo.OK )
        {
            setEmailStatus( UserInfo.OK );
        }

        return isValid;
    };
    const validateUsername = ( username: string ): boolean =>{

        let isValid = true;

        if( username.length < 4 )
        {
            setUsernameStatus( UserInfo.SMALL_USERNAME );

            isValid = false;
        }
        else if( usernameStatus !== UserInfo.OK )
        {
            setUsernameStatus( UserInfo.OK );
        }

        return isValid;
    };

    const disabled = pwdStatus      !== UserInfo.OK || 
                     emailStatus    !== UserInfo.OK || 
                     usernameStatus !== UserInfo.OK || 
                     loading;

    console.info( data, error, loading );
    
    let err = null;

    if( error )
    {
        console.error( "internal error: ", error );
        err = ErrorType.INTERNAL;
    }
    else if( !data || !data.signIn )
    {
        // another type of error
    }
    else if ( data && data.signIn )
    {

        const { user, statusCode } = data.signIn;

        if( statusCode  == 0 )
        {
            userVar( user );

            history.push( "/home" );

            // return (
            //     <Redirect to={"/home"}/>
            // )
        }
    }

    return (
        <div 
            className={"log-in-form"}>

            <div className={ "sign-in-header" }>

                <ArrowBack 
                    className = { "login-sign-arrow" } 
                    onClick   = { () => {
                                    setSignIn( false );  
                                 } 
                                }/>
                <h3>
                    SignIn
                </h3>

            </div>

            <div className={ "sign-in-body" }>

                <TextField 
                    label       = { "username" } 
                    variant     = { "outlined" } 
                    size        = { "small" } 
                    className   = { "sign-in-input" }
                    id          = { usernameId } 
                    onBlur      = { ({ target }) => { 
                                        username = target.value;
                                        
                                        validateUsername( username );
                                    } 
                                }
                    error       = { usernameStatus != UserInfo.OK }
                    helperText  = { usernameStatus != UserInfo.OK ? helperTexts[usernameStatus] : "" }
                />

                <TextField
                    label       = { "email" } 
                    variant     = { "outlined" }
                    size        = { "small" }                
                    className   = { "sign-in-input" }
                    id          = { emailId } 
                    placeholder = { "email" } 
                    onBlur      = { ({ target }) => {
                                        
                                        email = target.value;
                                        
                                        validateEmail( email );
                                    }
                                } 
                    error       = { emailStatus != UserInfo.OK }
                    helperText  = { emailStatus != UserInfo.OK ? helperTexts[emailStatus] : "" }
                    />

                <TextField
                    label       = { "password" }
                    variant     = { "outlined" }
                    size        = { "small" }
                    className   = { "sign-in-input" } 
                    type        = { "password" } 
                    id          = { pwdId } 
                    onBlur      = { ({ target }) => {

                                        pwd = target.value; 

                                        validatePwd( pwd );
                                    } 
                                }
                    error       = { pwdStatus != UserInfo.OK }
                    helperText  = { pwdStatus != UserInfo.OK ? helperTexts[pwdStatus] : "" }
                    />

            </div> 
            
            <div className={ "sign-in-foot" }> 

                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick   = { () => {
                                        if( !validateUsername( username ) || 
                                            !validateEmail( email ) ||
                                            !validatePwd( pwd )
                                        ) 
                                        {
                                            return;
                                        }

                                        const opts = { variables: { username, email, pwd } };

                                        signIn( opts ).catch( err => { /*just catch it and do nothing */ } );
                                    } 
                                }
                    disabled = { disabled || loading  }>
                    
                    {
                        loading ? 
                            ( 
                                <div>
                                    Loading 
                                    <CircularProgress
                                        size={10}
                                        thickness={4} />
                                </div>
                            )
                        : 
                            (
                                <div>
                                    Sign In  
                                </div>
                            )
                    }
                </Button>

                <div>
                    {
                        error ? 
                        (   
                            <div>
                                <Alert severity={"error"}> An internal error occurred! Please, contact our support service.</Alert>
                            </div>
                        )
                        :
                        (
                            <p></p>
                        )
                    }
                </div>

            </div>

        </div>
    );

}

const LogInPage: FunctionComponent<any> = (_: any) => {

    const [ signIn, setSignIn ] = useState( false );
    
    return (
        <div className={"login-main-container"}>
            {
                signIn ? ( <SignInForm  setSignIn={setSignIn} /> ) 
                       : ( <LogInForm setSignIn={setSignIn} /> )
            }
        </div>
    );
}

export default LogInPage;