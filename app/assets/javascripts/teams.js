
$(document).ready(function(){
    console.log("ko");

  // Activate bootstrap elements
  $('#myModal').modal();
  $('.typeahead').typeahead();
  $('.carousel').carousel({
     interval: 2000
  })

  // Csrf verification 
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': jQuery("meta[name='csrf-token']").attr('content')
    }
  });

  // Share
  $("#ShareTweet").click(function(e) {
      e.preventDefault()
      var self = this
      var turl = "https://twitter.com/intent/tweet?text=Team for good @cfcodesprint&url=http://contributingcode.cloudfoundry.com&related=cloudfoundry" 
      var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left

      window.open(turl, 'twitterpop', opts)
      return false;
    })

    $("#ShareFacebook").click(function(e) {
      e.preventDefault()
      var self = this
      var fburl = "http://www.facebook.com/sharer.php?u=" + "contributingcode.cloudfoundry.com"
      var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left  

      window.open(fburl, 'facebookpop', opts)
      return false;
    })
    
  // My team js hide and show  
  $(".team_btn").click(function(){
    event.preventDefault();
    var choice = $(this).attr('id')
    $(".general").addClass("hide")
    if(choice=="b1")
      $("#a1").removeClass("hide")
    else if(choice=="b2")
       $("#a2").removeClass("hide")
    else 
      $("#a3").removeClass("hide")
  })
    
  // Join  a team 
  $(".selectTeam").click(function(e){
    e.preventDefault();
    var $this = $(this)
    bootbox.confirm("Are you sure ?", function(result) {
      if (!result) {
        return false
      }
      $.ajax({
        url     : $this.attr("href")
      , success : function (response) {
        if(response.err){         
          $this.parent().remove()
          
        }
        }
      });
    }); 
    return false
  })



  // Owner adds a user to team  request 
  $(".addReq").click(function(e){
    e.preventDefault();
    var $this = $(this)
      $.ajax({
        url     : $this.attr("href")
      , success : function (response) {
          window.location = "/"        
        }
      }); 
    return false
  })
  

  // Decide join request 
  $(".owner_decides").click(function(e){
    e.preventDefault();
    var $this = $(this)
      $.ajax({
        url     : $this.attr("href")
      , success : function (response) {
        if(response.err){
          window.location = "/"
        }
        else{
          $this.parent().remove()
        }
        }
      });
    return false
  })
  

  // Delete team 
  $("#delete_team").click(function(e){
    e.preventDefault();
    bootbox.confirm("Are you sure you want to delete the team ?", function(result) {
      if (!result) {
        return false
      }
      $.ajax({
        url     : $("#delete_team").attr("href")
      , data    : {}
      , type    : "DELETE"
      , success : function (response) {
          window.location = "/"
        }
      });
     return false  
    });
  })
  
  

  // Create team form 
  $("#team_form").submit(function(e){
      e.preventDefault();
      if($("#team_form").find(".error").length > 0 )
          return false
      var infile = document.getElementById('image')
      var inform = document.getElementById('team_form')
      var formData = new FormData(inform)
      formData.append('image', infile.files[0])
      var xhr = new XMLHttpRequest()
      xhr.open($("#team_form").attr('method'), $("#team_form").attr('action'), true)
      xhr.setRequestHeader('X-CSRF-Token' , $("meta[name='csrf-token']").attr('content'))
        xhr.onreadystatechange = function (e) {  
          if (xhr.readyState === 4) {  
            if (xhr.status === 200) {  
              var response = JSON.parse(xhr.responseText)
            if(response.err){
              $('.help-block').last().html(response.data)
              $('.backend').last().addClass("error")      
            }
            else{ 
              window.location = "/"
               scrollToElement('.myteam');
            }
          }
        } 
      }
        // XHR
        xhr.send(formData)

    return false;
  });


  // Remove member
  $(".removeMember").click(function(){
    event.preventDefault();
    var $this = $(this)
    bootbox.confirm("Are you sure you want to delete the team member ?", function(result) {
      if (!result) {
        return false
      } 
      $.ajax({
          url: this.href,
          type: "DELETE",
          data: {},
          success: function(response) {
              if(response.err){
                window.location = "/"       

              }
              else{ 
                $this.parent().remove()
             }
          }
      });
    });
  return false;
  });

  
  // For page scrolling 
  function scrollToElement(selector, callback){
    var animation = {scrollTop: $(selector).offset().top};
    $('html,body').animate(animation, 'slow', 'swing', function() {
        if (typeof callback == 'function') {
            callback();
        }
        callback = null;
    });
  }

  // On hover animation
  $(function() {
      $(".nav_hover")
          .mouseover(function() { 
             if ($(this).hasClass('clicked1')) {
              return false
          }else{
              var src = $(this).attr("src").replace(".png", "_hover.png");
              $(this).attr("src", src);
            }
          })
          .mouseout(function() {
            if ($(this).hasClass('clicked1')) {
              return false 
            }else {
              var src = $(this).attr("src").replace("_hover.png", ".png");
              $(this).attr("src", src);
            }
          });
  });

  //On click animation 
  $(function() {
      $(".nav_hover")
          .click(function() { 
            var self = $(this)
            var els = $(".nav_hover")
            $.each(els, function (index, el) {
              $(el).removeClass("clicked1")
              var src = $(el).attr("src").replace("_hover.png", ".png");
              $(el).attr("src", src);
            })
          var src = self.attr("src").replace(".png", "_hover.png");
          self.attr("src", src);
          self.addClass("clicked1");
          })
  });

  $(".h").click(function(){
    scrollToElement('.home');
  })

  $(".b").click(function(){
    scrollToElement('.bootcamp');
  })

  // $(".t").click(function(){
  //   scrollToElement('.teams');
  // })

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

  // $(".c").click(function(){
  //   scrollToElement('.contributors');
  // })

  $(".m").click(function(){
    scrollToElement('.myteam');
  })
  
});