$(document).foundation();
$(document).ready(function() {

    $(".login-form").submit(function(event){
      event.preventDefault(); 
      var haslo = $(".my-input").val();
      var login = "efi";
      sendAjax(haslo,login);
        
    });

   function sendAjax(haslo,login) {
     
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
                $(".validation_info").html(obj.message);
                $(".my-input").toggleClass("validation_border");
              },
              success: function(response) {
                window.location.assign("file:///C:/Users/Kasia/mojProjekt/dashboard.html");
              }
            });
         }

        else {
              $(".validation_info").html("Podaj hasło i/lub login");
              $(".my-input").toggleClass("validation_border");
             }

      $(".my-input").focus(function(){

        $(".validation_info").html("");
        $(this).removeClass("validation_border").val("");
         });
  }
   
   function getAjax() {
        $.ajax({
              type: "GET",
              url: "https://efigence-camp.herokuapp.com/api/data/summary",

              error: function(response) {
                alert("Błąd nie ma połączenia z API");

              },
              success: function(response) {

                var funds =response.content[0].funds;
                var balance=response.content[0].balance;
                var payments = response.content[0].payments;
              
                numberWithSpaces(funds,balance,payments);

                }
            });

          $.ajax({
              type: "GET",
              url: "https://efigence-camp.herokuapp.com/api/data/products",

              error: function(response) {
                alert("Błąd nie ma połączenia z API");

              },
              success: function(response) {
                //console.log(response);
                var amount0 =response.content[0].amount;
                var currency0 =response.content[0].currency;
                  $(".date-history").html();
                
                }
            });

          

 $.ajax({
              type: "GET",
              url: "https://efigence-camp.herokuapp.com/api/data/history",

              error: function(response) {
                alert("Błąd nie ma połączenia z API");

              },
              success: function(response) {
               
               addHistoryItem(response);

              }
        });
     }

    getAjax();

    function addHistoryItem(response){
                  console.log(response);
                  
                   for(var i=0; i< response.content.length; i++){
                        var date = new Date(response.content[i].date);
                        var year = date.getFullYear();
                        var month = date.getMonth();
                        var day = date.getDate();
                        month= month+1;
                        if (month<10){
                            month = "0" + month;     
                        }
                        if (day<10){
                            day = "0" + day;     
                        }
                        var date_history="<div class='date-history'>"+day+"."+month+"."+year+"</div>";
                        var loc_history_p= '<p class="localization-history">'+response.content[i].description+'</p>';
                        //var category_of_expenditur_p ='<p class="category-of-expenditure">'+response.content[i].category+'</p>';
                        var category_of_expenditur_p= 
                        '<p>'+'<select>'
                          +'<option value="response_category">'+response.content[i].category+'</option>'
                          +'<option value="food">'+'Food'+'</option>'
                          +'<option value="cash">'+'Cash'+'</option>'
                          +'<option value="cash">'+'Gas'+'</option>'
                        +'</select>'+'</p>'; 
                        var history_amount_span= '<span class="history-amount">'+response.content[i].amount+'</span>';
                        var history_currency_span ='<span class="history-currency">'+response.content[i].currency+'</span>';
                        var text="<li class='row collapse history-single-item'>"
                                  +"<div class='small-2 columns'>"
                                    +date_history
                                  +"</div>"
                                  +"<div class='small-8 columns local-and-category-wrapper'>"
                                    +loc_history_p+category_of_expenditur_p
                                  +"</div>"
                                  +"<div class='small-2 columns'>"
                                    +"<div class='income-and-expenditures'>"
                                      +history_amount_span+" "+history_currency_span
                                    +"</div>"
                                  +"</div>"
                                +"</li>";
                     

                       $(".history-list").append(text);
                    }
                  }       

  function numberWithSpaces(funds,balance,payments) {
   
     var array1 = [funds,balance,payments];
     var array2= [];
     var result= "";
     for(i=0;i< array1.length; i++){
         var string_nr = array1[i].toString();
         //warunek sprawdza czy liczba zawiera miejsca po przecinku
         if(string_nr.indexOf(".")==-1){
           var string_nr_split= string_nr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            result = "<b>"+ string_nr_split + ".00" +"</b>" + " PLN";
            }
         else{
            var part_of_string_nr =string_nr.split(".");
            part_of_string_nr[0] = part_of_string_nr[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            result = "<b>"+part_of_string_nr.join(".")+"</b>" + " PLN";
           }
         array2.push(result);
         }
      
    showResult(array2);
   }

 function showResult(array2){

    $(".funds").html(array2[0]);
    $(".balance").html(array2[1]);
    $(".payments").html(array2[2]);

 }
// input search - hide and show
       $(".input-search").hide();
       $(".search-icon").on("click", function(){
          $(".input-search").toggle("slide", { direction: "right" }, 500);
        });

       $(".input-search").on("blur", function(){
          $(".input-search").hide("slide", { direction: "right" }, 500);
        });

//buttony filtrowanie
       $(".grey-button").click(function(event){
          event.preventDefault(); 
          $(".finished").hide();
        });
       $(".blue-button").click(function(event){
          event.preventDefault(); 
          $(".finished").show();
        });

// boksy efekt checked
      $("li").removeClass("checked");
      $("i").removeClass("fa-check");
      $(".number-of-percent").show();
      $(".single-box").click(function(event){
          event.preventDefault(); 
          $(this).parents("li").toggleClass("checked").find("i").toggleClass("fa-check");
        });

});