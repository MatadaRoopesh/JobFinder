import React, { useEffect, useState } from "react";
import api from "../services/api";

const statuses = [
  "SAVED",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setError("");

        const response = await api.get("/me/applications");

        setApps(response.data || []);
      } catch (err) {
        console.error("Failed to load applications:", err);

        setError(
          err.response?.data?.message ||
            "Could not load applications"
        );
      }
    };

    loadApplications();
  }, []);

  const update = async (application, status) => {
    try {
      const { data } = await api.put(
        `/me/applications/${application.id}`,
        {
          status,
          notes: application.notes || "",
        }
      );

      setApps((current) =>
        current.map((item) =>
          item.id === application.id ? data : item
        )
      );
    } catch (err) {
      console.error("Failed to update application:", err);
      alert("Could not update application.");
    }
  };

  const del = async (id) => {
    try {
      await api.delete(`/me/applications/${id}`);

      setApps((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete application:", err);
      alert("Could not delete application.");
    }
  };

  const count = (status) =>
    apps.filter((app) => app.status === status).length;

  return (
    <main className="container">
      <div className="pagehead">
        <h1>Application Tracker</h1>

        <p className="muted">
          Track every stage from saved to offer.
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="stats">
        {statuses.map((status) => (
          <div className="stat" key={status}>
            <strong>{count(status)}</strong>
            <span>{status}</span>
          </div>
        ))}
      </div>

      {apps.length > 0 ? (
        <div className="appgrid">
          {apps.map((application) => (
            <article
              className="appcard"
              key={application.id}
            >
              <div>
                <h3>{application.title}</h3>

                <p>
                  {application.company} ·{" "}
                  {application.location}
                </p>
              </div>

              <select
                value={application.status}
                onChange={(e) =>
                  update(
                    application,
                    e.target.value
                  )
                }
              >
                {statuses.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>

              <div className="appfoot">
                {application.appliedAt && (
                  <span>
                    Added{" "}
                    {new Date(
                      application.appliedAt
                    ).toLocaleDateString()}
                  </span>
                )}

                <button
                  onClick={() =>
                    del(application.id)
                  }
                >
                  Delete
                </button>

                {application.applicationLink && (
                  <a
                    href={application.applicationLink}
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
          No applications yet. Use{" "}
          <b>Apply / Track</b> from the job search.
        </div>
      )}
    </main>
  );
}