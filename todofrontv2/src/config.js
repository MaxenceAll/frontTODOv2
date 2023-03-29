const config = 
{
    dev : 
    {
        api: 
        {
            url : "http://localhost:5000/",            
        }

    },
    prod : 
    {
        api:
        {
            url: "",
            authorization: "",
        }
    }
}

export default config[process.env.REACT_APP_ENV];