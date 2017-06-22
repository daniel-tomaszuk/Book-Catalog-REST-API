
$(document).ready(function(){
    var URL = 'http://localhost:8000/book/';
    var myData = [];

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
                  // for later use with checking if add or delete additional info
                for (var j=0; j < GENRES.length; j++){
                    if (GENRES[j][0] == response[i].genre){
                        dataUl2.append(GENRES[j][1]);
                    };
                };

                dataUl3.append(response[i].isbn);
                dataUl4.append(response[i].publisher);
                dataUl5.append(response[i].title);
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

    var flag = 0; // to know if add or remove additional data on click
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
                if (flag === 0){
                // append more information
                    console.log('adding..')
                    $(this).parent().append(dataUl3);
                    $(this).parent().append(dataUl4);
                    $(this).parent().append(dataUl5);
                };
                //if there is already more info: remove info on click
                if (flag === 1){
                    $(this).siblings('.data').each(function(){
//                        console.log($(this));
                        $(this).remove();
                    });
                };
                if (flag === 0){ flag = 1; } else { flag = 0; };
            }.bind(this),
            error: function(response){
                console.log('Fail!\n' + response);
            }
        });
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



