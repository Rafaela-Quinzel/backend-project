import { Request, Response } from "express"
import { MusicInputDTO, MusicOutputDTO } from "../business/entities/Music"
import { MusicBusiness } from "../business/MusicBusiness"
import { MusicDatabase } from "../data/MusicDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { Validator } from "../services/Validator"



const musicBusiness = new MusicBusiness(
    new MusicDatabase(),
    new IdGenerator(),
    new Authenticator(),
    new Validator()
)

export class MusicController {

    public async createMusic(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                file: req.body.file,
                genre: req.body.genre as string[],
                album: req.body.album
            }

            await musicBusiness.createMusic(token, input)
          
            res.status(201).send("Music inserted successfully")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }


    public async getMusics(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const result: MusicOutputDTO[] = await musicBusiness.getMusics(token)

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }


    public async getMusicById(req: Request, res: Response): Promise<void> {

        try {

            const token = req.headers.authorization as string

            const id: string = req.params.id

            const result = await musicBusiness.getMusicById(token, id)

            res.status(201).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })

        }
    }

    public getMusicByAuthorOrTitle = async (req: Request, res: Response): Promise<any> => {

        try {
            
            const token: string = req.headers.authorization as string

            const title = req.query.title as string

            const author = req.query.author as string

            const album = req.query.album as string            

            const result = await musicBusiness.getMusicByAuthorOrTitle(token, title, author, album)

            res.status(200).send({ message: "Selected music", result })

        } catch(error) {
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
    

    public async addToPlaylist(req: Request, res: Response) {

        try {
            const { playlist } = req.query as any

            const music_id = req.params.id as any

            const token: string = req.headers.authorization as string

            const result = await musicBusiness.addToPlaylist(music_id, playlist, token)

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }


    public async delMusicById(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string

            const id = req.params.id

            await musicBusiness.deleteMusicById(id, token)

            res.status(200).send("Music deleted")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }


    public async removeMusicFromPlaylist(req: Request, res: Response) {

        try {

            const token = req.headers.authorization as string

            const { playlist } = req.query as any

            const music_id = req.params.id as any

            await musicBusiness.removeMusicFromPlaylist(music_id, playlist, token)

            res.status(200).send("Music deleted")

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ error: error.message })
        }
    }


    public async getAllGenres(req: Request, res: Response): Promise<void> {

        try {

            const result: string[] = await musicBusiness.getAllGenres()

            res.status(200).send(result)

        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ message: error.message })
        }
    }
}