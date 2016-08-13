$( document ).ready(function() {

    $("#button-go").click(function(event){
    event.preventDefault();	
    var haslo = $("#my-input").val();
    sendAjax(haslo);
    	
	});




   function sendAjax(haslo) {
    
    if(haslo.length>0){

    	$.ajax({
		  type: "post",
		  data: {
		    login: "efi",
		    password: haslo
		  },
		  url: "https://efigence-camp.herokuapp.com/api/login",
		  error: function(response) {
		    console.log('er', response.responseText);
		  },
		  success: function(response) {
		    console.log('sukces', response);
		  }
		});
    }

    else{

    	var blad = document.getElementById("validation");
    	blad.innerHTML ="Podaj hasło";

   		}

   		


   }



});