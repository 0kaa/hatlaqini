import { Type } from './../models/Model.js'

export const CreateType = async (req, res) => {

    try {
        const newType = new Type(req.body);
        await newType.save();
        res.status(201).json(newType)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}