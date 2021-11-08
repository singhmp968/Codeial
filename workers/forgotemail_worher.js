const queue = require('../config/kue');
const forgotMailer = require('../mailers/forgotPasswordMailer');

queue.process('forgotpassword',function(job,done){  // we are passing the job to be process i.e the comments
    console.log('email worker is processing the job',job.data);
    //commentsMailer.newComment(job.data.userDet,job.data.comment.content);
    forgotMailer.frogotpasswordLink(job.data.restepassobj,job.data.email);
});