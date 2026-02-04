import React, { useState, useEffect } from 'react';
import DonorCard from '../components/Search/DonorCard';

const SearchPage = () => {
  const [allDivisions, setAllDivisions] = useState([]); // Shob divisions eikhane thakbe
  const [allDistricts, setAllDistricts] = useState([]); // Shob districts eikhane thakbe
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('/divisions.json') // Apnar file path jodi alada hoy thik kore diben
      .then((res) => res.json())
      .then((data) => setAllDivisions(data));

    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data));
  }, []);

  // 2. Division change hole District filter korar logic
  const handleDivisionChange = (e) => {
    const divisionName = e.target.value;
    setSelectedDivision(divisionName);

    // Division er name ba ID diye filter kora (Apnar JSON structure onujayi match korben)
    const filtered = allDistricts.filter(
      (dis) => dis.division_name === divisionName
    );
    setFilteredDistricts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-red-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Find a Life Saver
        </h1>
        <p className="text-red-100 max-w-2xl mx-auto text-lg">
          Search for blood donors near your location.
        </p>
      </div>

      <div className="max-w-6xl mx-auto -mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Blood Group */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Blood Group
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none">
                <option value="">Select Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Division
              </label>
              <select
                onChange={handleDivisionChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">Select Division</option>
                {allDivisions.map((div) => (
                  <option key={div.id} value={div.name}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selector (Dynamic) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                District
              </label>
              <select
                disabled={!selectedDivision}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none disabled:opacity-50"
              >
                <option value="">
                  {selectedDivision
                    ? 'Select District'
                    : 'Select Division First'}
                </option>
                {filteredDistricts.map((dis) => (
                  <option key={dis.id} value={dis.name}>
                    {dis.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all">
              Search Donors
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          Search Results
          <span className="text-sm font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full">
            {searchResults.length} Donors Found
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Data thakle card show hobe, nahole placeholder */}
          <DonorCard />
          <DonorCard />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
