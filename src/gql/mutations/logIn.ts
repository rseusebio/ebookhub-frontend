import { gql } from "@apollo/client";

const LOG_IN = gql`
    mutation LogIn
    {
        logIn
        {
            statusCode
            user
            {
                email
                username
                accountStatus
                emailStatus
                creationDate
            }
        }
    }
`;

export default LOG_IN;