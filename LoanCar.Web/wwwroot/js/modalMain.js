const clsAlphaWithSpacesOnly = (e) => {
    const regex = new RegExp(/^[a-zA-Z ]*$/);
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    return (regex.test(str) && true) || e.preventDefault();
};

const clsAlphaWithNoSpacesOnly = (e) => {
    const regex = new RegExp(/^[a-zA-Z]+$/);
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    return (regex.test(str) && true) || e.preventDefault();
};

const clsNumberWithNoSpacesOnly = (e) => {
    const regex = new RegExp(/^[0-9]+$/);
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    return (regex.test(str) && true) || e.preventDefault();
};

const clsAlphaNumberWithSpacesOnly = (e) => {
    const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    return (regex.test(str) && true) || e.preventDefault();
};

const clsAlphaNumberWithNoSpacesOnly = (e) => {
    const regex = new RegExp(/^[a-zA-Z0-9]/);
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    return (regex.test(str) && true) || e.preventDefault();
};

function clsStringAlphaNumberOnlyForPostalCode(e) {
    // Accept only alpha numerics, no special characters

    if (e.key == "Backspace" || e.key == "Tab") {
        return true;
    }
    // var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var regex = new RegExp(/^[a-zA-Z0-9]/);
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    return (regex.test(str) && true) || e.preventDefault();
}

function separateNum(e) {
    var cleaned = ("" + $("#applicantPhone").val()).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + "-" + match[2] + "-" + match[3];
    }
    return null;
}

//#region phone formatting US
const isNumericInput = (event) => {
    const key = event.keyCode;
    return (
        (key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (
        event.shiftKey === true ||
        key === 35 ||
        key === 36 || // Allow Shift, Home, End
        key === 8 ||
        key === 9 ||
        key === 13 ||
        key === 46 || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        // Allow Ctrl/Command + A,C,V,X,Z
        ((event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
    );
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};

const enforceFormatAlpha = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isModifierKey(event)) {
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if (isModifierKey(event)) {
        return;
    }

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
        target.value = `${zip} ${middle} ${last}`;
    } else if (input.length > 3) {
        target.value = `${zip} ${middle}`;
    } else if (input.length > 0) {
        target.value = `${zip}`;
    }
};

const formatToSIN = (event) => {
    if (isModifierKey(event)) {
        return;
    }

    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 9);

    if (input.length > 6) {
        target.value = `${zip}  ${middle} ${last}`;
    } else if (input.length > 3) {
        target.value = `${zip} ${middle}`;
    } else if (input.length > 0) {
        target.value = `${zip}`;
    }
};

const formatToPostalCode = (event) => {
    // I am lazy and don't like to type things more than once
    const target = event.target;
    const input = event.target.value.split(" ").join(""); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    if (input.length > 3) {
        target.value = `${zip} ${middle}`;
    } else if (input.length > 0) {
        target.value = `${zip}`;
    }
};

// Jquery Dependency

function formatNumber(n) {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, "g"), replace);
}

function formatCurrency(input, blur) {
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.

    // get input value
    var input_val = input.val();

    // don't validate empty input
    if (input_val === "") {
        return;
    }
    if (Number(replaceAll(input_val, ",", "").substring(1)) > 100000000) {
        return false;
    }

    // original length
    var original_len = input_val.length;

    // initial caret position
    var caret_pos = input.prop("selectionStart");

    // check for decimal
    if (input_val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = formatNumber(left_side);

        // validate right side
        right_side = formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
            right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;
    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }

    // send updated string to input
    input.val(input_val);

    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
}

//#endregion

$(function () {
    var form = $("#form-register");

    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            //Spouse/Co-Applicant
            // applicantEmployer: {
            //     required: false,
            // },
            // applicantEmployerOccupation: {
            //     required: false,
            // },
            // applicantEmployerHowLongYear: {
            //     required: false,
            // },
            // applicantEmployerHowLongMonth: {
            //     required: false,
            // },
            // applicantEmployerPhone: {
            //     required: false,
            // },
            // applicantEmployerMonthlyIncome: {
            //     required: false,
            // },
            // applicantEmployerTwoIncome: {
            //     required: false,
            // },

            //Personal Validations
            applicantSIN: {
                minlength: 12,
            },
            spouseSIN: {
                minlength: 12,
            },
            applicantPhone: {
                minlength: 12,
            },
            cpApplicantPhone: {
                minlength: 12,
            },
            //Address Validations
            applicantPostalCode: {
                minlength: 7,
            },
            previousApplicantPostalCode: {
                minlength: 7,
            },

            // employment
            //"checkbox[]": {
            //    required: true,
            //    minlength: 3,
            //},
            presentEmployerPhone: {
                minlength: 12,
            },
            previousEmployerPhone: {
                minlength: 12,
            },
            applicantEmployerPhone: {
                minlength: 12,
            },

            mortgage: {
            },
            marketValue: {
            },
            presentEmployerMonthlyIncome: {
            },

            mortgageBalance: {

            },

            price: {
            },
            docFee: {
            },
            trade: {
            },
            difference: {
            },
            downPMT: {
            },
            balanceOwing: {
            },
        },

        messages: {
            //Personal
            applicantPhone: {
                minlength: "Please enter at least 10 characters.",
            },
            cpApplicantPhone: {
                minlength: "Please enter at least 10 characters.",
            },
            applicantSIN: {
                minlength: "Please enter at least 9 characters.",
            },

            presentEmployerPhone: {
                minlength: "Please enter at least 10 characters.",
            },
            previousEmployerPhone: {
                minlength: "Please enter at least 10 characters.",
            },
            applicantEmployerPhone: {
                minlength: "Please enter at least 10 characters.",
            },

            spouseSIN: {
                minlength: "Please enter at least 9 characters.",
            },

            //"checkbox[]": "Please Check all our Required Documents",

            //Address
            applicantPostalCode: {
                minlength: "Please enter at least 6 characters",
            },
            previousApplicantPostalCode: {
                minlength: "Please enter at least 6 characters",
            },
            marketValue: {
                maxlength: "Please enter no more than  100,000,000$",

            },

            presentEmployerMonthlyIncome: {
                maxlength: "Please enter no more than  100,000$",

            },

            presentEmployerTwoIncome: {
                maxlength: "Please enter no more than  1000,000,000$",

            },
            applicantEmployerMonthlyIncome: {
                maxlength: "Please enter no more than  100,000$",

            },
            applicantEmployerTwoIncome: {
                maxlength: "Please enter no more than  1000,000,000$",

            },

            //Employment

            mortgage: {
                maxlength: "Please enter no more than 100,000,000$",
            },
            mortgageBalance: {
                maxlength: "Please enter no more than 100,000,000$",
            },

            price: {
                maxlength: "Please enter no more than  1,000,000.00$",

            },
            docFee: {
                maxlength: "Please enter no more than  1,000,000.00$",

            },
            trade: {
                maxlength: "Please enter no more than  1,000,000.00$",

            },
            difference: {
                maxlength: "Please enter no more than  1,000,000.00$",

            },
            downPMT: {
                maxlength: "Please enter no more than  1,000,000.00$",

            },
            balanceOwing: {
                maxlength: "Please enter no more than  1,000,000.00$",

            },
        },
        onfocus: function (element) {

        },
        onfocusin: function (element) {
            if (element.id == "applicantDateOfBirth" || element.id == "expDate" || element.id == "spouseDateOfBirth") {
                $("#applicantDateOfBirth").datepicker();
                $("#expDate").datepicker();
                $("#spouseDateOfBirth").datepicker();
            }


        },

        onfocusout: function (element) {

            $(element).valid();
        },

        highlight: function (element, errorClass, validClass) {

            $(element.form).find(".actions").addClass("form-error");
            $(element).removeClass("valid");
            $(element).addClass("error");
        },

        unhighlight: function (element, errorClass, validClass) {

            $(element.form).find(".actions").removeClass("form-error");
            $(element).removeClass("error");
            $(element).addClass("valid");
        },
    });
    var passStep2 = false;
    var passStep3 = false;
    var passStep4 = false;
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        autoFocus: true,
        transitionEffectSpeed: 500,
        titleTemplate: '<div class="title">#title#</div>',
        labels: {
            previous: "Back",
            next: "Next",
            finish: "Confirm",
            current: "",
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (newIndex == 1 && form.valid()) {
                passStep2 = true;
            }
            if (newIndex == 2 && form.valid()) {
                passStep3 = true;
            }
            if (newIndex == 3 && form.valid()) {
                passStep4 = true;
            }
            //if (newIndex - currentIndex > 1 && !form.valid())
            //    return false;

            var fullname = $("#first_name").val() + " " + $("#last_name").val();
            var room = $("#room").val();
            var day = $("#day").val();
            var time = $("#time").val();

            $("#fullname-val").text(fullname);
            $("#room-val").text(room);
            $("#day-val").text(day);
            $("#time-val").text(time);

            return form.valid();
        },
    });
    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: "",
    });

    //validations
    $("#applicantSIN").on("input", function (event) {
        // if($("#applicantSIN").val().replace(/ /g,"").length%3 == 0){
        //     $("#applicantSIN").val( $("#applicantSIN").val() + ' ');
        // }
        event.preventDefault();
    });


    $("#applicantHowLongYear").on("input", function (event) {

        if ($("#applicantHowLongYear").val() < 2) {
            $("#form-register").validate(); //sets up the validator
            $("#previousApplicantAddress").rules("add", "required");
            $("#previousApplicantAddress").removeClass("disabledOnCheck");
            //   $("#previousApplicantAddress").addClass("input.error");

            $("#previousApplicantCity").removeClass("disabledOnCheck");
            //   $("#previousApplicantCity").addClass("input.error");

            $("#previousApplicantProvince").removeClass("disabledOnCheck");
            //   $("#previousApplicantProvince").addClass("input.error");

            $("#previousApplicantPostalCode").removeClass("disabledOnCheck");
            //   $("#previousApplicantPostalCode").addClass("input.error");
            $("#previousApplicantHowLongYear").removeClass("disabledOnCheck");

            $("#previousApplicantHowLongMonth").removeClass("disabledOnCheck");

            $("#previousApplicantAddress").prop("disabled", false);
            $("#previousApplicantCity").prop("disabled", false);
            $("#previousApplicantProvince").prop("disabled", false);
            $("#previousApplicantPostalCode").prop("disabled", false);
            $("#previousApplicantHowLongYear").prop("disabled", false);
            $("#previousApplicantHowLongMonth").prop("disabled", false);
        } else {
            $("#form-register").validate(); //sets up the validator
            $("#previousApplicantAddress").rules("remove", "required");
            $("#previousApplicantCity").rules("remove", "required");
            $("#previousApplicantProvince").rules("remove", "required");
            $("#previousApplicantPostalCode").rules("remove", "required");

            $("#previousApplicantAddress").removeClass("error");
            $("#previousApplicantCity").removeClass("error");
            $("#previousApplicantProvince").removeClass("error");
            $("#previousApplicantPostalCode").removeClass("error");
            $("#previousApplicantHowLongYear").removeClass("error");
            $("#previousApplicantHowLongMonth").removeClass("error");

            $("#previousApplicantAddress").addClass("disabledOnCheck");
            $("#previousApplicantCity").addClass("disabledOnCheck");
            $("#previousApplicantProvince").addClass("disabledOnCheck");
            $("#previousApplicantPostalCode").addClass("disabledOnCheck");
            $("#previousApplicantHowLongYear").addClass("disabledOnCheck");
            $("#previousApplicantHowLongMonth").addClass("disabledOnCheck");

            $("#previousApplicantAddress").prop("disabled", true);
            $("#previousApplicantCity").prop("disabled", true);
            $("#previousApplicantProvince").prop("disabled", true);
            $("#previousApplicantPostalCode").prop("disabled", true);
            $("#previousApplicantHowLongYear").prop("disabled", true);
            $("#previousApplicantHowLongMonth").prop("disabled", true);
            $("#previousApplicantAddress").val("");
            $("#previousApplicantCity").val("");
            $("#previousApplicantProvince").val("");
            $("#previousApplicantPostalCode").val("");
            $("#previousApplicantHowLongYear").val(0);
            $("#previousApplicantHowLongMonth").val(0);
        }
        event.preventDefault();
    });

    $("#presentEmployerHowLongYear").on("input", function (event) {

        if ($("#presentEmployerHowLongYear").val() < 2) {
            $("#form-register").validate(); //sets up the validator
            // $("#previousEmployerName").rules("add", "required");
            // $("#previousEmployerName").removeClass("disabledOnCheck");
            //   $("#previousApplicantAddress").addClass("input.error");

            $("#previousEmployerName").removeClass("disabledOnCheck");
            //   $("#previousApplicantCity").addClass("input.error");

            $("#previousEmployerPhone").removeClass("disabledOnCheck");
            //   $("#previousApplicantProvince").addClass("input.error");

            $("#previousEmployerHowLongYear").removeClass("disabledOnCheck");
            //   $("#previousApplicantPostalCode").addClass("input.error");
            $("#previousEmployerHowLongMonth").removeClass("disabledOnCheck");

            $("#previousEmployerName").prop("disabled", false);
            $("#previousEmployerPhone").prop("disabled", false);
            $("#previousEmployerHowLongYear").prop("disabled", false);
            $("#previousEmployerHowLongMonth").prop("disabled", false);
        } else {
            $("#form-register").validate(); //sets up the validator
            $("#previousEmployerName").rules("remove", "required");
            $("#previousEmployerPhone").rules("remove", "required");
            $("#previousEmployerHowLongYear").rules("remove", "required");
            $("#previousEmployerHowLongMonth").rules("remove", "required");

            // $("#previousEmployerName").removeClass("error");
            $("#previousEmployerPhone").removeClass("error");
            // $("#previousEmployerHowLongYear").removeClass("error");
            // $("#previousEmployerHowLongMonth").removeClass("error");

            $("#previousEmployerName").addClass("disabledOnCheck");
            $("#previousEmployerPhone").addClass("disabledOnCheck");
            $("#previousEmployerHowLongYear").addClass("disabledOnCheck");
            $("#previousEmployerHowLongMonth").addClass("disabledOnCheck");

            $("#previousEmployerName").prop("disabled", true);
            $("#previousEmployerPhone").prop("disabled", true);
            $("#previousEmployerHowLongYear").prop("disabled", true);
            $("#previousEmployerHowLongMonth").prop("disabled", true);
            $("#previousEmployerPhone").val("");
            $("#previousEmployerPhone-error").css("display", "none");

            $("#previousEmployerName").val("");
            $("#previousEmployerHowLongYear").val(0);
            $("#previousEmployerHowLongMonth").val(0);
        }
        event.preventDefault();
    });

    $("#rentId").on("input", function (event) {

        // var iii = document.getElementById(rentId);

        $("#form-register").validate(); //sets up the validator
        $("#mortgage").rules("add", "required");
        $("#mortgage").addClass("input.error");
        $("#mortgage").addClass("defaultInput");

        $("#mortgage").prop("disabled", false);
        $("#marketValue").prop("disabled", true);
        $("#mortgageHolder").prop("disabled", true);
        $("#mortgageBalance").prop("disabled", true);

        $("input[id*=marketValue]").addClass("disabledOnCheck");
        $("#mortgageHolder").addClass("disabledOnCheck");
        $("#mortgageBalance").addClass("disabledOnCheck");

        $("#marketValue").removeClass("error");
        $("#mortgageHolder").removeClass("error");
        $("#mortgageBalance").removeClass("error");

        $("#marketValue").val("");
        $("#mortgageHolder").val("");
        $("#mortgageBalance").val("");
        $("#marketValue-error").css("display", "none");
        $("#mortgageBalance-error").css("display", "none");

    });

    $("#owonId").on("input", function (event) {

        var iii = document.getElementById(rentId);

        $("#form-register").validate(); //sets up the validator
        $("input[id*=marketValue]").rules("add", "required");
        $("#mortgageBalance").rules("add", "required");
        $("#marketValue").prop("disabled", false);
        $("#mortgageHolder").prop("disabled", false);
        $("#mortgageBalance").prop("disabled", false);

        $("#mortgage").prop("disabled", true);

        $("input[id*=marketValue]").removeClass("disabledOnCheck");
        $("#mortgageHolder").removeClass("disabledOnCheck");
        $("#mortgageBalance").removeClass("disabledOnCheck");
        $("#mortgage").addClass("disabledOnCheck");
        $("#mortgage").removeClass("error");
        $("#mortgage").addClass("input.error");

        $("#mortgage").removeClass("defaultInput");
        $("#mortgage").val("");
        $("#mortgage-error").css("display", "none");
    });

    $("#applicantSignature").on("input", function (event) {

        $("#form-register").validate(); //sets up the validator
        if ($(this).is(":checked")) {
            $("#applicantSignatureFamily").rules("add", "required");
            $("#applicantSignatureFamily").prop("disabled", false);
            $("#applicantSignatureFamily").addClass("defaultInput");

            $("#applicantSignatureFamily").addClass("error");
        } else {
            $("#applicantSignatureFamily").rules("remove", "required");
            $("#applicantSignatureFamily").removeClass("error");
            $("#applicantSignatureFamily").removeClass("defaultInput");

            $("#applicantSignatureFamily").addClass("disabledOnCheck");

            $("#applicantSignatureFamily").prop("disabled", true);
            $("#applicantSignatureFamily").val("");
        }
    });

    $("#coApplicantSignature").on("input", function (event) {


        $("#form-register").validate(); //sets up the validator
        if ($(this).is(":checked")) {
            $("#coApplicantSignatureFamily").rules("add", "required");
            $("#coApplicantSignatureFamily").prop("disabled", false);
            $("#coApplicantSignatureFamily").addClass("defaultInput");

            $("#coApplicantSignatureFamily").addClass("error");
        } else {
            $("#coApplicantSignatureFamily").rules("remove", "required");
            $("#coApplicantSignatureFamily").removeClass("error");
            $("#coApplicantSignatureFamily").removeClass("defaultInput");
            $("#coApplicantSignatureFamily").addClass("disabledOnCheck");

            $("#coApplicantSignatureFamily").prop("disabled", true);
            $("#coApplicantSignatureFamily").val("");
        }
    });

    $("#day").datepicker({
        dateFormat: "MM - DD - yy",
        showOn: "both",
        buttonText: '<i class="zmdi zmdi-chevron-down"></i>',
    });

    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        }
    });


    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") { return; }

        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = "$" + left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = "$" + input_val;

            // final formatting
            if (blur === "blur") {
                input_val += ".00";
            }
        }

        // send updated string to input
        input.val(input_val);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }

    $("#presentEmployerMonthlyIncome").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000 ? $("#presentEmployerMonthlyIncome").rules("add", "maxlength") : $("#presentEmployerMonthlyIncome").rules("remove", "maxlength");

    });

    $("#presentEmployerTwoIncome").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000 ? $("#presentEmployerTwoIncome").rules("add", "maxlength") : $("#presentEmployerTwoIncome").rules("remove", "maxlength");

    });

    $("#applicantEmployerMonthlyIncome").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000 ? $("#applicantEmployerMonthlyIncome").rules("add", "maxlength") : $("#applicantEmployerMonthlyIncome").rules("remove", "maxlength");

    });
    $("#applicantEmployerTwoIncome").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000 ? $("#applicantEmployerTwoIncome").rules("add", "maxlength") : $("#applicantEmployerTwoIncome").rules("remove", "maxlength");

    });




    $("#marketValue").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000000 ? $("#marketValue").rules("add", "maxlength") : $("#marketValue").rules("remove", "maxlength");

    });
    $("#mortgage").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000000 ? $("#mortgage").rules("add", "maxlength") : $("#mortgage").rules("remove", "maxlength");
    });
    $("#mortgageBalance").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 100000000 ? $("#mortgageBalance").rules("add", "maxlength") : $("#mortgageBalance").rules("remove", "maxlength");
    });

    $("#price").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 1000000 ? $("#price").rules("add", "maxlength") : $("#price").rules("remove", "maxlength");

    });
    $("#docFee").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 1000000 ? $("#docFee").rules("add", "maxlength") : $("#docFee").rules("remove", "maxlength");
    });
    $("#trade").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 1000000 ? $("#trade").rules("add", "maxlength") : $("#trade").rules("remove", "maxlength");
    });
    $("#difference").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 1000000 ? $("#difference").rules("add", "maxlength") : $("#difference").rules("remove", "maxlength");
    });

    $("#downPMT").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 1000000 ? $("#downPMT").rules("add", "maxlength") : $("#downPMT").rules("remove", "maxlength");
    });

    $("#balanceOwing").focusout(function (event) {

        Number($(this).val().replaceAll(',', '').replace('$', '').split('.')[0]) > 1000000 ? $("#balanceOwing").rules("add", "maxlength") : $("#balanceOwing").rules("remove", "maxlength");
    });

    var container = document.getElementById("tradeVinInputs");
    container.onkeyup = function (e) {

        var target = e.srcElement;
        var maxLength = parseInt(target.attributes["maxlength"].value, 10);
        var myLength = target.value.length;
        if (myLength >= maxLength) {
            var next = target;
            var nextElement = document.getElementById(`tradeVehicleVIN${(Number(next.id.slice(next.id.lastIndexOf("N") + 1))) + 1}`);
            while (next = nextElement) {
                if (next == null)
                    break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
        }
    }

    var container = document.getElementById("solidVinInputs");
    container.onkeyup = function (e) {

        var target = e.srcElement;
        var maxLength = parseInt(target.attributes["maxlength"].value, 10);
        var myLength = target.value.length;
        if (myLength >= maxLength) {
            var next = target;
            var nextElement = document.getElementById(`solidVehicleVIN${(Number(next.id.slice(next.id.lastIndexOf("N") + 1))) + 1}`);
            while (next = nextElement) {
                if (next == null)
                    break;
                if (next.tagName.toLowerCase() == "input") {
                    next.focus();
                    break;
                }
            }
        }
    }

    $("a[href='#finish']").click(function () {
        let sumSolidVehicleVIN = "";
        let sumTradeVehicleVIN = "";
        const isValidForm = passStep2 && passStep3 && passStep4 && form.valid();
        const apiUrl = "api/";
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
        for (var i = 1; i <= 17; i++) {
            sumSolidVehicleVIN += $(`#solidVehicleVIN${i}`).val();
        }
        for (var i = 1; i <= 17; i++) {
            sumTradeVehicleVIN += $(`#tradeVehicleVIN${i}`).val();
        }
        if (isValidForm) {
            const confirmElement = $(this);
            confirmElement.text("please wait...");
            confirmElement.removeClass("enabledConfirm");
            confirmElement.addClass("disabledConfirm");
            const addLoanDTO = {

                ApplicantFirstName: $('#applicantFirstName').val(),
                ApplicantLastName: $('#applicantLastName').val(),
                ApplicantMiddleName: $('#applicantMiddleName').val(),
                ApplicantDateOfBirth: $('#applicantDateOfBirth').val(),
                ApplicantSIN: $('#applicantSIN').val(),
                SpouseFirstName: $('#spouseFirstName').val(),
                SpouseLastName: $('#spouseLastName').val(),
                SpouseMiddleName: $('#spouseMiddleName').val(),
                SpouseDateOfBirth: $('#spouseDateOfBirth').val(),
                SpouseSIN: $('#spouseSIN').val(),
                ApplicantPhone: $('#applicantPhone').val(),
                CpApplicantPhone: $('#cpApplicantPhone').val(),
                MaritalStatus: $('#maritalStatus').val(),
                DriverLicence: $('#driverLicence').val(),
                ExpDate: $('#expDate').val(),


                ApplicantAddress: $('#applicantAddress').val(),
                ApplicantCity: $('#applicantCity').val(),
                ApplicantProvince: $('#applicantProvince').val(),
                ApplicantPostalCode: $('#applicantPostalCode').val(),
                ApplicantHowLongYear: $('#applicantHowLongYear').val(),
                ApplicantHowLongMonth: $('#applicantHowLongMonth').val(),
                PreviousApplicantAddress: $('#previousApplicantAddress').val(),
                PreviousApplicantCity: $('#previousApplicantCity').val(),
                PreviousApplicantProvince: $('#previousApplicantProvince').val(),
                PreviousApplicantPostalCode: $('#previousApplicantPostalCode').val(),
                PreviousApplicantHowLongYear: $('#previousApplicantHowLongYear').val(),
                PreviousApplicantHowLongMonth: $('#previousApplicantHowLongMonth').val(),
                OwnStatus: $("input[name='ownStatus']:checked").val(),
                MarketValue: $('#marketValue').val(),
                Mortgage: $('#mortgage').val(),
                MortgageBalance: $('#mortgageBalance').val(),
                MortgageHolder: $('#mortgageHolder').val(),

                PresentEmployerName: $('#presentEmployerName').val(),
                PresentEmployerOccupation: $('#presentEmployerOccupation').val(),
                PresentEmployerHowLongYear: $('#presentEmployerHowLongYear').val(),
                PresentEmployerHowLongMonth: $('#presentEmployerHowLongMonth').val(),
                PresentEmployerAddress: $('#presentEmployerAddress').val(),
                NatureBusiness: $('#natureBusiness').val(),
                PresentEmployerPhone: $('#presentEmployerPhone').val(),
                presentEmployerMonthlyIncome: $('#presentEmployerMonthlyIncome').val(),
                PresentEmployerTwoIncome: $('#presentEmployerTwoIncome').val(),
                PreviousEmployerName: $('#previousEmployerName').val(),
                PreviousEmployerPhone: $('#previousEmployerPhone').val(),
                PreviousEmployerHowLongYear: $('#previousEmployerHowLongYear').val(),
                PreviousEmployerHowLongMonth: $('#previousEmployerHowLongMonth').val(),
                ApplicantEmployerName: $('#applicantEmployerName').val(),
                ApplicantEmployerOccupation: $('#applicantEmployerOccupation').val(),
                ApplicantEmployerHowLongYear: $('#applicantEmployerHowLongYear').val(),
                ApplicantEmployerHowLongMonth: $('#applicantEmployerHowLongMonth').val(),
                ApplicantEmployerPhone: $('#applicantEmployerPhone').val(),
                ApplicantEmployerMonthlyIncome: $('#applicantEmployerMonthlyIncome').val(),
                ApplicantEmployerTwoIncome: $('#applicantEmployerTwoIncome').val(),

                SolidVehicleMake: $('#solidVehicleMake').val(),
                SolidVehicleModel: $('#solidVehicleModel').val(),
                SolidVehicleYear: $('#solidVehicleYear').val(),
                SolidVehicleKms: $('#solidVehicleKMS').val(),
                SolidVehicleVin: sumSolidVehicleVIN,
                SolidVehicleDamage: $('#solidVehicleDamage').prop("checked"),
                SolidVehicleRebuilt: $('#solidVehicleRebuilt').prop("checked"),
                SolidVehicleOut: $('#solidVehicleOut').prop("checked"),
                TradeVehicleMake: $('#tradeVehicleMake').val(),
                TradeVehicleModel: $('#tradeVehicleModel').val(),
                TradeVehicleYear: $('#tradeVehicleYear').val(),
                TradeVehicleKms: $('#tradeVehicleKMS').val(),
                TradeVehicleVin: sumTradeVehicleVIN,
                TradeVehicleDamage: $('#tradeVehicleDamage').prop("checked"),
                TradeVehicleRebuilt: $('#tradeVehicleRebuilt').prop("checked"),
                TradeVehicleOut: $('#tradeVehicleOut').prop("checked"),
                Price: $('#price').val(),
                DocFEE: $('#docFee').val(),
                Trade: $('#trade').val(),
                Difference: $('#difference').val(),
                DownPMT: $('#downPMT').val(),
                BalanceOwing: $('#balanceOwing').val(),

            };
            $.ajax({
                contentType: "application/json",
                type: "POST",
                url: apiUrl + "loan",
                data: JSON.stringify(addLoanDTO),
                success: function (data, textStatus, jqXHR) {
                    confirmElement.text("Confirm");
                    confirmElement.removeClass("disabledConfirm");
                    confirmElement.addClass("enabledConfirm");
                    toastr.success('Thank you for your request!', 'Success')
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    confirmElement.text("Confirm");
                    confirmElement.removeClass("disabledConfirm");
                    confirmElement.addClass("enabledConfirm");
                    toastr.error('please try again!', 'Error');
                }
            });
        }
        else {
            toastr.error('please fill out all steps!', 'Error')
        }
    });
});

