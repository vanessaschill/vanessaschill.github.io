$( document ).ready( function () {
    $( '#fullpage' ).fullpage( {
        navigation: true,
        slidesNavigation: true,
        anchors: [
            'home',
            'portfolio',
            'bio',
            'proficiences',
            'contact'
            
        ],
        menu: '#myNavbar',
        controlArrows: true,
        verticalCentered: false
    } );
} );