export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "Forum API",
    "description": "API endpoints for an online forum where users ask and answer questions"
  },
  "servers": [
    {
      "url": "https://foroum.herokuapp.com/forum/apis/v1"
    }
  ],
  "paths": {
    "/users/signup": {
      "post": {
        "description": "Endpoint for creating a new user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "password",
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully signed up user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Signing up with invalid credentials",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "409": {
            "description": "Attempting to signup with existing email",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/users/login": {
      "post": {
        "description": "Logs in a user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "email",
                  "password"
                ],
                "properties": {
                  "password": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful login",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Attempting to login with invalid credentials",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Attempting to login with incorrect credentials",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/questions/": {
      "post": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "description": "Posts a question",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "title",
                  "body"
                ],
                "properties": {
                  "title": {
                    "type": "string"
                  },
                  "body": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successfully posting a question",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "question": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Attempting to post a question with invalid fields",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthenticated users attempting to post a question.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      },
      "get": {
        "description": "Fetches all questions",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "description": "number of questions to fetch per time",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "description": "page number",
            "schema": {
              "type": "number"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Finds questions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "questions": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Finds no_ questions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/questions/{questionId}/": {
      "get": {
        "description": "Fetches a question specified by id",
        "parameters": [
          {
            "name": "questionId",
            "in": "path",
            "required": true,
            "description": "id of question to be fetched",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Finds question matching specified id",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "question": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Attempting to search for questions with an invalid id",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Finds no_ question matching specified id.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/questions/answers": {
      "post": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "description": "Posts an answer to a question",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "body",
                  "questionId"
                ],
                "properties": {
                  "body": {
                    "type": "string"
                  },
                  "questionId": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Answer posted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "question": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Attempting to post a question with invalid fields",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthenticated users attempting to post a answers.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Attempting to post answers to id of non existing question.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/questions/votes": {
      "post": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "description": "Upvotes or downvote a question",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "type",
                  "questionId"
                ],
                "properties": {
                  "type": {
                    "type": "string"
                  },
                  "questionId": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully updates a vote. E.g from upvote to downvote.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "question": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          },
          "201": {
            "description": "Successfully made a upvote or downvote",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "question": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Attempting to vote with invalid vote fields",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthenticated users attempting to vote a question.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "403": {
            "description": "Trying to upvote a previously upvoted question. Same for downvotes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "question": {
                      "$ref": "#/components/schemas/Question"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Attempting to vote a non existing question.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/search/users/": {
      "get": {
        "description": "Fetches user(s) matching search keyword",
        "parameters": [
          {
            "name": "keyword",
            "in": "query",
            "required": false,
            "description": "name or email of user",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Found user matching specified keyword",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "user": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "email": {
                          "type": "string"
                        },
                        "created_at": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Found no user matching specified keyword",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/search/questions/": {
      "get": {
        "description": "Fetches question(s) matching search keyword",
        "parameters": [
          {
            "name": "keyword",
            "in": "query",
            "required": false,
            "description": "search keyword",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Found questions matching specified keyword",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "questions": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Question"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Found no question matching specified keyword",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/search/answers/": {
      "get": {
        "description": "Fetches answer(s) matching search keyword",
        "parameters": [
          {
            "name": "keyword",
            "in": "query",
            "required": false,
            "description": "search keyword",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Found answers matching specified keyword",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    },
                    "answers": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "questionId": {
                            "type": "string"
                          },
                          "questionTitle": {
                            "type": "string"
                          },
                          "questionBody": {
                            "type": "string"
                          },
                          "answer": {
                            "$ref": "#/components/schemas/Answer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Found no answer matching specified keyword",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/subscriptions/questions": {
      "post": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "description": "Subscribes a user to a question",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "questionId"
                ],
                "properties": {
                  "questionId": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Attempting to subscribe to a question you are already subscribed to",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "201": {
            "description": "Successfully subscribed to a question",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Attempting to subscrribe to an invalid questionId",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthenticated user attempting to subscribe to a question.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/subscriptions/questions/{questionId}": {
      "delete": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "questionId",
            "in": "path",
            "required": true,
            "description": "id of question to be unsubscribed to",
            "schema": {
              "type": "string"
            }
          }
        ],
        "description": "Cancels subscription to a question",
        "responses": {
          "201": {
            "description": "Successfully unsubscribed to a question",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthenticated users attempting to unsubscribe.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Attempting to unsubscribe to a question you are not subscribed to",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    },
    "/notifications/": {
      "get": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "description": "Fetches a users unread notifications",
        "responses": {
          "200": {
            "description": "Found and returned users unread notifications",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Found no unread notifications",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      },
      "patch": {
        "parameters": [
          {
            "in": "header",
            "name": "token",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "description": "Marks all notifications as read",
        "responses": {
          "200": {
            "description": "Found and marked all notifications as read",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "msg": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "$ref": "#/components/responses/500Error"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "BasicAuth": {
        "type": "http",
        "scheme": "basic"
      }
    },
    "schemas": {
      "Question": {
        "type": "object",
        "required": [
          "title",
          "body"
        ],
        "properties": {
          "votes": {
            "type": "number"
          },
          "_id": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "body": {
            "type": "string"
          },
          "author": {
            "type": "string"
          },
          "answers": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Answer"
            }
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          }
        }
      },
      "Answer": {
        "type": "object",
        "required": [
          "body"
        ],
        "properties": {
          "_id": {
            "type": "string"
          },
          "body": {
            "type": "string"
          },
          "author": {
            "type": "string"
          },
          "created_at": {
            "type": "string"
          },
          "updated_at": {
            "type": "string"
          }
        }
      }
    },
    "responses": {
      "500Error": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "msg": {
                  "type": "string"
                },
                "errMessage": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  }
}