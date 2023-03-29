import config from "../config.js";

// déclaration de l'objet fetcher
const fetcher = {};


const request = async (endpoint, params, method = "get", body = null ) => 
{
    const url = config.api.url + endpoint;
    const options = 
    {
        method,
        credentials : "include",
        headers: 
        {
            Authorization: config.api.authorization,
            "content-type": "application/json",
        },
        ...params
        
    }
    // console.log(url)
    if (body && method !== "get") {
        options.body = JSON.stringify(body);
    }
    try
    {
        console.log(url)
        console.log(options)
        const resp = await fetch(url, options);
        const json = await resp.json();        
        console.log(json);
        return json;
    }
    catch (error)
    {
        console.log("catch!")
        return {data: null, result: false, message: error};
    }
}


fetcher.get= async (endpoint, params = {}) => 
{
    return await request(endpoint, params);
}

fetcher.post= async (endpoint, body = {} , params = {}) => 
{
    return await request(endpoint, params, "post", body);
}

fetcher.put= async (endpoint, body = {} ,params = {}) => 
{
    return await request(endpoint, params, "put", body);
}

fetcher.patch= async (endpoint, body = {} ,params = {}) => 
{
    return await request(endpoint, params, "patch", body);
}

fetcher.delete= async (endpoint, body = {} ,params = {}) => 
{
    return await request(endpoint, params, "delete", body);
}

export default fetcher;
