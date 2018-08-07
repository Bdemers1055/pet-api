

//error handler
module.exports = function errorHandler(err, req, res, next){
    if(err.name === "ValidationError"){
        res.status(500).json({
            msg: err.message,
            err
        });
    } else {
        res.status(500).json({
            msg: 'check it and try again'
        });
    }
    };