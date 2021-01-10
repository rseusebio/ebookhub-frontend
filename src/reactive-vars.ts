import { makeVar } from "@apollo/client";
import UserRecord from "./classes/UserRecord";


const userVar = makeVar<UserRecord>( { } );


export{
    userVar
}