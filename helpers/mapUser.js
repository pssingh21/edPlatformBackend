module.exports = function(userOut, userIn){
    if(userIn.username)
        userOut.username = userIn.username;
    if(userIn.email)
        userOut.email = userIn.email;
    if(userIn.role)
        userOut.role = userIn.role;
    if(userIn.year)
        userOut.year = userIn.year;
    if(userIn.uni)
        userOut.uni = userIn.uni;
    return userOut;
}