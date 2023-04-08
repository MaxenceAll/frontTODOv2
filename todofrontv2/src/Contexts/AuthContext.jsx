import { createContext, useEffect, useMemo, useState } from "react";
import fetcher from "../Helpers/fetcher";

export const AuthContext = createContext(null);

export const AuthContextProvider = ( {children} ) => {

    const [auth, setAuth] = useState("Not logged");
    const authMemo = useMemo( ()=> ({ auth, setAuth }), [auth]);


    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(()=>{
        const doFetch = async() => {
            const resp = await fetcher.get("auth");
            // console.log(resp);
            setAuth(resp);
            setIsAdmin(resp.isAdmin);
        }
        doFetch();
       
    },[]);


    return (
        <AuthContext.Provider value={authMemo}>
            {children}
        </AuthContext.Provider>

    )
}