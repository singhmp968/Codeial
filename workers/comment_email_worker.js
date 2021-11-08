// this section if for creating comment email worker
const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
// need to crate a new process function i.e whenever we need to hae to crate a new task that supposed to run to process function
// queue.process('emails',function(job,done){  // we are passing the job to be process i.e the comments
//     console.log('email worker is processing the job',job.data);
//     commentsMailer.newComment(job.data);
// });  
// queue delay testing 1 2 3
queue.process('emails',function(job,done){  // we are passing the job to be process i.e the comments
    console.log('email worker is processing the job',job.data.comment.content);
    commentsMailer.newComment(job.data.userDet,job.data.comment.content);
});   