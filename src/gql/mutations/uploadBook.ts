import { gql } from "@apollo/client";


const UPLOAD_BOOK = gql`
    mutation UploadBook( $file: Upload! )
    {
        uploadBook( file: $file )
        {
            filename
            size
            type
            encoding
            statusCode
            elapsedTime
            uploadDate
        }
    }
`;

export default UPLOAD_BOOK;