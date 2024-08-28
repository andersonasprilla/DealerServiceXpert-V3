// Custom error class for API errors
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  // Error converter middleware
  const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode = error.statusCode || error.status || 500;
      const message = error.message || 'Internal Server Error';
      error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
  };
  
  // Main error handler
  const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err;
    const response = {
      status: 'error',
      message: process.env.NODE_ENV === 'production' && !err.isOperational ? 'Internal Server Error' : message,
    };
  
    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }
  
    // Log error for monitoring purposes
    console.error(err);
  
    res.status(statusCode).json(response);
  };
  
  // Not found middleware
  const notFound = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
  };
  
  export { ApiError, errorConverter, errorHandler, notFound };