$(document).ready(function () {

    /**
     * 
     * Typerwriter animation
     * 
     */

    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    /**
     *
     * Initialize fullpage.js
     *
     */

    $('#fullpage').fullpage({
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
        responsiveWidth: 768,
        fixedElements: '#navWrapper',
        navigationTooltips: [
            'Home',
            'Portfolio',
            'Bio',
            'Proficiencies',
            'Contact Me'
        ],
        afterRender: function () {
            if ($(window).width() <= 768) {
                var lastScrollTop = 0;

                $(window).on('scroll', function (event) {
                    var st = $(this).scrollTop();
                    if (st < lastScrollTop) {
                        $('#myNavbar').slideDown();
                    }
                    else {
                        $('#myNavbar').slideUp();
                    }
                    lastScrollTop = st;
                });
            }

            var elements = document.getElementsByClassName('typewrite');

            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }

            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
            document.body.appendChild(css);
        },
        onLeave: function (index, nextIndex, direction) {

            if (nextIndex === 2 && direction === 'down') {

                var portfolio = $('#portfolioContent');

                portfolio.addClass('enter');
            }
        }
    });

    /**
     *
     * Sidebar toggle
     *
     */

    $('.menuToggle').click(function () {
        $('#mobileNav').toggleClass('w3-show');
    });

    /**
     * 
     * Contact form functionality
     * 
     */

    var form = document.getElementById('contactForm'),
        name = document.getElementById('name'),
        email = document.getElementById('email'),
        subject = document.getElementById('subject'),
        content = document.getElementById('content'),
        submitBtn = document.getElementById('submitBtn'),
        resetBtn = document.getElementById('resetBtn');
    
    submitBtn.setAttribute('disabled', '');

    function checkValidity () {
        var formValidityResponse = form.reportValidity();
        if (formValidityResponse) {
            return validForm();
        } else if (!formValidityResponse) {
            return invalidForm();
        }
    }

    function setResetBtnState () {
        var nameValue = name.value,
            emailValue = email.value,
            subjectValue = subject.value,
            contentValue = content.value;
        
        if (nameValue !== "" || emailValue !== "" || subjectValue !== "" || contentValue !== "")  {
            return resetBtn.removeAttribute('disabled');
        } else {
            return resetBtn.setAttribute('disabled', '');
        }
    }

    function validForm () {
        return submitBtn.removeClass('w3-disabled');
    }

    function invalidForm () {
        return submitBtn.addClass('w3-disabled');
    }

    function onSubmit (token) {
        var response = grecaptcha.getResponse(submitBtn);
        console.log('recaptcha response', response);
        return form.submit();
    }

    form.addEventListener('change', checkValidity);
    form.addEventListener('change', setResetBtnState);
    
    
});