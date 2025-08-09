const StorageApiDoc = {
    "/storage/download":{
        post:{

            summary:"Generate signed url for download",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                path:{type:"string", example:"folder/file.ext"}
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"success",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    url:{type:"string", example:"image url valid upto 60 sec / 1 min"}
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
                                    message:{type:"string", example:"invalid session / token"}
                                }
                            }
                        }
                    }
                },
                404:{
                    description:"Error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string",example:"File does not exists"}
    
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
                                    message:{type:"string", example:"Failed to download image url"}
                                }
                            }
                        }
                    }
                }
    
            }
        }
    },
    "/storage/upload":{
        post:{
            summary:"Generate signed url for download",
            requestBody:{
                required:true,
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                path:{type:"string", example:"folder/file.ext"},
                                type:{type:"string", example:"image/png"},
                                status:{type:"string", example:"private | public"}
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
                                    message:{type:"string", example:"image url valid upto 60 sec / 1 min"}
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
                                    message:{type:"string", example:"Invailid request path or type is required"}
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
                                    message:{type:"string", example:"invalid session / token"}
                                }
                            }
                        }
                    }
                },
                500:{
                    description:"error",
                    content:{
                        "application/json":{
                            schema:{
                                type:"object",
                                properties:{
                                    message:{type:"string", example:"Failed to generate uplaod url"}
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default StorageApiDoc