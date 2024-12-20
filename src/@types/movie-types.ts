import type {z} from 'zod'
import type {
    ConflictMovieResponseSchema, 
    CreateMovieResponseSchema, 
    CreateMovieSchema, 
    DeleteMovieResponseSchema, 
    GetMovieResponseUnionSchema, 
    MovieNotFoundResponseSchema, 
    UpdateMovieResponseSchema, 
    UpdateMovieSchema
} from './schema'


// zod key feature 2: Link schemas to types

export type CreateMovieRequest = z.infer<typeof CreateMovieSchema>

export type CreateMovieResponse = z.infer<typeof CreateMovieResponseSchema>

export type ConflictMovieResponse = z.infer<typeof ConflictMovieResponseSchema>

export type GetMovieResponse = z.infer<typeof GetMovieResponseUnionSchema>

export type MovieNotFoundResponse = z.infer<typeof MovieNotFoundResponseSchema>

export type DeleteMovieResponse = z.infer<typeof DeleteMovieResponseSchema>

export type UpdateMovieRequest = z.infer<typeof UpdateMovieSchema>

export type UpdatedMovieResponse = z.infer<typeof UpdateMovieResponseSchema>
