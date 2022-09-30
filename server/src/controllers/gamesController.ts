import {query, Request, Response} from 'express';
import mysql from 'mysql2/promise';

import pool from '../database';

class GamesController{
    public async list(req: Request, res:Response): Promise <any> {
        const games = await pool.promise().query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req: Request, res:Response): Promise <any>{
       const {id } = req.params;
       const games = await pool.promise().query('SELECT * FROM games WHERE id = ?', [id]);
       console.log(games);

       if (games.length > 0){
            return res.json(games[0]);
       }
       res.status(404).json({text: 'The game doesnt exists'});
    }

    public async create (req: Request, res: Response): Promise <void>{
         await pool.promise().query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game Saved'});
    }

    public async delete(req:Request, res: Response): Promise <void>{
        const {id} = req.params
        pool.promise().query('DELETE FROM games WHERE id = ?', [id]);
        res.json({message: 'The game was deleted'})
    }

    public async update(req:Request, res:Response): Promise <void>{
        const {id} = req.params
       await pool.promise().query('UPDATE gamesset ? WHERE id = ?', [req.body, id]);
       res.json({message:'The game was updated'});
    }
}

const gamesController = new GamesController();
export default gamesController;