// var obj = new Object();
// obj.crate = function (fync) {
//     var f = fync;
//     f.error(1314);
// }
// obj.crate({
//     error: function( msg ) {
//         console.log( msg );
//             }
// });
// $l(true);

// var domain = 'https://workgood.org';
var domain = 'http://careertrail';
var sendApplication = '/api/v1/queries';
var vacancies = '/api/v1/vacancies/active';
 var images = '/api/v1/images';
var i;
var currentCard;


// String.prototype.capitalize = function() {
//     return this.charAt(0).toUpperCase() + this.slice(1);
// }
// var domainName = window.location.hostname;

// $('#brand').text(domainName.substring(0, domainName.indexOf('.')).capitalize());
// var person = new Object();

function getCards() {//first load
    action = 'GET';
    $.ajax({
        url: domain + vacancies,
        method: action,
        dataType: 'json',
        success: function(response) {
            for (i = 0; i < response.length; i++) {           
                var card = 
                    `<div class="card mx-md-auto my-3 my-md-3">
                        <div class="row justify-content-center justify-content-md-between align-items-center my-4">
                            
                            <div class="col-12 col-md-5 short-info px-5 px-md-0" id="short-info"></div>
                        </div>
                        <div class="collapse">
                            <pre class="card-text mx-4 mx-md-5 description" id="description"></pre>
                            <a href="#" class="card-link btn bg-success text-light createApplication" id="1">Подать заявку</a>
                        </div>
                    </div>`;
                currentCard = $('#cards').append(card).find('div.card:last-child').attr({
                    'data-image-id': response[i]['FK_image'],
                    'data-id': response[i]['id']
                    // 'display': 'none'                    
                    // 'opacity': '0'
                }).hide();
                // console.log(response[i]['card-short-info']);                
                console.log(response[i]);
                var shortInfo = currentCard.find('#short-info').html(response[i]['card-short-info']);
                shortInfo.find('h4 > span').text(response[i]['card-title']);
                shortInfo.find('span:eq(1)').text(response[i]['price']);
                shortInfo.find('span:eq(2)').text(response[i]['end_date'].substring(0, 10).replace('-', '.').replace('-', '.'));
                // console.log(response[0]['end_date'])                                                    
                // shortInfo.find('span:eq(2)').text(response[0]['end_date']);
                shortInfo.find('span:eq(3)').text(response[i]['counter']);
                shortInfo.find('span:eq(4)').text(response[i]['location']);                    
                                           
                currentCard.find('#description').html(response[i]['card-body']);
                // currentCard.find('#short-info').append('<div>').find('div').html(response[i]['card-short-info']);
                // .css('background-color', 'red');
                currentCard.find('a.createApplication').attr('data-id', response[i]['id']);

            };
        }
    }).then(function() {
        $.ajax({
            url: domain + images,
            method: action,
            dataType: 'json',
            success: function(response) {
                for (i = 0; i < response.length; i++) {
                    $(`#cards > div.card[data-image-id=${response[i]['id']}]`)
                    .each(function() {
                        var newImage = `<img src="${domain}/${response[i]['link']}" class="col-11 col-md-5 my-3 image" alt="..."></img>`;
                        $(this).find('#short-info').before(newImage);
                    });
                }; 
                $('div.card').show();
                // .attr('opacity', '1');
            }
        });
    });  
    
    
};
 
getCards();

$(document).ready(function () {
    // console.log(document.domain)
    // console.log(window.location.hostname)
    

    $('#collapsibleNavbar').on('click', function () {
        $(this).collapse('hide');
    });
    $('.nav-link').on('click', function () {
        $(this).tab('show');
    });
    $('#cards').on('click', 'a.createApplication', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#applicationModal').modal('show');
        person.FK_vacancy = $(this).attr('data-id');
    });
    // var domain = "https://reqres.in/api/users?delay=3";
    // var domain = 'http://138.197.178.187:4000';
    // $('#applicationModal').modal('show');
    
    var namePassPattern = /^[\wа-яА-ЯіїєІЇЄ'\-,.][^0-9_!¡?÷?¿\/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i;    
    var phonePassPattern = /^\d{9}$/;
    
    $('#firstName').on('change', function () {
        var errorIcon = $('#error-icon1');
        var errorMessage = $('#error-message1');        
        validate($(this), namePassPattern, errorIcon, errorMessage);
    });
    // $('#lastName').on('change', function () {
    //     var errorIcon = $('#error-icon2');
    //     var errorMessage = $('#error-message2');
    //     validate($(this), namePassPattern, errorIcon, errorMessage);
    // });
    // $('#fathersName').on('change', function () {
    //     var errorIcon = $('#error-icon3');
    //     var errorMessage = $('#error-message3');
    //     validate($(this), namePassPattern, errorIcon, errorMessage);
    // });
    $('#birthDate').on('change', function () {
        var errorIcon = $('#error-icon2');
        var errorMessage = $('#error-message2');
        validate($(this), null, errorIcon, errorMessage);
    });    
    $('#phone').on('change', function () {
        var errorIcon = $('#error-icon4');
        var errorMessage = $('#error-message4');
        validate($(this), phonePassPattern, errorIcon, errorMessage);
    });
    var errorsCount = 0;
    function validate(element, passPattern, errorIcon, errorMessage) {
        var value = element.val();
        var isValid;
        if (element.attr('type') == 'date') {
            isValid = validateBirthDate(value);
            // if (!isValid) {
            //     // console.log($('label[for="birthDate"]'))
            //     $('label[for="birthDate"]').hide();
            // } else {
            //     $('label[for="birthDate"]').show();
            // };
        } else if (element.attr('type') == 'radio') {
            isValid = !!element.filter(':checked').length;
        }else {
            isValid = passPattern.test(value);
        };
        
        var hasError = element.data('hasError');
        if (!isValid || value.length == 0) {
            if (element.attr('type') != 'radio') {
                element.addClass('invalid-value');
            };            
            if (hasError === false || hasError === undefined) {
                errorsCount++;
            };
            element.data({ hasError: true });
            if (errorIcon) {
                errorIcon.removeClass('d-none');            
            };            
            errorMessage.collapse('show');
        } else 
        if (isValid) {
            if (element.attr('type') != 'radio') {
                element.removeClass('invalid-value');
            };             
            if (errorIcon) {
                errorIcon.addClass('d-none');
            };              
            errorMessage.collapse('hide');
            if (hasError === true) {
                errorsCount--;
            };
            element.data({ hasError: false });
        };
        // console.log(`id = ${element.attr('id')}`);
        // console.log(`hasError = ${element.data('hasError')}`);
    };
    // $.fn.readData = function () {
    //         if (!this.data('hasError')) {
    //             person[this.attr('id')] = this.val();
    //         };
    //     };
    // $.fn.extend({
    //     readData: function () {
    //         if (!this.data('hasError')) {
    //             // this.data( { person: { [this.attr('id')]: this.val() } } );
    //             var elementId = this.attr('id');
    //             if (elementId === 'phone') {                    
    //                 person[elementId] = $('#countryCode').val().concat(this.val());    
    //             } else {
    //                 person[elementId] = this.val();
    //             };                
    //             console.dir(person);
    //         };
    //     }
    // });
    
    function parseDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth()+1).toString().padStart(2, '0');
        var day = date.getDate().toString().padStart(2, '0');
        var hour = date.getHours().toString().padStart(2, '0');
        var minute = date.getMinutes().toString().padStart(2, '0');
        var second = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    };
    function validateBirthDate(date) {
        var currentDate = new Date();
        var entryDate = new Date(date);
        if (entryDate > currentDate) {
            return false;
        } else {
            return true;
        };
    };
    
    $('#submitButton').on('click', function () {        
        //проводим валидацию повторно на случай если пользователь попробует отправить форму, не тронув поля
        $('#firstName').change();
        // $('#lastName').change().readData();
        // $('#fathersName').change().readData();
        $('#birthDate').change();
        $('#phone').change();
        // $('#countryCode').readData();
        // $('#country').readData();
        var applicationDate = parseDate(new Date());
        person.send_date = applicationDate;
        person.first_name = $('#firstName').val();
        // person.last_name = null;
        // person.father_name = null;
        person.birth_date = $('#birthDate').val();
        person.phone = $('#countryCode').val().concat($('#phone').val());
        person.FK_country_from = $('#countryFrom').val();
        person.FK_country_to = $('#countryTo').val();
        // person.email = null;
        // person.FK_image = null;
        person.is_approved = 0;
        person.documents = $.trim($('input[type="radio"]:checked').parent().text());
        console.log($.trim($('input[type="radio"]').filter(':checked').parent().text()));
        // console.log($('input[type="radio"]:checked').length)

        validate($('input[type="radio"]'), null, null, $('#error-message3'));

        if (!$('input[type="radio"]:checked').length) {
            console.log('fail')
        }
        // $('input[type="radio"]').each(function() {
        //     console.log($(this).prop('checked'))
        // })
        
        // console.log(`errorCount = ${errorsCount}`);
        if (errorsCount == 0) { 
            console.log(person)           
            $.ajax({
                url: domain + sendApplication,
                method: "POST",
                data: person,
                success: function (response) {
                    console.log(response);
                }
            });
            $('#applicationModal').modal('hide');
        };        
    });
        
    
           
    



    $('#cards').on('click', 'div.card', function() {        
        $(this).find('.collapse').slideToggle('slow');
        $(this).siblings().find('.collapse').slideUp('slow');                       
    });
    
    $('.test').click(function() {
        $(this).animate({
            'top': '+=10',
        }, 1000);
    });
    
});
// $l(false);
