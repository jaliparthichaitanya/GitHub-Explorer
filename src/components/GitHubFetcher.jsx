import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RepositoryCard from "./RepositoryCard";
import BookmarkList from "./BookmarkList";
import RepoAnalyticsGraph from "./RepoAnalyticsGraph";
import { RefreshCcw, PlusCircle, Share, Download } from "lucide-react";

const GitHubFetcher = () => {
  const [repos, setRepos] = useState([]);
  const [bookmarkedRepos, setBookmarkedRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortOption, setSortOption] = useState("stars");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const searchParamsRef = useRef({ searchTerm: "", selectedLanguage: "", sortOption: "" });

  const fetchRepositories = async (isLoadMore = false, currentPage = 1) => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.github.com/search/repositories?q=stars:>1000`;

      if (searchParamsRef.current.searchTerm)
        url += `+${encodeURIComponent(searchParamsRef.current.searchTerm)}`;
      if (searchParamsRef.current.selectedLanguage)
        url += `+language:${encodeURIComponent(searchParamsRef.current.selectedLanguage)}`;

      url += `&sort=${searchParamsRef.current.sortOption}&order=desc&per_page=30&page=${currentPage}`;

      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });

      const data = response.data.items;

      setRepos((prev) => (isLoadMore ? [...prev, ...data] : data));
      setPage(currentPage + 1);
      setHasMore(data.length === 30);
    } catch (error) {
      console.error("GitHub API Error:", error);
      if (error.response?.status === 403) {
        setError("Rate limit exceeded. Please try again later or use a GitHub token.");
      } else {
        setError("Unable to fetch data. Try again shortly.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchParamsRef.current = { searchTerm, selectedLanguage, sortOption };
      setPage(2);
      fetchRepositories(false, 1);
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedLanguage, sortOption]);

  const handleBookmark = (repo) => {
    if (!bookmarkedRepos.some((r) => r.id === repo.id)) {
      setBookmarkedRepos([...bookmarkedRepos, { ...repo, note: "" }]);
    }
  };

  const handleRemoveBookmark = (id) => {
    setBookmarkedRepos((prev) => prev.filter((repo) => repo.id !== id));
  };

  const handleNoteUpdate = (id, newNote) => {
    setBookmarkedRepos((prev) =>
      prev.map((repo) => (repo.id === id ? { ...repo, note: newNote } : repo))
    );
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setSelectedLanguage("");
    setSortOption("stars");
    setPage(2);
    searchParamsRef.current = { searchTerm: "", selectedLanguage: "", sortOption: "stars" };
    fetchRepositories(false, 1);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(bookmarkedRepos, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarked_repositories.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!bookmarkedRepos.length) return;

    const headers = Object.keys(bookmarkedRepos[0])
      .filter((key) => typeof bookmarkedRepos[0][key] !== "object")
      .join(",");

    const rows = bookmarkedRepos.map((repo) =>
      Object.entries(repo)
        .filter(([key, value]) => typeof value !== "object")
        .map(([key, value]) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarked_repositories.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareBookmarks = () => {
    const titles = bookmarkedRepos.map((r) => r.full_name).join("\n");
    navigator.clipboard.writeText(titles);
    alert("Bookmarked repository names copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📊 GitHub Dashboard</h1>

        {/* Search Panel */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search repositories..."
              className="p-2 border rounded w-full"
            />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Languages</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="TypeScript">TypeScript</option>
              <option value="C++">C++</option>
              <option value="Go">Go</option>
            </select>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="updated">Recently Updated</option>
            </select>
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              <RefreshCcw className="mr-2" /> Reset
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-center text-blue-500 mb-4">Loading...</p>}

        {/* Repo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {repos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} onBookmark={handleBookmark} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => fetchRepositories(true, page)}
              className="flex items-center bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              <PlusCircle className="mr-2" />
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {/* Bookmarks Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">⭐ Bookmarked Repositories</h2>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={exportCSV}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              <Download className="mr-2" /> Export CSV
            </button>
            <button
              onClick={exportJSON}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              <Download className="mr-2" /> Export JSON
            </button>
            <button
              onClick={shareBookmarks}
              className="flex items-center bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              <Share className="mr-2" /> Share
            </button>
          </div>
          <BookmarkList
            bookmarks={bookmarkedRepos}
            onRemoveBookmark={handleRemoveBookmark}
            updateNote={handleNoteUpdate}
          />
        </div>

        {/* Analytics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-center">📈 Repository Analytics</h2>
          <RepoAnalyticsGraph repos={repos} />
        </div>
      </div>
    </div>
  );
};

export default GitHubFetcher;
