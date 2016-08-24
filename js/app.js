$(document).foundation();
$( document ).ready(function() {

    $("#button-go").click(function(event){
      event.preventDefault(); 
      var haslo = $("#my-input").val();
      var login = "efi";
      sendAjax(haslo,login);
        
    });

   function sendAjax(haslo,login) {
    
        var blad = document.getElementById("validation");
        
        if(haslo.length && login.length){
         
              $.ajax({
              type: "post",
              data: {
                login: login,
                password: haslo
              },
              url: "https://efigence-camp.herokuapp.com/api/login",

              error: function(response) {
                
                console.log('er', response.responseText);
                var obj = JSON.parse(response.responseText);
                blad.innerHTML= obj.message;

                $("#my-input").css({
                  "border" : "2px solid #f3741f"
                });
              },
              success: function(response) {
                console.log('sukces', response);
                //window.open("http://www.w3schools.com");
                window.location.assign("file:///C:/Users/Kasia/mojProjekt/dashboard.html");
              }
            });
         }

          else {

             blad.innerHTML= "Podaj hasło i/lub login";
               $("#my-input").css({
                  "border" : "2px solid #f3741f"
                });

            }

         $("#my-input").focus(function(){

            blad.innerHTML=""; 
            $("#my-input").css({
              "border": "1px solid #cacaca",
            });
            $("#my-input").val("");
         });

      
    }
       
// input search - hide and show
       $(".input-search").hide();
       $(".search-icon").on("click", function(){
          $(".input-search").toggle("slide", { direction: "right" }, 500);
        });

       $(".input-search").on("blur", function(){
          $(".input-search").hide("slide", { direction: "right" }, 500);
        });

       




});