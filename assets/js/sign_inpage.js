{
    //alert('hi man')
    let createSigninformRequest = function(){
        let signinDo = $('#sign-in');
        let home_container = $('#home-container');

        console.log('sada',signinDo);
        // vvi implementing sign in page
        signinDo.click(function(e){
            e.preventDefault();
            home_container.remove();
            
           // alert("perform action");
           
           $('.sign_upClass').remove();
           $('.sign_Class').remove();
        $.ajax({
            type:'GET',
            url: '/user/sign-in',
            success : function(data){
            console.log(data);
            let createsignin=createnewSignupform();
            $('#layout-main').append(createsignin);
        }
    
    })
});
    
    }

    let createnewSignupform = function(){
        return $(`
        <div class='sign_Class'>
        <h1>@ signinpage </h1>
            <form action="/user/create-session" method="POST"> 
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="Submit" value="sign in">
        </form>
        <p>
            <!-- this is refre to  user.js router.get('/auth/google' line 26  -->
            <a href="/user/auth/google/">Google Signin/ Signup</a> 
            <a href="/user/forgetPassword">Forget password ?</a>
            </div>
            `
        )
    }

    createSigninformRequest();
}