const FriendApiDoc = {
    "/friend":{
        post:{
            summary:"Add a friend",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                friend:{type:"string", example:"friend_id"}
                            }
                        }
                    }
                }
            }
        }
    }
}

export default FriendApiDoc