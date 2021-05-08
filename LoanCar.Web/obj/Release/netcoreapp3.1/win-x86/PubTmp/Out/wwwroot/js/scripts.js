/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);


    $("#contactForm").validate({
        errorPlacement: function errorPlacement(error, element) {
            element.after(error);
        },
        rules: {
            name: {
                required: true,
            },
            message: {
                required: true,
            }
        },
        messages: {
            name: {
                required: "Please enter a name",
            },
            message: {
                required: "Please enter your message",
            },
        },
        onfocus: function (element) {

        },
        onfocusin: function (element) {

        },
        onfocusout: function (element) {

        },
    });

    $("#sendMessageButton").click(function () {
        const isValidForm = $("#contactForm").valid();
        const apiUrl = "api.bcautofinance.net/api/";
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "700",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        if (isValidForm) {
            const confirmElement = $(this);
            confirmElement.text("please wait...");
            confirmElement.removeClass("enabledConfirm");
            confirmElement.addClass("disabledConfirm");
            const addContactDTO = {
                Name: $('#name').val(),
                Email: $('#email').val(),
                Phone: $('#phone').val(),
                Message: $('#message').val()
            };
            $.ajax({
                contentType: "application/json",
                type: "POST",
                url: apiUrl + "contact",
                data: JSON.stringify(addContactDTO),
                success: function (data, textStatus, jqXHR) {
                    confirmElement.text("Send Message");
                    confirmElement.removeClass("disabledConfirm");
                    confirmElement.addClass("enabledConfirm");
                    toastr.success('Thank you for your message!', 'Success')
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    confirmElement.text("Send Message");
                    confirmElement.removeClass("disabledConfirm");
                    confirmElement.addClass("enabledConfirm");
                    toastr.error('please try again!', 'Error');
                }
            });
        }
        else {
            toastr.error('please fill out all necessary fields!', 'Error')
        }
    });
})(jQuery); // End of use strict
