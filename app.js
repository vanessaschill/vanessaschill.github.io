$( document ).ready( function () {

    /**
     *
     * Initialize fullpage.js
     *
     */

    $( '#fullpage' ).fullpage( {
        navigation: true,
        slidesNavigation: true,
        anchors: [
            'home',
            'portfolio',
            'bio',
            'proficiencies',
            'contact'
        ],
        menu: '#myNavbar',
        controlArrows: true,
        responsiveWidth: 450,
        fixedElements: '#navWrapper',
        afterResponsive: function (isResponsive) {

            if ( isResponsive ) {
                $( '.proficiencies' ).removeClass( 'section fp-section' ).removeAttr( 'data-anchor' );
                $( '.skills' ).addClass( 'section fp-section' ).attr( 'data-anchor', 'proficiencies' );
            }
            else {
                $( '.proficiencies' ).addClass( 'section fp-section' ).attr( 'data-anchor', 'proficiencies' );
                $( '.skills' ).removeClass( 'section fp-section' ).removeAttr( 'data-anchor' );
            };
        }
    } );

    /**
     *
     * Sidebar toggle
     *
     */

    $( '.menuToggle' ).click( function () {
        $( '#mobileNav' ).toggleClass( 'w3-show' );
    } );
    

} );