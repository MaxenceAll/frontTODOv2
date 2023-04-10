import { createContext, useContext, useEffect, useMemo, useState } from "react";
import fetcher from "../Helpers/fetcher";
import { useIsAdminQuery } from "../features/todosSlice";
import { AdminContext } from "./AdminContext";

export const AuthContext = createContext(null);

export const AuthContextProvider = ( {children} ) => {

    const [auth, setAuth] = useState("Not logged");
    const authMemo = useMemo( ()=> ({ auth, setAuth }), [auth]);

    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    useEffect(() => {
        const doFetch = async () => {
          const resp = await fetcher.get("auth");
        //   console.log(resp);
          setAuth(resp);
        };
        doFetch();
      }, []);
      
      useEffect(() => {
        const checkAdmin = async () => {
        //   console.log(auth);
        //   console.log(auth?.data?.email);
          const response = await fetcher.get(`customer/admin/${auth?.data?.email}`);
        //   console.log(response);
          if (response.data) {
            // console.log("yo its an admin");
            setIsAdmin(true);
          } else {
            // console.log("not admin bro");
            setIsAdmin(false);
          }
        };
        checkAdmin();
      }, [auth]);      


    return (
        <AuthContext.Provider value={authMemo}>
            {children}
        </AuthContext.Provider>

    )
}