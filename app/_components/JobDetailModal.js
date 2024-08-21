"use client";

import { useDispatch, useSelector } from "react-redux";
import { clearSelectedJob, applyForJob } from "@/app/_components/jobSlice";
import { useEffect, useState } from "react";
import { updateAppliedJobs } from "@/app/_components/authSlice";

function JobDetailModal(props) {
  const dispatch = useDispatch();
  const { selectedJob, loading, applyLoading } = useSelector(
    (state) => state.jobs,
  );
  const user = useSelector((state) => state.auth.user);
  const [applyStatus, setApplyStatus] = useState(null);

  useEffect(() => {
    if (selectedJob) {
      setApplyStatus(null);
    }
  }, [selectedJob]);

  if (!selectedJob) return null;

  const alreadyApplied = user?.appliedJobs?.includes(selectedJob.id);

  const handleClose = () => {
    dispatch(clearSelectedJob());
  };

  const handleApply = async () => {
    if (alreadyApplied) {
      setApplyStatus("You have already applied for this job.");
      return;
    }

    const resultAction = await dispatch(applyForJob(selectedJob.id));
    if (applyForJob.fulfilled.match(resultAction)) {
      setApplyStatus("Application successful!");
      await dispatch(updateAppliedJobs(selectedJob.id)); // Sadece job ID güncelleniyor
    } else {
      setApplyStatus("Application failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-1 right-4 text-3xl text-gray-700 hover:text-gray-300 transition-colors duration-200"
          onClick={handleClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Apply Job</h2>
        <p className="text-lg font-semibold mb-2">
          Company name:{" "}
          <span className="font-normal text-base">
            {selectedJob.companyName}
          </span>
        </p>
        <p className="text-lg font-semibold mb-2">
          Job Name:{" "}
          <span className="font-normal text-base">{selectedJob.name}</span>
        </p>
        <p className="text-lg font-semibold mb-2">
          Created At:{" "}
          <span className="font-normal text-base">
            {new Date(selectedJob.createdAt).toLocaleDateString("tr-TR")}
          </span>
        </p>
        <p className="text-lg font-semibold mb-2">
          Location:{" "}
          <span className="font-normal text-base">{selectedJob.location}</span>
        </p>
        <p className="text-lg font-semibold mb-2">
          Salary:{" "}
          <span className="font-normal text-base">{selectedJob.salary}</span>
        </p>
        <p className="text-lg font-semibold mb-2">
          Job Description:{" "}
          <span className="font-normal text-base block w-full h-32 p-2 border rounded overflow-y-auto bg-white">
            {selectedJob.description}
          </span>
        </p>

        <div className="flex justify-center mt-6 gap-8">
          <button
            className="bg-secondary text-white py-1 px-8 rounded hover:bg-slate-400 transition duration-200"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="bg-primary font-normal py-1 px-8 shadow-md text-secondary rounded hover:bg-green-700 transition duration-200"
            onClick={handleApply}
            disabled={alreadyApplied || applyLoading}
          >
            {alreadyApplied
              ? "Applied"
              : applyLoading
                ? "Applying..."
                : "Apply"}
          </button>
        </div>

        {applyStatus && (
          <p className="mt-4 text-center text-sm font-medium text-blue-500">
            {applyStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default JobDetailModal;
