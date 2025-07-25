// src/utils/api.js
import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchRepositories = async (query = "react", perPage = 30) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/repositories`, {
      params: {
        q: query,
        sort: "stars",
        order: "desc",
        per_page: perPage,
      },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    return response.data.items || [];
  } catch (error) {
    console.error("❌ Error fetching repositories:", error);
    return [];
  }
};
