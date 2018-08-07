// 404 handler
module.exports = function(req, res){
    console.log('here');
    res.status(404).json({
        msg: 'resource not found'
    });
}