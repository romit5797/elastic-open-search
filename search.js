import { client } from "./config.js";

/**
 * Finding matches sorted by relevance (full-text query)
 * run-func search match text -> Title: "avenger"
 */
export const findByMatch = (index, field, query) => {
  const body = {
    query: {
      match: {
        [field]: {
          query,
        },
      },
    },
  };

  client.search({
    index,
    body,
  });
};

/**
 * Matching a phrase (full-text query)
 * run-func search phrase -> Title: 'the avengers'
 */
export const findByPhrase = (index, field, query, slop) => {
  const body = {
    query: {
      match_phrase: {
        [field]: {
          query,
          slop,
        },
      },
    },
  };
  client.search({
    index,
    body,
  });
};

/**
 * Using special operators within a query string and a size parameter (full-text query)
 * run-func search queryString -> Title: '+(avengers | marvel) -dc  (the | a)'
 */
export const findByQueryString = (index, field, query) => {
  const body = {
    query: {
      query_string: {
        default_field: field,
        query,
      },
    },
  };
  client.search({
    index,
    body,
  });
};

/**
 * Searching for exact matches of a value in a field (term-level query)
 * run-func search term -> imdbRating 8.1
 */
export const findByTerm = (index, field, value) => {
  const body = {
    query: {
      term: {
        [field]: value,
      },
    },
  };
  client.search({
    index,
    body,
  });
};

/**
 * Searching for a range of values in a field (term-level query)
 * gt (greater than), gte (greater than or equal to)
 * lt (less than), lte (less than or equal to)
 * run-func search range -> imdbRating 5.1 10
 */
export const findByRange = (index, field, gte, lte) => {
  const body = {
    query: {
      range: {
        [field]: {
          gte,
          lte,
        },
      },
    },
  };
  client.search({
    index,
    body,
  });
};

/**
 * Combining several queries together (boolean query)
 * run-func search boolean
 */
export const findByBoolean = (index) => {
  const body = {
    query: {
      bool: {
        filter: [{ range: { imdbRating: { gte: 5 } } }],
        must: [
          { match: { Genre: "Action" } },
          { match: { title: "avenger" } },
        ],
        should: [{ match: { Actors: "Robert Downey Jr." } }],
        must_not: { match: { Actors: "Will Smith" } },
      },
    },
  };
  client.search({
    index,
    body,
  });
};
