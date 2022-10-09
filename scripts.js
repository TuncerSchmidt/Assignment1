
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          url:'/users',
          dataType:'json',
          success:function(e){
    //After getting a success, I clear table
    $('#namebody').html('')
    // Then I am giving all the outputs in a certain way
    $.each(e,function(index,item){
        var user=`<tr><td>${item.id}</td><td>${item.screen_name}</td><td>${item.name}</td></tr>`;
        $('#namebody').append(user);
        })
          }
        })
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        //It is getting all tweets 
        $.ajax({
          url:'/tweets',
          dataType:'json',
          success:function(e){
            //clear table
            //After that I am clearing the previous shown tweetbody
            //Basically I am updating by deleting old one
            //So there is no repeat
      $('#tweetbody').html('')
      $.each(e,function(index,item){
      var tweet=`<tr><td>${item.id}</td><td>${item.text}</td><td>${item.created_at}</td></tr>`;
      $('#tweetbody').append(tweet);
        })
          }
        })
    });

    // search tweets
    $('#searchsubmit').on('click', function(event){
      event.preventDefault(); //TODO: get a search tweets
      //I am searching tweets according to search input val
        $.ajax({
          data:{'term':$('#search-input').val()},
          url:'/searchinfo',
          dataType:'json',
          success:function(e){
            //It is successful, I am deleting input field
            //I want to make it prettier
            $("#search-input").val("");
        $.each(e,function(index,item){
      //This is the design part
        var tweet=`<tr><td>${item.id}</td><td>${item.text}</td><td>${item.created_at}</td></tr>`;
        $('#searchbody').append(tweet);
        })
          }
        })
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet
        //I am creating a tweet here
        $.ajax({
          data:{'data':$('#create-input').val()},
          url:'/createtweet',
          dataType:'json',
          success:function(e){
              console.log('success');
              //if it is successful
              //It deletes input field. I wrote this line to make it prettier
              $("#create-input").val("");
             
              $.ajax({
                url:'/tweets',
                dataType:'json',
                success:function(e){
                  //clear table
                  //It clears table and prevents duplicates
                  //After that design was created in certain formats
          $('#tweetbody').html('')
      $.each(e,function(index,item){
        var tweet=`<tr><td>${item.id}</td><td>${item.text}</td><td>${item.created_at}</td></tr>`;
        $('#tweetbody').append(tweet);
      })
                }
              })
          }
          
        });
        
  });


  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
       //TODO: update a tweet
       //I am updating values here by getting value of the input first
          $.ajax({
        data:{'name':$('#update-input').val()},
        url:'/updateuser',
        dataType:'json',
        success:function(e){
          //If it is successful, it deletes input field so that it looks prettier
          $("#update-input").val("");
          console.log('success');
//Here after creating I am getting all users again. Another way of refreshing an clicking get users button
              $.ajax({
                  url:'/users',
                  dataType:'json',
                  success:function(e){

//clear table
//Here I clear table to prevent duplicates
          $('#namebody').html('')
          $.each(e,function(index,item){
          var user=`<tr><td>${item.id}</td><td>${item.screen_name}</td><td>${item.name}</td></tr>`;
          $('#namebody').append(user);
          })
        }
        })
        }
      })
    


  });


  //DELETE
  $("#delete-form").on('submit', function(event) {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
    //I delete here. I get Id from input
    $.ajax({
      data:{'tweetid':$('#delete-input').val()},
      url:'/deletetweet',
      dataType:'json',
      success:function(e){
        //If it is successful I make input field empty to make it pretties
      console.log('success');
      $("#delete-input").val("");
      $.ajax({
  //Here I am refreshing page basically
         url:'/tweets',
        dataType:'json',
          success:function(e){
    //clear table
//I clean table here toprevent duplicates
        $('#tweetbody').html('')
        $.each(e,function(index,item){
        var tweet=`<tr><td>${item.id}</td><td>${item.text}</td><td>${item.created_at}</td></tr>`;
        $('#tweetbody').append(tweet);
      })
      }
        })
      }
    })

  });


});


                    
   