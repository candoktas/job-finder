"use client";

import { useEffect } from "react";
import { fetchJobById, fetchJobs, selectJob } from "@/app/_components/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { loadTokensFromStorage } from "@/app/_components/authSlice";
import JobDetailModal from "@/app/_components/JobDetailModal";

function JobList(props) {
  const dispatch = useDispatch();
  const { jobs, loading, error, loadingJobId } = useSelector(
    (state) => state.jobs,
  );

  useEffect(() => {
    // Token'ları localStorage'dan yükle
    dispatch(loadTokensFromStorage());

    // Token'lar yüklendikten sonra iş ilanlarını fetch et
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDetailClick = (id) => {
    dispatch(fetchJobById(id)); // Detay için ID ile çağrı yap
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="p-4">
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 border rounded relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{job.name}</h3>
                <p>Job Description: {job.description}</p>
                <p>Company: {job.companyName}</p>
                <p>Location: {job.location}</p>
                <p>Salary: {formatSalary(job.salary)}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="bg-slate-800 text-white font-light py-1 px-8 shadow-md hover:bg-slate-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-transform duration-150 ease-in-out active:scale-95"
                onClick={() => handleDetailClick(job.id)}
              >
                {loadingJobId === job.id ? "Loading..." : "Detail"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <JobDetailModal />
    </div>
  );
}

export default JobList;
