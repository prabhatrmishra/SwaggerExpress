var restify = require('restify');




module.exports = function(app) {
    app.use( restify.CORS() );
    

    
    restify.CORS.ALLOW_HEADERS.push( "authorization"        );
    restify.CORS.ALLOW_HEADERS.push( "withcredentials"      );
    restify.CORS.ALLOW_HEADERS.push( "x-requested-with"     );
    restify.CORS.ALLOW_HEADERS.push( "x-forwarded-for"      );
    restify.CORS.ALLOW_HEADERS.push( "x-real-ip"            );
    restify.CORS.ALLOW_HEADERS.push( "x-customheader"       );
    restify.CORS.ALLOW_HEADERS.push( "user-agent"           );
    restify.CORS.ALLOW_HEADERS.push( "keep-alive"           );
    restify.CORS.ALLOW_HEADERS.push( "host"                 );
    restify.CORS.ALLOW_HEADERS.push( "accept"               );
    restify.CORS.ALLOW_HEADERS.push( "connection"           );
    restify.CORS.ALLOW_HEADERS.push( "upgrade"              );
    restify.CORS.ALLOW_HEADERS.push( "content-type"         );
    restify.CORS.ALLOW_HEADERS.push( "dnt"                  ); // Do not track
    restify.CORS.ALLOW_HEADERS.push( "if-modified-since"    );
    restify.CORS.ALLOW_HEADERS.push( "cache-control"        );
    
   
    app.on( "MethodNotAllowed", function( request, response )
    {
        if ( request.method.toUpperCase() === "OPTIONS" )
        {
            // Send the CORS headers
            //
            response.header( "Access-Control-Allow-Credentials", true                                    );
            response.header( "Access-Control-Allow-Headers",     restify.CORS.ALLOW_HEADERS.join( ", " ) );
            response.header( "Access-Control-Allow-Methods",     "GET, POST, PUT, DELETE, OPTIONS"       );
            response.header( "Access-Control-Allow-Origin",      request.headers.origin                  );
            response.header( "Access-Control-Max-Age",           0                                       );
            response.header( "Content-type",                     "text/plain charset=UTF-8"              );
            response.header( "Content-length",                   0                                       );
    
            response.send( 204 );
        }
        else
        {
            response.send( new restify.MethodNotAllowedError() );
        }
    } );
    

};