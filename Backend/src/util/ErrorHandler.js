class ApiError extends Error{
    constructor(
        statuscode,
        message = "Something went wrong",
        stacktrace ="",
        error=[]

    ){
        super(message);
        this.statuscode = statuscode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.stacktrace = stacktrace;
        this.error = error;

        if(stacktrace){
            this.stacktrace=stacktrace;
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export  {ApiError};
