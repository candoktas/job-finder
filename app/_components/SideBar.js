"use client";

import { useSelector } from "react-redux";

function SideBar(props) {
  const { user } = useSelector((state) => state.auth);
  const { jobs } = useSelector((state) => state.jobs);

  if (!user) return null;

  // Kullanıcının başvurduğu iş ilanlarının detaylarını buluyoruz
  const appliedJobsDetails = user.appliedJobs.map((appliedJobId) =>
    jobs.find((job) => job.id === appliedJobId),
  );

  return (
    <div className="bg-white w-4/12 min-h-screen p-4 border-black border">
      <img
        src={user.profileImage || "https://i.pravatar.cc/300"}
        alt="User Avatar"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-lg font-semibold text-center mt-4">{user.email}</h2>
      <h3 className="text-xl font-semibold text-center mt-6">Applied Jobs</h3>
      <ul className="mt-4">
        {appliedJobsDetails && appliedJobsDetails.length > 0 ? (
          appliedJobsDetails.map((job, index) => (
            <li key={index} className="p-4 border rounded mb-4 bg-slate-50">
              <h3 className="text-lg font-bold text-center mb-2">
                {job ? job.name : "Job not found"}
              </h3>
              {job && (
                <div className="text-center text-sm">
                  <p>
                    <strong>Company Name:</strong> {job.companyName}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">
            No jobs applied yet.
          </p>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
