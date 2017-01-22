window.Instagram = {
    /**
     * Store application settings
     */
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',
    AUTH_URL: 'https://api.instagram.com/oauth/authorize',

    init: function( opt ) {
        opt = opt || {};

        this.config.client_id = opt.client_id;
        this.config.client_secret = opt.client_secret;
        this.config.redirect_uri = opt.redirect_uri;
        this.config.response_type = opt.response_type;
    },

    /**
     * Direct user to authorization URL.
     */
    authorize: function( callback ) {
        var endpoint = this.AUTH_URL + '?client_id=' + this.config.client_id
									 + '?redirect_uri=' + this.config.redirect_uri
									 + '?response_type=' + this.config.response_type;
        this.getJSON( endpoint, callback );
    },

    /**
     * Get a list of popular media.
     */
    popular: function( callback ) {
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getHTML( endpoint, callback );
    },

    /**
     * Get a list of recently tagged media.
     */
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    /**
     * Load jsonp data from the server using a HTTP GET request.
     */
    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    },
    
    /**
     * Load html data from the server using a HTTP GET request.
     */
    getHTML: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'html',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }

};

Instagram.init({
    client_id: '772cbadad1734c838b400ebbe569be69',
    client_secret: '1cb4d35f48b5443db12d46b70c3aa8d3',
    redirect_uri: 'https://capoeirastudio.github.io/instagram/',
    response_type: 'code'
});


$( document ).ready(function() {

    Instagram.authorize(function( response ) {
        var $instagram = $( '#instagram' );
        login = response.data;
        $instagram.append( '<iframe>' + login + '</iframe>' );
    });

    Instagram.popular(function( response ) {
        var $iinstagram = $( '#iinstagram' );
        for ( var i = 0; i < response.data.length; i++ ) {
            imageUrl = response.data[i].images.low_resolution.url;
            $instagram.append( '<img src="' + imageUrl + '" />' );
        }
    });

    $( '#form' ).on('submit', function( e ) {
        e.preventDefault();

        var tagName = $( '#search' ).val();
        Instagram.tagsByName(tagName, function( response ) {
            var $instagram = $( '#instagram' );
                $instagram.html('');

            for ( var i = 0; i < response.data.length; i++ ) {
                imageUrl = response.data[i].images.low_resolution.url;
                $instagram.append( '<img src="' + imageUrl + '" />' );
            }
        });

    });

});
