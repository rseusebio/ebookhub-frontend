import UserRecord from "./UserRecord";

interface SignInResponse
{
    statusCode: number;
    user: UserRecord;
}

interface SignInData
{
    signIn: SignInResponse
}

export default SignInData;