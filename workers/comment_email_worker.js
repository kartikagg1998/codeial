const queue=require('../config/kue');
const commentsMailer=require('../mailers/comments_mailer');
//here we create a worker for sending emails
 queue.process('emails',function(job, done)  //emails is the name of queue
{
    console.log("emails worker is processing a job",job.data);
    commentsMailer.newComment(job.data);

    done();
});