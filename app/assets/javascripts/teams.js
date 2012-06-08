
$(document).ready(function(){
    console.log("ko");
   $('#myModal').modal();
   $('.typeahead').typeahead();
   $('.carousel').carousel({
  interval: 2000
})

    $.ajaxSetup({
    headers: {
      'X-CSRF-Token': jQuery("meta[name='csrf-token']").attr('content')
    }
  });
    
    function scrollToElement(selector, callback){
    var animation = {scrollTop: $(selector).offset().top};
    $('html,body').animate(animation, 'slow', 'swing', function() {
        if (typeof callback == 'function') {
            callback();
        }
        callback = null;
    });
    }

    
    
   $(".h").click(function(){
    scrollToElement('.home');
   })

    $(".b").click(function(){
    scrollToElement('.bootcamp');
   })

    $(".t").click(function(){
    scrollToElement('.teams');
   })
 
   $(".p").click(function(){
    scrollToElement('.prizes');
   })

   $(".v").click(function(){
    scrollToElement('.venue');
   })


   $(".s").click(function(){
    scrollToElement('.schedule');
   })

   $(".r").click(function(){
    scrollToElement('.rules');
   })

   $(".c").click(function(){
    scrollToElement('.contributors');
   })

   $(".m").click(function(){
    scrollToElement('.myteam');
   })

    
    $("#delete_team").click(function(){
      event.preventDefault();
      console.log("lolsss")
       $.ajax({
          url     : $("#delete_team").attr("href")
        , data    : {}
        , type    : "DELETE"
        , success : function (response) {
               console.log(response.data)
          }
        });
       return
    })
  

    $("#team_form").submit(function(){
        event.preventDefault();
        if($("#team_form").find(".error").length > 0 )
            return false
        var o = {}
        formValues = $(this).serializeArray()
        formValues.map(function(obj) {
          if (o[obj.name] !== undefined) {
            if (!o[obj.name].push) {
                o[obj.name] = [o[obj.name]]
            }
            o[obj.name].push(obj.value || '')
          } else {
            o[obj.name] = obj.value || ''
          }
        });
        
        $.ajax({
            url: '/teams',
            type: "POST",
            data: o,
            success: function(response) {
              console.log(response)
                if(response.err){
                  $('.help-block').last().html(response.data)
                  $('.backend').last().addClass("error")      
                }
                else{ 
                  window.location = "/"
               }
            }
        });
            return false;
        });

    });