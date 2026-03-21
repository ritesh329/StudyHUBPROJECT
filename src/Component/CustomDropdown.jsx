import React from "react";

const CustomDropdown = ({
  loading = false,
  options = [],
  value = "",
  onChange = () => {},
  labelKey = "label",
  valueKey = "value",
  placeholder = "Select",
  disabled = false,
  error = "",
  name = "",
  required = false,
}) => {
  // safe check for array
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className={`w-full border rounded-lg px-4 py-3 focus:outline-indigo-500 
        ${error ? "border-red-500" : "border-gray-300"}`}
      >
        {/* Placeholder / Loading */}
        <option value="">
          {loading ? "Loading..." : placeholder}
        </option>

        {/* Options */}
        {!loading && safeOptions.length > 0 &&
          safeOptions.map((item, index) => {
            const optionValue = item?.[valueKey];
            const optionLabel = item?.[labelKey];

            // skip invalid data
            if (optionValue === undefined || optionLabel === undefined) {
              return null;
            }

            return (
              <option key={optionValue || index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}

        {/* Empty State */}
        {!loading && safeOptions.length === 0 && (
          <option disabled>No data available</option>
        )}
      </select>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomDropdown;