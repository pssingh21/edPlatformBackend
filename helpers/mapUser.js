module.exports = function(userOut, userIn){
    if(userIn.username)
        userOut.username = userIn.username;
    if(userIn.email)
        userOut.email = userIn.email;
    return userOut;
}