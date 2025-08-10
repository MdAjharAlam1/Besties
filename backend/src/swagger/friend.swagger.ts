const FriendApiDoc = {
    "/friend":{
        post:{
            summary:"Add a friend",
            description:"Auth Token required",
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
            },
            responses:{
                200:{
                    description:"Sucess",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Friend Request Sent"}
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Invalid Session"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to send Friend Request"}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/friend/all":{
        get:{
            summary:"Fetch All friend",
            description:"Auth Token required",
            responses:{
                200:{
                    description:"Sucess",
                    content:{
                        "application/json":{
                            schema:{
                                type:"array",
                                items:{
                                    type:"object",
                                    properties:{
                                        friend:{
                                            type:"object",
                                            properties:{
                                                fullname:{type:"string"},
                                                email:{type:"string"},
                                                mobile:{type:"string"},
                                                image:{type:"string"},
                                            }
                                        }
                                        
                                    }
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Invalid Session"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to fetch all  Friend "}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/friend/suggestion":{
        get:{
            summary:"Fetch All Suggested friend",
            description:"Auth Token required",
            responses:{
                200:{
                    description:"Sucess",
                    content:{
                        "application/json":{
                            schema:{
                                type:"array",
                                items:{
                                    type:"object",
                                    properties:{
                                        friend:{
                                            type:"object",
                                            properties:{
                                                fullname:{type:"string"},
                                                email:{type:"string"},
                                                mobile:{type:"string"},
                                                image:{type:"string"},
                                            }
                                        }
                                        
                                    }
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Invalid Session"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to fetch all suggestion Friend "}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/friend/request":{
        get:{
            summary:"Fetch All friend Request",
            description:"Auth Token required",
            responses:{
                200:{
                    description:"Sucess",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"fetch all friend Request detail  "}
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Invalid Session"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to fetch all Friend Request "}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/friend/{id}":{
        put:{
            summary:"Acccept Friend Request",
            description:"Auth Token required",
            parameters:[
                {
                    in:"path",
                    name:"id",
                    required:"true",
                    schema:{type:"string"}
                }
            ],
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                status:{type:"string", example:"accepted"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Sucess",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Friend Request Accepted"}
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Invalid Session"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to accept Friend Request "}
                                }
                            }
                        }
                    }
                }
            }
        },
        delete:{
            summary:"Unfollow or Reject Friend",
            description:"Auth Token required",
            parameters:[
                {
                    in:"path",
                    name:"id",
                    required:"true",
                    schema:{type:"string"}
                }
            ],
        
            responses:{
                200:{
                    description:"Sucess",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Friend Delete"}
                                }
                            }
                        }
                    }
                },
                401:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Invalid Session"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to delete friend "}
                                }
                            }
                        }
                    }
                }
            }
        },
        
    }
}
export default FriendApiDoc