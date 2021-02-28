const getProduct = async (endpoint, setter) => {
    try {
        const res = await endpoint;
        setter(res.data);
    }
    catch(err) {
        if(err.response.status === 404) return setter(err.response.data);
    }
}

export default getProduct;