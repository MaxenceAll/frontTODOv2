import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = ( {children} ) => {

    const [theme, setTheme] = useState("toto");

    const value = {
        theme,
        setTheme
    }


    return (
        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    )
}