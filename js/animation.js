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