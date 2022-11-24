// API Reference

// api.midominio.com/v1/users

/*
    **** USERS ****
    path: 'controllers/users.controller.js'

    GET getSeveral /users
    GET getOne /users/:id
    POST createOne /users/:id
    DELETE deleteOne /users/:id
    PUT updateOne /users/:id
*/

/*
    **** ITEMS ****
    path: 'controllers/items.controller.js'

    GET getSeveral /items
    GET getOne /items/:id
    POST createOne /items/:id
    DELETE deleteOne /items/:id
    PUT updateOne /items/:id
*/


/*
    **** CATEGORIES ****
    path: 'controllers/categories.controller.js'

    GET getSeveral /categories
    GET getOne /categories/:id
    POST createOne /categories/:id
    DELETE deleteOne /categories/:id
    PUT updateOne /categories/:id
*/

/*
    **** AUTH ****
    path: 'controllers/users.controller.js'

    POST signIn /auth/signin # Iniciar sesión
    POST signUp /auth/signup # Crear cuenta
    POST logout /auth/logout # Cerrar sesión, invalidar el token
*/

UserObject = {
    email: 'email@example'

}

ItemObject = {
    "id": 1,
    "title": "John Doe",
    "description": "john@example.com",
    "price": 549,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
}

CategoryObject = {

}

responses = {
    users: {
        getSeveral: {
            200: {
                "users": [], // Array de UserObject
                "total": 0,
                "limit": 0,
                "offset": 0
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            404: {
                "error": {
                    "status": 404,
                    "message": "User not found"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        getOne: {
            200: {}, // UserObject
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            404: {
                "error": {
                    "status": 404,
                    "message": "User not found"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        createOne: {
            200: {
                "user": {} // UserObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        updateOne: {
            200: {
                "message": "User updated successfully",
                "user": {} // UserObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        deleteOne: {
            200: {
                "message": "User deleted successfully",
                "user": 1 // user id
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        }
    },

    items: {
        getSeveral: {
            200: {
                "items": [
                    {
                        "id": 1,
                        "title": "John Doe",
                        "description": "john@example.com",
                        "price": 549,
                        "rating": 4.69,
                        "stock": 94,
                        "brand": "Apple",
                        "category": "smartphones",
                        "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                        "images": [
                            "https://i.dummyjson.com/data/products/1/1.jpg",
                            "https://i.dummyjson.com/data/products/1/2.jpg",
                            "https://i.dummyjson.com/data/products/1/3.jpg",
                            "https://i.dummyjson.com/data/products/1/4.jpg",
                            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                        ]
                    }
                ], // Array de ItemObject
                "total": 1, // total number of items
                "offset": 0, // skip first n items
                "limit": 10 // limit number of items
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "error": "You are not authorized to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "error": "Internal server error"
                }
            }
        },
        getOne: {
            200: {
                "id": 1,
                "title": "John Doe",
                "description": "john@example.com",
                "price": 549,
                "rating": 4.69,
                "stock": 94,
                "brand": "Apple",
                "category": "smartphones",
                "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                "images": [
                    "https://i.dummyjson.com/data/products/1/1.jpg",
                    "https://i.dummyjson.com/data/products/1/2.jpg",
                    "https://i.dummyjson.com/data/products/1/3.jpg",
                    "https://i.dummyjson.com/data/products/1/4.jpg",
                    "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                ]
            }, // ItemObject
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "error": "You are not authorized to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "error": "Internal server error"
                }
            }
        },
        createOne: {
            200: {
                "item": {} // ItemObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        updateOne: {
            200: {
                "message": "Item updated successfully",
                "item": {} // ItemObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        deleteOne: {
            200: {
                "message": "Item deleted successfully",
                "item": 1 // item ID
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        }
    },
    categories: {
        getSeveral: {
            200: {
                "categories": [
                    {
                        "id": 1,
                        "name": "smartphones",
                        "description": "Smartphones",
                        "href": "/v1/categories/1",
                        "url": "https://api.maya.com.hn/v1/categories/1"
                    },
                    {
                        "id": 2,
                        "name": "apparel",
                        "description": "Apparel",
                        "href": "/v1/categories/2",
                        "url": "https://maya.com.hn/v1/categories/apparel"
                    }
                ] // Array de CategoryObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "error": "You are not authorized to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "error": "Internal server error"
                }
            }
        },
        createOne: {
            200: {
                "category": {} // CategoryObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        updateOne: {
            200: {
                "message": "Item updated successfully",
                "category": {} // CategoryObject
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        deleteOne: {
            200: {
                "message": "Category deleted successfully",
                "category": 1 // category ID
            },
            401: {
                "error": {
                    "status": 401,
                    "message": "Unauthorized"
                }
            },
            403: {
                "error": {
                    "status": 403,
                    "message": "You are not allowed to access this resource"
                }
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        }
    },
    auth: {
        signIn: {
            200: {
                "token": ""
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        signUp: {
            200: {
                "token": "",
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        },
        logout: {
            200: {
                "message": "Logged out successfully",
            },
            500: {
                "error": {
                    "status": 500,
                    "message": "Internal server error"
                }
            }
        }
    }
}
