"use client";
import { useState } from "react";

function JobFilter({ onFilterChange }) {
  const [searchText, setSearchText] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onFilterChange({ searchText: value, selectedField });
  };

  const handleFieldChange = (e) => {
    const value = e.target.value;
    setSelectedField(value);
    onFilterChange({ searchText, selectedField: value });
  };

  return (
    <div className="p-4 bg-slate-50 font-light">
      <div className="flex space-x-4 items-center">
        <h2>Basic Filter</h2>
        <div className="relative w-3/12">
          <select
            className="border p-2 w-full appearance-none bg-white pr-4"
            value={selectedField}
            onChange={handleFieldChange}
          >
            <option value="">Select a field</option>
            <option value="name">Job Name</option>
            <option value="companyName">Company Name</option>
            <option value="location">Location</option>
            <option value="salary">Salary</option>
            <option value="keywords">Keywords</option>
          </select>
          <span className="absolute inset-y-0 top-3.5 right-3 flex items-start pointer-events-none text-gray-600">
            <span className="inline-block w-2 h-2 border-r-2 border-b-2 border-gray-600 transform rotate-45"></span>
          </span>
        </div>

        <input
          type="text"
          className="border p-2 w-3/12 min-w-20"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default JobFilter;
