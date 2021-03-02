const getProduct = async (endpoint, setter) => {
    try {
        const res = await endpoint;
        setter(res.data);
    }
    catch(err) {
        if(err.response.status === 404) return setter(err.response.data);
        if(err.reponse.status === 401) return window.location.href = '/';
    }
}

export default getProduct;