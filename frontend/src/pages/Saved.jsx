import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Saved() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        setError("");

        const response = await api.get("/me/saved-jobs");

        setJobs(response.data || []);
      } catch (err) {
        console.error("Failed to load saved jobs:", err);

        setError(
          err.response?.data?.message ||
            "Could not load saved jobs"
        );
      }
    };

    loadSavedJobs();
  }, []);

  const remove = async (job) => {
    try {
      await api.delete(`/me/saved-jobs/${job.id}`);

      setJobs((current) =>
        current.filter((item) => item.id !== job.id)
      );
    } catch (err) {
      console.error("Failed to remove saved job:", err);

      alert("Could not remove saved job.");
    }
  };

  return (
    <main className="container">
      <div className="pagehead">
        <h1>Saved Jobs</h1>

        <p className="muted">
          Jobs you saved from your search.
        </p>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {jobs.length > 0 ? (
        <div className="appgrid">
          {jobs.map((job) => (
            <article
              className="appcard"
              key={job.id}
            >
              <div>
                <h3>{job.title}</h3>

                <p>
                  {job.company || "Unknown company"} ·{" "}
                  {job.location || "Remote"}
                </p>
              </div>

              <div className="appfoot">
                {job.savedAt && (
                  <span>
                    Saved{" "}
                    {new Date(
                      job.savedAt
                    ).toLocaleDateString()}
                  </span>
                )}

                <button
                  onClick={() => remove(job)}
                >
                  Remove
                </button>

                {job.applicationLink && (
                  <a
                    href={job.applicationLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open job ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty">
          No saved jobs yet.
        </div>
      )}
    </main>
  );
}