import { client } from "./config.js";
import { chats, movies } from "./data/dummyData.js";

/**
 * Indexing data from json file with chats or movies.
 * Flatten to 1D array
 */
const bulkInsertData = async (index, data) => {
  try {
    console.log(`Inserting data: ${data.length} records`);
    const body = chats.flatMap((doc) => [{ index: { _index: index } }, doc]);
    const response = await client.bulk({ refresh: true, body });
    console.log(response);
  } catch (e) {
    console.log("Got error ->", e);
  }
};
//bulkInsertData("chats", chats);

/**
 * Get All docs from Index[chats or movies].
 * Format: [document, document ...]
 */
const getAllDocs = async (index) => {
  try {
    const body = {
      query: {
        match_all: {},
      },
    };

    const res = await client.search({
      index,
      body,
    });
    console.log({ data: JSON.stringify(res.body.hits) });
  } catch (e) {
    console.log(e);
  }
};
//getAllDocs("chats")

/**
 * Getting list of indices
 * run-func index getIndices
 */
const getIndices = async () => {
  console.log(`Getting existing indices:`);
  const res = await client.cat.indices({ format: "json" });
  console.log(res);
};

/**
 * Retrieving mapping for the index.
 * run-func index getMapping
 */
const getMapping = async (index) => {
  console.log(`Retrieving mapping for the index with name ${index}`);
  const res = await client.indices.getMapping({ index });
  console.log({ mappings: JSON.stringify(res.body.chats.mappings) });
};

/**
 * Deleting the index = Dropping table or collection
 * run-func index delete
 */
const deleteIndex = async (index) => {
  try {
    const response = await client.indices.delete({
      index,
    });
    console.log({ response });
  } catch (e) {
    console.log(e);
  }
};

