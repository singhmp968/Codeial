{
    let createSignUpformRequest = function(){
        let signinDo = $('#sign-up');

        let home_container = $('#home-container');

        console.log('sada',signinDo);
        // vvi implementing sign in page
        signinDo.click(function(e){
            e.preventDefault();
            home_container.remove();
            $('.sign_upClass').remove();
            $('.sign_Class').remove();
            $.ajax({
                type:'GET',
                url: '/user/sign-up',
                success : function(data){
                console.log(data);
                 let createsignin=createnewSignupform();
                 $('#layout-main').append(createsignin);
            }
        });
        });
    }

    let createnewSignupform = function(){
        return $(`
            <div class='sign_upClass'>
            <h1>@ sign up page </h1>
            <form  action="/user/create" method="POST"> 
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="email" name="email" placeholder="Your email" required>
            <input type="password" name="password" placeholder="Your password" required>
            <input type="password" name="confirm_password" placeholder="Your password" required>
            <input type="Submit" value="sign up">
        </form>
        <p>
            <!-- this is refre to  user.js router.get('/auth/google' line 26  -->
            <a href="/user/auth/google/">Google Signin/ Signup</a> 
        
        </p>
        </div>
        `
        )}

createSignUpformRequest();

}