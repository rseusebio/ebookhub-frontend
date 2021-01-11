import { makeVar } from "@apollo/client";
import UserRecord from "./classes/UserRecord";


const userVar = makeVar<UserRecord>( { } );


console.info(`react vars has been created.`);


export {
    userVar
}