
// Interface defining all the methods

import { ConflictMovieResponse, CreateMovieRequest, CreateMovieResponse, DeleteMovieResponse, GetMovieResponse, MovieNotFoundResponse, UpdateMovieRequest, UpdatedMovieResponse } from "./@types";



export interface MovieRepository {
    getMovies(): Promise<GetMovieResponse>,
    getMovieById(id:number): Promise<GetMovieResponse | MovieNotFoundResponse>,
    getMovieByName(name:string): Promise<GetMovieResponse | MovieNotFoundResponse>,
    deleteMovieById(id: number): Promise<DeleteMovieResponse | MovieNotFoundResponse>,
    addMovie(data: CreateMovieRequest): Promise<CreateMovieResponse | ConflictMovieResponse>,
    updateMovie(data:UpdateMovieRequest, id: number): Promise<UpdatedMovieResponse | MovieNotFoundResponse | ConflictMovieResponse>
}