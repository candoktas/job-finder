"use client";
import { useState, useEffect } from "react";
import {
  fetchJobs,
  fetchJobById,
  withdrawFromJob,
} from "@/app/_components/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import JobDetailModal from "@/app/_components/JobDetailModal";
import JobFilter from "./JobFilter"; // Filter Component

function JobList() {
  const dispatch = useDispatch();
  const { jobs, loading, error, loadingJobId } = useSelector(
    (state) => state.jobs,
  );
  const user = useSelector((state) => state.auth.user);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleDetailClick = (id) => {
    dispatch(fetchJobById(id));
  };

  const handleWithdrawClick = (id) => {
    dispatch(withdrawFromJob(id));
  };

  const handleFilterChange = ({ searchText, selectedField }) => {
    if (!searchText && !selectedField) {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(
        jobs.filter((job) => {
          if (selectedField && job[selectedField]) {
            if (selectedField === "salary") {
              return job.salary.toString().includes(searchText);
            } else if (selectedField === "keywords") {
              return job.keywords.some((keyword) =>
                keyword.toLowerCase().includes(searchText.toLowerCase()),
              );
            } else if (typeof job[selectedField] === "string") {
              return job[selectedField]
                .toLowerCase()
                .includes(searchText.toLowerCase());
            }
          }
          return job.name.toLowerCase().includes(searchText.toLowerCase());
        }),
      );
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4 max-h-[100vh] overflow-y-auto">
      <JobFilter onFilterChange={handleFilterChange} />{" "}
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {currentJobs.map((job) => {
          const hasApplied = user?.appliedJobs?.includes(job.id);
          return (
            <li key={job.id} className="p-4 border rounded font-light">
              <div className="flex justify-between items-start">
                <div className="w-2/3">
                  <h3 className="text-xl font-semibold">{job.name}</h3>
                  <p>Job Description: {job.description}</p>
                  <p>Company: {job.companyName}</p>
                  <p>Location: {job.location}</p>
                  <p>Salary: {formatSalary(job.salary)}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-primary text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[10%] min-w-24 md:w-[16%]">
                  <button
                    className="bg-lime-500 min-w-20 text-white font-light py-1 px-2 text-sm md:text-base md:px-4 shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-transform duration-150 ease-in-out active:scale-95"
                    onClick={() => handleDetailClick(job.id)}
                  >
                    {loadingJobId === job.id ? "Loading..." : "Detail"}
                  </button>
                  {hasApplied && (
                    <button
                      className="bg-neutral-500 min-w-20 text-white font-light py-1 px-2 text-sm md:text-base md:px-4 shadow-md hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transform transition-transform duration-150 ease-in-out active:scale-95"
                      onClick={() => handleWithdrawClick(job.id)}
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center items-center gap-4 mt-6">
        {currentPage > 1 && (
          <button
            className="bg-gray-300 text-black py-1 px-4 rounded"
            onClick={handlePreviousPage}
          >
            Previous
          </button>
        )}
        <span className="text-lg">
          {currentPage}/{totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            className="bg-gray-300 text-black py-1 px-4 rounded"
            onClick={handleNextPage}
          >
            Next
          </button>
        )}
      </div>
      <JobDetailModal />
    </div>
  );
}

export default JobList;
