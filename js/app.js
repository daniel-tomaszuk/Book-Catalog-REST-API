
$(document).ready(function(){
    var URL = 'http://localhost:8000/book/';


    var GENRES = [[1, "Romans"], [2, "Obyczajowa"],[3, "Sci-fi i fantasy"],
                [4, "Literatura faktu"], [5, "Popularnonaukowa"], [6, "Poradnik"],
                [7, "Kryminał, sensacja"]];

    var showAll = $('#show_all');
    var dataOl =$('#data_db');

    // GET data form DB by means of asynchronous way ..
    // 18ms < 50%; 25ms -> 100% for localhost
    $.ajax({
        url: URL,
        data: {},
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        async: false,
        success: function(response){
            console.log('Success!');
//            console.log(response);
            for (var i = 0; i < response.length; i++){
                var dataLi = $('<li>');

                var dataUl1 = $('<ul>');
                var dataUl2 = $('<ul>');
                var dataUl3 = $('<ul>');
                var dataUl4 = $('<ul>');
                var dataUl5 = $('<ul>');
                var dataUl6 = $('<ul>');

                dataUl1.append(response[i].author);
                dataUl1.addClass('author');
                dataUl1.attr('flag', '0');

                  // for later use with checking if add or delete additional info
                for (var j=0; j < GENRES.length; j++){
                    if (GENRES[j][0] == response[i].genre){
                        dataUl2.append(GENRES[j][1]);
                    };
                };

                dataUl5.append(response[i].title);
                dataUl3.append(response[i].isbn);
                dataUl4.append(response[i].publisher);
                dataUl6.append(response[i].id);
                dataUl6.addClass('id');

                dataLi.append(dataUl6);
                dataLi.append(dataUl1);
//                dataLi.append(dataUl2);
//                dataLi.append(dataUl3);
//                dataLi.append(dataUl4);
//                dataLi.append(dataUl5);

                dataOl.append(dataLi);
            };
        },
        error: function(response){
            console.log('Fail!\n' + response);
        }
    });


    $('.author').on('click', function(){
        var urlAddon = $(this).siblings('ul.id').text();

//        console.log($(this));
        // remember which list element has been clicked
        $.ajax({
            url: URL + urlAddon,
            data: {},
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            async: false,
            // mind bind at the end of function!!
            success: function(response){
                console.log('Success!');
//                console.log(this);
                var dataUl2 = $('<ul>');
                for (var j=0; j < GENRES.length; j++){
                    if (GENRES[j][0] == response.genre){
                        dataUl2.append(GENRES[j][1]);
                        dataUl2.addClass('data');
                    };
                };

                var dataUl3 = $('<ul>');
                dataUl3.append(response.isbn);
                dataUl3.addClass('data');
                var dataUl4 = $('<ul>');
                dataUl4.append(response.publisher);
                dataUl4.addClass('data');
                var dataUl5 = $('<ul>');
                dataUl5.append(response.title);
                dataUl5.addClass('data');

                // if there is only author and his id: add more info on click
                if ($(this).attr('flag') == '0'){
                // append more information
//                    console.log('adding..')
                    $(this).parent().append(dataUl5);
                    $(this).parent().append(dataUl3);
                    $(this).parent().append(dataUl4);
                    $(this).parent().append(dataUl2);

                };
                //if there is already more info: remove info on click
                if ($(this).attr('flag') == '1'){
                    $(this).siblings('.data').each(function(){
//                        console.log($(this));
                        $(this).remove();
                    });
                };

                if ($(this).attr('flag') == '0'){
                    $(this).attr('flag', '1');
                } else{
                    $(this).attr('flag', '0')
                };

            }.bind(this),
            error: function(response){
                console.log('Fail!\n' + response);
            }
        });
    });

    // if there is some data to POST into DB - make json and send!
    $('#add_book').on('submit', function(event){
        var flagAdd = 1; // flag for form validation
        var message = $('#add_book_msg');
        event.preventDefault();
        console.log('add_book');
//        var author = $('#add_book > label:nth-of-type(1) > input');
        var author = $('#add_book > label > input[name="author"]');
        var title = $('#add_book > label > input[name="title"]');
        var isbn = $('#add_book > label > input[name="isbn"]');
        var publisher = $('#add_book > label > input[name="publisher"]');
        var genre = $('#add_book > label > select[name="genre"]');

//        console.log(author.val());
//        console.log(title.val());
//        console.log(isbn.val());
//        console.log(publisher.val());
//        console.log(genre.val());
        if(publisher.val().length <= 0){
            message.text('Error! No Publisher!');
            message.css('color', 'red');
            flagAdd = 0;
        };
        if (isbn.val().length <= 0){
            message.text('Error! No ISBN!');
            message.css('color', 'red');
            flagAdd = 0;
        };
        if (author.val().length <= 0 || title.val().length <= 0){
            message.text('Error! No name or no title!');
            message.css('color', 'red');
            flagAdd = 0;
        };

        if (flagAdd == 1){
            var myData = {
                            "author": author.val(),
                            "title": title.val(),
                            "isbn": isbn.val(),
                            "publisher": publisher.val(),
                            "genre": genre.val(),
                         };
            console.log(myData);
            $.ajax({
                url: URL,
                data: myData,
                type: 'POST',
                crossDomain: true,
                dataType: 'json',
                async: false,
                success: function(response){
                    console.log('Success POST!');
                    message.text('Book added!');
                    message.css('color', 'green');
                    

                },
                error: function(response){
                    console.log('Fail!\n' + response);
                }
            });

        };




    });





});























//     $.ajax({
//            url: URL,
//            type: "GET",
//            crossDomain: true,
////            data: JSON.stringify(myData),
//
//            async : true,
//            data: {},
//            dataType: "jsonp",
//            success: function (data) {
//                var resp = JSON.parse(data);
//                alert('Success');
//            },
//            error: function (xhr, status) {
//                console.log("error");
//                console.log(status);
//            }
//        });
//
//});














//        $.get(URL, function(data, status){
////            myP.text(data.time);
//            console.log(status);
//        });
// DDOS 101 :)
//    showAll.on('click', function(){
//        setInterval(function(){
//            $.get(URL, function(data, status){
//                myP.text(data.time);
//                console.log(data);
//            });
//            }, 10000);
//        });
//    });

//        $.ajax({
//            url: 'http://localhost:8000/book/',
//            data: {},
//            type: "GET",
//            dataType: "json",
//            done: function (json){},
//            fail: function (xhr, status, errorThrown){},
//            always: function (xhr, status){}
//        });
//    });



