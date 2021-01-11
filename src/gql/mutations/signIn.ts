import { gql } from "@apollo/client";

const SIGN_IN = gql`
    mutation SignIn( $username: String!, $email: String!, $pwd: String! )
    {
        signIn( username: $username, email: $email, password: $pwd )
        {
            statusCode
            user
            {
                id
                email
                username
                accountStatus
                emailStatus
                creationDate
            }
        }
    }
`;

export default SIGN_IN;