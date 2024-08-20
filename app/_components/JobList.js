"use client";

import { useEffect } from "react";
import { fetchJobs } from "@/app/_components/jobSlice";
import { useDispatch, useSelector } from "react-redux";

function JobList(props) {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Job Listings</h2>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 border rounded">
            <h3 className="text-xl font-bold">{job.name}</h3>
            <p>{job.companyName}</p>
            <p>{job.location}</p>
            <p>Salary: {job.salary}</p>
            <p>{job.description}</p>
            <p>Keywords: {job.keywords.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
