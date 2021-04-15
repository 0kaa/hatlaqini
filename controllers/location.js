import Locations from './../models/location.js'

export const CreateLocation = async (req, res) => {
    try {
        const newLocation = new Locations(req.body);
        await newLocation.save()
        res.status(201).json(newLocation)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}