
const AuthApiDocs = {
    "/auth/signup":{
        post:{
            summary:"Register new user",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                fullname:{type:"string"},
                                email:{type:"string"},
                                mobile:{type:"string"},
                                password:{type:"string"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Signup Success"}
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
                                    message:{type:"string", example:"Signup Failed ! Please try again later"}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/login":{
        post:{
            summary:"sign in a user",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                email:{type:"string"},
                                password:{type:"string"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Signup Success"},
                                    accessToken:{type:"string", example:'accessToken expire in 10 minutes'},
                                    refreshToken:{type:"string", example:'refresh token expire in 8 minutes'}
                                }
                            }
                        }
                    }
                },
                404:{
                    description:'Error',
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"User not found, Please try first signup"}

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
                                    message:{type:"string", example:"Invailid Credential Email and Password"}

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
                                    message:{type:"string", example:"Signin Failed ! Please try again later"}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/logout":{
        post:{
            summary:"logout a user ",
            responses:{
                200:{
                    description:"success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"logut successfully"},
                                    accessToken:{type:"string", example:"Auto removed from cookies"},
                                    refreshToken:{type:"string", example:"Auto removed form cookies"}
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
                                    message:{type:"string", example:"Failed to logout"}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/refresh-token":{
        get:{
            summary:"Getting new access and refresh token",
            requestBody:{
                content:{
                    "application/josn":{
                        schema:{
                            type:"object",
                            properties:{
                                refreshToken:{type:"string", example:"sent automatically from http only cookie"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string",example:"token refreshed"},
                                    accessToken:{type:"string", example:"valid for 10 minutes http only mode"},
                                    refreshToken:{type:"string", example:"valid for 7 days http only mode"}
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
                                    message:{type:"string", example:"Failed to refresh token"}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/auth/session":{
        get:{
            summary:"Getting user info from accesstoken",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            poperties:{
                                accessToken:{type:'string', example:"sent automatically from http onlu cookie"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    _id:{type:"string"},
                                    fullname:{type:"string"},
                                    email:{type:"string"},
                                    mobile:{type:"string"},
                                    image:{type:"string"}
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
                                    message:{type:"string", example:"invalid session"}
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
                                    message:{type:"string", example:"invalid session"}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "auth/profile-picture":{
        put:{
            summary:"update a profile picture by user",
            requestBody:{
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                accessToken:{type:"string", example:"token sent automatically from http only cookie"},
                                image:{type:"string", exmaple:"public image_url"}

                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{

                                    image:{type:"string", example:"your profile picture update successfully"}
                                }
                            }
                        }
                    }
                },
                400:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string",example:"invalid session"}
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
                                    message:{type:"string", example:"Failed to update picture"}

                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

export default AuthApiDocs