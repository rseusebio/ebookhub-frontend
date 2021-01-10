import UserRecord from "./UserRecord";

interface SignInResponse
{
    statusCode: number;
    user: UserRecord;
}

export default SignInResponse;