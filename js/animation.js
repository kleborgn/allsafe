/**
 * @author Kilian Le Borgne & Killian Monnier
 * @see https://github.com/kleborgn/allsafe
 * @copyright MIT Licence © 2020 Kilian LE BORGNE & Killian MONNIER
 * @description Script d'animation pour le website AllSafe
 */

$(document).ready(function(){
    /**
     * Go to anchor smoothly
     */
    $('a').on('click', function(evt){ // au clic sur un lien
        evt.preventDefault(); // bloquer le comportement par défaut: on ne rechargera pas la page
        var target = $(this).attr('href'); // enregistre la valeur de l'attribut  href dans la variable target

        $('html, body') // le sélecteur $(html, body) permet de corriger un bug sur chrome et safari (webkit)
            .stop() // on arrête toutes les animations en cours 
            .animate({scrollTop: $(target).offset().top}, 1000); // on fait maintenant l'animation vers le haut (scrollTop) vers notre ancre target
    });

    /**
     * Hamburger Navbar
     */
    let burger = document.getElementById('burger'),
    nav    = document.getElementById('main-nav');

    burger.addEventListener('click', function(e){
        nav.classList.toggle('is-open');
        $('body > nav').removeAttr('style');
    });
});

/**
 * Google maps
 */
var map, popup, Popup;

/** Initializes the map and the custom popup. */
function initMap() {
    var allsafe = {lat: 40.750341, lng: -73.974356};

    map = new google.maps.Map(document.getElementById('map'), {
        center: allsafe,
        zoom: 15,
    });

    // The marker, positioned at AllSafe
    var marker = new google.maps.Marker({position: allsafe, map: map, label: 'A'});

    Popup = createPopupClass();
    popup = new Popup(
        new google.maps.LatLng(allsafe),
        document.getElementById('content')
    );
    popup.setMap(map);
}

/**
 * Returns the Popup class.
 *
 * Unfortunately, the Popup class can only be defined after
 * google.maps.OverlayView is defined, when the Maps API is loaded.
 * This function should be called by initMap.
 */
function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
        this.position = position;

        content.classList.add('popup-bubble');

        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement('div');
        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);

    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
        this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
    };

    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

        // Hide the popup when it is far out of view.
        var display = Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

        if (display === 'block') {
            this.containerDiv.style.left = divPosition.x + 'px';
            this.containerDiv.style.top = divPosition.y + 'px';
        }
        if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
        }
    };

  return Popup;
}