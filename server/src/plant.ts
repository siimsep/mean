import * as mongodb from "mongodb";

export interface Plant {
  name: string;
  memo: string;
  type: "üheaastane" | "kaheaastane" | "püsik";
  _id?: mongodb.ObjectId;
}
