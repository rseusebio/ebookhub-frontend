import      React, 
            { FunctionComponent,
              FocusEvent, 
              useState }                     from       "react";
import      Input                            from       "@material-ui/core/Input";
import      Button                           from       "@material-ui/core/Button";
import      { UPLOAD_BOOK }                  from       "../gql/mutations";
import      { useMutation }                  from       "@apollo/client";
import      UploadBookData                   from       "../classes/UploadBookData";
import      { userVar }                      from       "../reactive-vars";
import      Alert                            from       "@material-ui/lab/Alert";

import "./Home.css";

enum InputStatus 
{
    OK = 0,
    NO_FILE, 
    INVALID_FILE_TYPE, 
    FILE_TOO_LARGE,
};

const Home: FunctionComponent = ( _: any ) =>{ 

    const [ uploadBook, { data, error, loading } ] = useMutation<UploadBookData>( UPLOAD_BOOK );

    const user = userVar( );

    const SIZE_LIMIT = 10**20;

    const inputFileId = "inputFile";

    const [ inputStatus, setInputStatus ] = useState( InputStatus.OK );

    console.info( "inputStatus: ", inputStatus, !!loading );

    let file = ( document.getElementById( inputFileId ) as HTMLInputElement )?.files?.item( 0 );

    let AlertHolder = ()=>(<span></span>);

    if( inputStatus !== InputStatus.OK )
    {
        switch( inputStatus )
        {
            case InputStatus.NO_FILE:
            {
                AlertHolder = () => (
                    <Alert
                        severity={ "warning" }>
                        Insert a file before click on the submit.
                    </Alert>
                );

                break;
            }
            case InputStatus.INVALID_FILE_TYPE:
            {
                AlertHolder = () => (
                    <Alert
                        severity={ "warning" }>
                        Insert a PDF file.
                    </Alert>
                );

                break;
            }
            case InputStatus.FILE_TOO_LARGE:
            {
                AlertHolder = () => (
                    <Alert
                        severity={ "warning" }>
                        This file is too large.
                    </Alert>
                );

                break;
            }
        }
    }
    else if( error )
    {
        console.error( `ERROR: `, error );

        AlertHolder = () => (
            <Alert
                severity={ "error" }>
                An internal error occurred.
            </Alert>
        );
    }
    else if ( data )
    {
        console.info( "data: ", data );

        AlertHolder = () => (
            <Alert
                severity={ "success" }>
                File uploaded with success.
            </Alert>
        );
    }


    return (
        <div 
          className={ "home-main-container" }>

            <div
              className={ "home-header-container" }>

                <h3 
                  className={ "home-header" }>
                    ebookhub
                </h3>

                <h4>
                    {
                        `hello, ${user.username}.`
                    }
                </h4>

            </div>

            <div 
              className={ "home-body-container" }>

                <Input 
                  className = { "home-input" } 
                  type      = { "file" } 
                  id        = { inputFileId } 
                  onBlur    = { ( { target }: FocusEvent<HTMLInputElement> ) => { 

                                    const { files } = target;

                                    if( !files || files.length <= 0 || !files[0] )
                                    {   
                                        if( inputStatus != InputStatus.NO_FILE )
                                        {
                                            setInputStatus( InputStatus.NO_FILE );
                                        }

                                        return;
                                    }

                                    file = files[0];

                                    if( file.type != "application/pdf" )
                                    {
                                        if( inputStatus != InputStatus.INVALID_FILE_TYPE )
                                        {
                                            setInputStatus( InputStatus.INVALID_FILE_TYPE );
                                        }
                                    }
                                    else if( file.size >= SIZE_LIMIT )
                                    {
                                        if( inputStatus != InputStatus.FILE_TOO_LARGE )
                                        {
                                            setInputStatus( InputStatus.FILE_TOO_LARGE );
                                        }
                                    }
                                    else
                                    {
                                        if( inputStatus != InputStatus.OK )
                                        {
                                            setInputStatus( InputStatus.OK );
                                        }
                                    }
                                } 
                              }
                /> 

                <Button 
                    variant   = { "contained" } 
                    color     = { "primary"   }
                    disabled  = { !!loading || inputStatus !== InputStatus.OK }
                    onClick   = { ( _ ) => { 
                        
                                    if( !file )
                                    {
                                        if( inputStatus != InputStatus.NO_FILE )
                                        {
                                            setInputStatus( InputStatus.NO_FILE );
                                        }
                                    }
                                    else if( file.type != "application/pdf" )
                                    {
                                        if( inputStatus != InputStatus.INVALID_FILE_TYPE )
                                        {
                                            setInputStatus( InputStatus.INVALID_FILE_TYPE );
                                        }
                                    }
                                    else if( file.size >= SIZE_LIMIT )
                                    {
                                        if( inputStatus != InputStatus.FILE_TOO_LARGE )
                                        {
                                            setInputStatus( InputStatus.FILE_TOO_LARGE );
                                        }
                                    }

                                    const opts = { variables: { file } };

                                    uploadBook( opts ).catch( err =>{ /* catching the error */ });
                                 }
                                }
                    >
                        Upload
                </Button>

            </div>

        </div>
    )
};

export default Home;