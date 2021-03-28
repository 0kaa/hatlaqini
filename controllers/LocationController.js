import { Locations } from './../models/Model.js'

export const CreateLocation = (req, res) => {
    const newLocation = new Locations(req.body);
    newLocation.save()
    res.status(201).json(newLocation)
}