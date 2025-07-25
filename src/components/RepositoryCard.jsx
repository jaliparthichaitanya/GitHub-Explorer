import React from "react";
import { Star, BookmarkPlus, Eye } from "lucide-react";

const RepositoryCard = ({ repo, onBookmark }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-transform hover:scale-[1.01]">
    <div className="flex flex-col h-full justify-between">
      {/* Title */}
      <h2 className="text-xl font-semibold text-blue-700 hover:underline mb-2">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4">
        {repo.description || "No description available."}
      </p>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 text-gray-600 text-sm mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-yellow-500" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-2">
          💻
          <span>{repo.language || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          🕒
          <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-auto">
        <button
          onClick={() => onBookmark(repo)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <BookmarkPlus size={16} />
          Bookmark
        </button>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm transition"
        >
          <Eye size={16} />
          View
        </a>
      </div>
    </div>
  </div>
);

export default RepositoryCard;
