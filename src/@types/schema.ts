import {z} from 'zod'
import {extendZodWithOpenApi} from '@asteasolutions/zod-to-openapi'


extendZodWithOpenApi(z)

export const CreateMovieSchema = z.object({
    id: z.number().optional().openapi({example: 1, description: 'Movie Id'}),
    name: z.string().min(1).openapi({example: 'Inception', description: 'Movie name'}),
    year: z.number().int().min(1900).max(2024).openapi({example: 2010, description: 'Release year'}),
    rating: z.number().openapi({example: 7.5, description: 'Rating'})
}).openapi('CreateMovieRequest')

export const CreateMovieResponseSchema = z.object({
    status: z.number().int().openapi({example: 200, description: 'Response status code'}), 
    data: z.object({
        id: z.number().openapi({example: 1, description: 'Movie Id', }), 
        name: z.string().min(1).openapi({
            example: 'Inception', 
            description: 'Movie name'}),
        year: z.number().int().min(1900).max(2024).openapi({
            example: 2010, description: 'Release year'}),
        rating: z.number().openapi({example: 7.5, description: 'Rating'})
    }),
    error: z.string().optional().openapi({description: 'Error message, if any'})
}).openapi('CreateMovieResponse')

export const ConflictMovieResponseSchema = z.object({
    status: z.number().int().openapi({example: 400, description: 'Conflict status code'}),
    error: z.string().openapi({example: 'Movie aldready exists', description: 'Error message' })
})

const movieObj = {
    id: z.number().openapi({example: 1, description: 'Movie Id'}),
    name: z.string().openapi({example: 'Interception', description: 'Movie name'}),
    year: z.number().openapi({example: 2010, description: 'Release year'}),
    rating: z.number().openapi({example: 7.5, description: 'Rating'})
}

export const GetMovieResponseUnionSchema = z.object({
    status: z.number().int().openapi({example: 200, description: 'Response status code'}),
    data: z.union([
        z.object(movieObj).nullable().openapi({
            description: 'Movie details or null if not found', 
            example: {
                id: 1, 
                name: 'Inception', 
                year: 2010, 
                rating: 7.5
            }
        }), 
        z.array(z.object(movieObj)).openapi({
            description: 'List of movies or an empty array if no movies exist'
        })]),
    error: z.string().nullable().optional().openapi({
        description: 'Error Message if an error occured, otherwise null', 
        example: null
    })
}).openapi('GetMovieResponse')

export const MovieNotFoundResponseSchema = z.object({
    status: z.number().int().openapi({example: 404, description: 'Response status code'}),
    error: z.string().openapi({example: 'Movie not found', description: 'Error message'})
})


export const DeleteMovieResponseSchema = z.object({
    status: z.number().int().openapi({example: 200, description: 'Response status code'}),
    message: z.string().openapi({
        example: 'Movie {id} has been deleted',
        description: 'Success message for the deleted movie'
    }) 
})


export const UpdateMovieSchema = z.object({
    id: z.number().int().optional().openapi({
        example: 1, 
        description: 'Movie id'
    }),
    name: z.string().min(1).optional().openapi({
        example:'Inception', 
        description: 'Movie name'
    }),
    year: z.number().int().min(1900).max(2024).optional().openapi({
        example: 2010, 
        description: 'Release year'
    }),
    rating: z.number().optional().openapi({
        example: 7.5, 
        description: 'Rating'
    })
}).openapi('UpdateMovieRequest')

export const UpdateMovieResponseSchema = z.object({
    status: z.number().int().openapi({example: 200, description: 'Response status code'}),
    data: z.object({
        id: z.number().openapi({
            example: 1, 
            description: 'Movie id'
        }),
        name: z.string().openapi({
            example:'Inception', 
            description: 'Movie name'
        }),
        year: z.number().openapi({
            example: 2010, 
            description: 'Release year'
        }),
        rating: z.number().openapi({
            example: 7.5, 
            description: 'Rating'
        })
    }).openapi('Updated movie data'),
    error: z.string().optional().openapi({description: 'Error message, if any '})
}).openapi('UpdatedMovieResponse')