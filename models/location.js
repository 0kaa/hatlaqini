import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LocationsSchema = Schema({
    title: { type: String, default: "", required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
});

const Locations = mongoose.model("locations", LocationsSchema);

export default Locations;
