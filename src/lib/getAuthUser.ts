import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getUserAuth(){
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value

    if (session){
        const user = await decrypt(session)
        return user
    }
}