const root = document.documentElement;

const pp = document.querySelector('#js-eventPP');
if (pp) {
    const eventOpenBtn = document.querySelector("#js-eventOpenBtn");
    const closeEventPP = function (event) {
        function close() {
            document.removeEventListener("keyup", closeEventPP);
            pp.removeEventListener("click", closeEventPP);
            root.classList.remove("show-event-popup");
        }
        switch (event.type) {
            case "keyup":
                if (event.key === "Escape" || event.keyCode === 27) close();
                break;
            case "click":
                if (
                    event.target === this ||
                    event.target.classList.contains("js-ppCloseBtn")
                )
                    close();
                break;
        }
    };
    eventOpenBtn.addEventListener("click", function () {
        root.classList.add("show-event-popup");
        document.addEventListener("keyup", closeEventPP);
        pp.addEventListener("click", closeEventPP);
    });
}

const navToggle = document.querySelector("#js-navToggle");
navToggle.addEventListener("click", function () {
    root.classList.toggle("show-nav");
});


const jsSelectric = $(".js-selectric");
if (jsSelectric.length) {
    
    jsSelectric.selectric({
        nativeOnMobile: false
    });
}

const mobileMask = $('.js-mobileMask');
if (mobileMask.length) {
    mobileMask.mask('+7 (000) 000 00 00', { placeholder: "+7 (___) ___ __ __" });
}

const dateField = $(".js-dateField");
if (dateField.length) {
    const pickerInit = function (pick) {
        const dateInput = pick.find(".js-dateInput");
        const dateDay = pick.find(".js-dateDay");
        const dateMonth = pick.find(".js-dateMonth");
        const dateYear = pick.find(".js-dateYear");
        const dateConfig = {
            autoClose: true,
            minDate: new Date(),
            navTitles: {
                days: "MMMM <i>yyyy</i>"
            },
            onSelect: function ({ date }) {
                dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
                dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
                dateYear.val(date ? date.getFullYear() : "");
            }
        };
        new AirDatepicker(dateInput[0], dateConfig);
    };
    $.each(dateField, function (i) {
        pickerInit($(this));
    });
}

const eventForm = $('#js-eventForm');
if (eventForm.length) {
    eventForm.validate({
        errorElement: "span"
    });
}

const subscribeForm = $("#js-subscribeForm");
if (subscribeForm.length) {
    const subscribeAction = subscribeForm.attr("action");
    const subscribeEmail = subscribeForm.find("#js-subscribeEmail");
    subscribeForm.validate({
        errorElement: "span",
        submitHandler: function (form, event) {
            event.preventDefault();
            $.ajax({
                url: subscribeAction,
                method: "POST",
                data: {
                    email: subscribeEmail.val()
                },
                success: function () {
                    subscribeEmail.val("");
                    subscribeEmail.blur();
                    alert("Вы успешно подписались на рассылку новостей");
                },
                error: function () {
                    alert("Что-то пошло не так, попробуйте еще раз");
                }
            });
        }
    });
}