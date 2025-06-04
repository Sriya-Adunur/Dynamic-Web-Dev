import mongoose from "mongoose";

export interface Profile {
    userid: string;
    name: string;
    city: string;
    state: string;
  }


  const schema = new mongoose.Schema<Profile>({
    userid: { type: String, required: true, unique: true },
    name: String,
    city: String,
    state: String
  });
  
  export const Profile = mongoose.model<Profile>("Profile", schema);