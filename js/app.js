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
     * Get a list of popular media.
     */
    popular: function( callback ) {
        var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    /**
     * Get a list of recently tagged media.
     */
    tagsByName: function( name, callback ) {
        var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
        this.getJSON( endpoint, callback );
    },

    getJSON: function( url, callback ) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function( response ) {
                if ( typeof callback === 'function' ) callback( response );
            }
        });
    }
};

Instagram.init({
    client_id: '859f4700141047e884c07ea8547e11bb',
    client_secret: '859f4700141047e884c07ea8547e11bb',
    redirect_uri: 'https://capoeirastudio.github.io/instagram',
    response_type: 'code'
});


$( document ).ready(function() {

    Instagram.popular(function( response ) {
        var $instagram = $( '#instagram' );
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
