import      React, 
            { FunctionComponent }            from       "react";
import      Input                            from       "@material-ui/core/Input";
import      Button                           from       "@material-ui/core/Button";
import      { UPLOAD_BOOK }                  from       "../gql/mutations";
import      { useMutation }                  from       "@apollo/client";
import      UploadBookResponse               from       "../classes/UploadBookResponse";

import "./Home.css";

const Home: FunctionComponent = ( props: any ) =>{ 

    const [ uploadBook, { data, error, loading } ] = useMutation<UploadBookResponse>( UPLOAD_BOOK );

    const inputFileId = "inputFile";

    const SIZE_LIMIT = 10**20;

    if( error )
    {
        console.error( `error occoured: `, error );
    }
    else if ( data || data.statusCode != 0 )
    {
        console.info( "external error: ", data );
    }
    else if( data )
    {
        console.info( data );
    }

    return (
        <div className={ "home-main-container" }>

            <div className={ "home-header-container" }>

                <h3 className={ "home-header" }>
                    ebookhub
                </h3>

            </div>

            <div className={ "home-body-container" }>

                <Input className={ "home-input" } type={ "file" } id={ inputFileId } onBlur={ ( event )=>{ 
                    console.info( "input: ", event.target, event.currentTarget ); 
                } }/> 

                <Button 
                    onClick={( _ ) => { 

                        const inputEl = ( document.getElementById( inputFileId ) as HTMLInputElement );

                        if( !inputEl || !inputEl.files || inputEl.files.length <= 0 )
                        {
                            // handle it
                        }

                        const file = inputEl.files[0];

                        if( file.type != "application/pdf" )
                        {
                            // handle it
                        }

                        if( file.size >= SIZE_LIMIT )
                        {
                            // handle it
                        }

                        const opts = { variables: { file } };

                        uploadBook( opts ).catch( err =>{ /* catching the error */ });
                    }}
                    disabled={ !!loading }
                    />

            </div>

        </div>
    )
};

export default Home;