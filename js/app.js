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
	this.changeURL( endpoint );
    },

    /**
     * Change URL.
     */
    changeURL: function( url ) {
        window.location.replace(url);
    },

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

});
