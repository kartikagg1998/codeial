const User =require("../models/user");
const Friendship=require("../models/friendship");

// module.exports.toggleFriend=async function (request,response)
// {
//     try{
//         //friends/toggle/?id=abcde
        
//          console.log(request.query.id);//ye kyu nhi 
//          let friend=await User.findById(request.query.id).populate('friendships');
//          if(!friend)
//          {
//             let newFriend= await Friendship.create(
//                 {
//                     from_user:request.user._id,
//                     to_user:request.query.id,
                    
//                 });
//                 console.log("friend created");
//                 friend.friendships.push(newFriend);
//                 friend.save();
//          }
//          else{
//              console.log("already they are friend");
//          }
//          return response.json(200,
//             {
//                 message:"request successful",
                
//             })
//         }

//         catch(err)
//         {
//             console.log("error",err);
//         }
//     }


module.exports.toggleFriend=async function (request,response)
{

    let existingFriendship = await Friendship.findOne({ //this is for finding that frienship object//okk so what is the need of from-user
                                                        //we can simply check by to_user , no..vo pura ek object h from or to user ko mila k..to user kisi or k sath bhi friend ho skta h ..toh vo sare return krdega jis jis k sath to user frind h bt hmei toh ek k sath hi chahiye okk
        from_user : request.user,
        to_user : request.query.id,
    });

    let user = await User.findById(request.user); //this is us..means the user which is signed in

    if(existingFriendship){ //if the frienship already exists then we remove the friendship 
        user.friends.pull(existingFriendship._id);//ye btana(agr toh friendship exist krti h toh jo friends vali array h usme se vo friendship vala object remove kr diya okk)
        user.save();
        existingFriendship.remove();
    }else{
        let friendship = await Friendship.create({//else add 
            to_user : request.query.id,
            from_user : request.user._id
        });

        user.friends.push(friendship); //agr nhi h toh add kr diya usi array mei ok
        user.save();
    }

    return response.redirect("back");//smj aa gya? yes ..lets run this 

}

// to friend and from friend where have u used in contoller i meant see user login we get know the from user how did u identify to use