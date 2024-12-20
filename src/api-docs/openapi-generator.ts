// this file registers the schemas and generates the openapi spec
import {OpenAPIRegistry, OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'

import {ParameterObject} from 'openapi3-ts/oas31'
import { 
    ConflictMovieResponseSchema,
    CreateMovieResponseSchema, 
    CreateMovieSchema, 
    DeleteMovieResponseSchema, 
    GetMovieResponseUnionSchema, 
    MovieNotFoundResponseSchema, 
    UpdateMovieResponseSchema, 
    UpdateMovieSchema
} from '../@types/schema';

const registry = new OpenAPIRegistry();

/* Register all Schemas */
registry.register('CreateMovieRequest', CreateMovieSchema)
registry.register('CreateMovieRepsonse', CreateMovieResponseSchema)
registry.register('GetMovieResponse', GetMovieResponseUnionSchema)
registry.register('MovieNotFound', MovieNotFoundResponseSchema)
registry.register('DeleteMovieResponse', DeleteMovieResponseSchema)


/* Define Constants */
const MOVIE_ID_PARAM: ParameterObject = {
    name: 'id',
    in: 'path',
    required: true,
    schema: {type: 'string'},
    description: 'Movie ID'
}

const MOVIE_NAME_PARAM: ParameterObject = {
    name: 'name',
    in: 'query',
    required: false,
    schema: {type: 'string'},
    description: 'Movie name to search for'
}

/* Register paths */
registry.registerPath({
    method: 'get',
    path: '/',
    summary: 'Health Check',
    responses: {
        200: {
            description: 'Server is running',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties:{
                            message: {
                                type: 'string', 
                                example: 'Server is running'
                            }
                        }
                    }
                }
            }
        }
    }
})

/* Get a List of Movies */
registry.registerPath({
    method: 'get',
    path: '/movies',
    summary: 'Get all movies or filter by name',
    parameters: [MOVIE_NAME_PARAM],
    description: 'Retrieve a list of all movies. Optionally, provid a query parameter "name" to filter by a specific movie name', 
    responses: {
        200: {
            description: 'List of Movies or a specific movie by name if the query param "name" is provided',
            content: {
                'application/json': {
                    schema: GetMovieResponseUnionSchema
                }
            }
        },
        404: {
            description: 'Movie not found if the name is provided and does not match any movie',
            content: {
                'application/json': {
                    schema: MovieNotFoundResponseSchema
                }
            }
        }
    }
})

/* Get Movie by Id */
registry.registerPath({
    method: 'get',
    path: '/movies/{id}',
    summary: 'Get a movie by Id',
    description: 'Retrieve a single Movie by its unique Id',
    parameters: [MOVIE_ID_PARAM],
    responses: {
        200: {
            description: 'Movie found',
            content: {
                "application/json": {schema: GetMovieResponseUnionSchema}
            }
        },
        404: {
            description: 'Movie not found',
            content: {
                'application/json': {
                    schema: MovieNotFoundResponseSchema
                }
            }
        }
    }
})

registry.registerPath({
    method: 'post',
    path: '/movies',
    summary: 'Create a new Movie',
    description: 'Create a new Movie in the System',
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateMovieSchema
                }
            }
        }
    },
    responses: {
        200:{
            description:'Movie created successfully',
            content: {
                "application/json": {
                    schema: CreateMovieResponseSchema
                }
            }
        },
        400: {
            description: 'Invalid request body or validation error'
        },
        409: {
            description: 'Movie already exists',
            content: {
                "application/json": {
                    schema: ConflictMovieResponseSchema
                }
            }
        },
        500: {
            description: 'unexpected Error occured'
        }
    }
})

/* Delete Movie by Id */
registry.registerPath({
    method: 'delete',
    path: '/movies/{id}',
    summary: 'Delete a movie by Id',
    description: 'Delete a movie by its Id',
    parameters: [MOVIE_ID_PARAM], 
    responses: {
        200: {
            description: 'Movie {id} has been deleted',
            content: {
                "application/json": {
                    schema: DeleteMovieResponseSchema
                }
            }
        },
        404: {
            description: 'Movie not found',
            content: {
                "application/json": {
                    schema: MovieNotFoundResponseSchema
                }
            }
        },
        500:{
            description: 'Unexpected error occured'
        }
    }
})

/* update movie by id */
registry.registerPath({
    method: 'put',
    path: '/movies/{id}',
    summary: 'Update a movie by Id',
    description: 'Update a movie by its id',
    parameters: [MOVIE_ID_PARAM],
    request: {
        body: {
            content: {
                "application/json": {
                schema: UpdateMovieSchema
            }
        }
        }
    }, responses: {
        200: {
            description: 'Movie updated successfully',
            content: {"application/json": {
                schema: UpdateMovieResponseSchema
            }}
        },
        404: {
            description: 'Movie not found',
            content: {
                "application/json": {
                    schema: MovieNotFoundResponseSchema
                }
            }
        },
        500: {
            description: 'Internal Server error'
        }
    }
})

/* generate the spec */
const generator = new OpenApiGeneratorV31(registry.definitions)
export const openApiDoc = generator.generateDocument({
    openapi: '3.1.0',
    info: {
        title: 'Movie API',
        version: '0.0.1',
        description: 'API for managing movies'
    },
    servers: [{
        url: 'http://localhost:3001',
        description: 'local development server'
    }]
})