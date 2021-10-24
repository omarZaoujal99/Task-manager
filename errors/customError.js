class customError extends Error{
    constructor(msg,statusCode){
        super(msg);
        this.statusCode = statusCode;
    }
}

const createCustomError = (msg,statusCode)=>{
    return new customError(msg,statusCode)
}

module.exports = createCustomError;