import UserRecord from "./UserRecord";

interface LogInResponse
{
    statusCode: number;
    user: UserRecord;
}

interface LogInData
{
    logIn: LogInResponse
}

export default LogInData;