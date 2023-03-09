import * as mongodb from "mongodb";
import { Plant } from "./plant";

export const collections: {
  plants?: mongodb.Collection<Plant>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("meaningful");
  await applySchemaValidation(db);

  const plantsCollection = db.collection<Plant>("plants");
  collections.plants = plantsCollection;
}
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "memo", "type"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        memo: {
          bsonType: "string",
          description: "'memo' is required and is a string",
          minLength: 5,
        },
        type: {
          bsonType: "string",
          description:
            "'type' is required and is 'üheaastane' / 'kaheaastane' / 'püsik'",
          enum: ["üheaastane", "kaheaastane", "püsik"],
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      colMod: "plants",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("plants", { validator: jsonSchema });
      }
    });
}
