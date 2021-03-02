const getPages = (contentPageLimit, searchResults, length) => {
    //Filter products based on the length
    const searchLimit = searchResults.filter((result, index) => index >= length && index < +length + contentPageLimit);
    //Get the products
    const products = searchLimit.map(result => {
        return {
            id: result._id,
            image: result.images[0],
            name: result.name,
            price: result.price,
        };
    });

    //Get the size of each page
    const totalPages = Math.ceil(searchResults.length / contentPageLimit);

    //Set the start of each page
    const pages = [];
    let pageEnd = 0;
    for(let i = 1; i <= totalPages; i++){
        const pageLength = pageEnd;
        pages.push(pageLength);
        pageEnd += contentPageLimit;
    }  

    return {
        products,
        pages
    };
};

module.exports = getPages;