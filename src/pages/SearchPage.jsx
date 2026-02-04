import React, { useState, useEffect } from 'react';
import DonorCard from '../components/search/DonorCard';

const SearchPage = () => {
  const [allDivisions, setAllDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [hasSearched, setHasSearched] = useState(false); // Search hoyeche kina check korar jonno

  // JSON Data Fetch kora
  useEffect(() => {
    fetch('/divisions.json')
      .then((res) => res.json())
      .then((data) => setAllDivisions(data))
      .catch((err) => console.error('Division load failed:', err));

    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data))
      .catch((err) => console.error('District load failed:', err));
  }, []);

  // Division select korle oi ID onujayi District filter hobe
  const handleDivisionChange = (e) => {
    const divId = e.target.value;
    setSelectedDivisionId(divId);

    if (divId) {
      const filtered = allDistricts.filter((dis) => dis.division_id === divId);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  };

  // Search Logic
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    // Eikhane apnar Backend API call hobe. Ekhon kar jonno fake timeout dichhi.
    setTimeout(() => {
      // Logic: Backend theke data asle setSearchResults(data) hobe
      // Ekhon faka array rakhlam "No Results" dekhar jonno
      setSearchResults([]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-red-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 italic tracking-tight">
          Find a Life Saver
        </h1>
        <p className="text-red-100 max-w-2xl mx-auto text-lg">
          Search for blood donors near your location.
        </p>
      </div>

      {/* Filter Card */}
      <div className="max-w-6xl mx-auto -mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            {/* Blood Group */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                Blood Group
              </label>
              <select
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer"
              >
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
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                Division
              </label>
              <select
                required
                onChange={handleDivisionChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer"
              >
                <option value="">Select Division</option>
                {allDivisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">
                District
              </label>
              <select
                required
                disabled={!selectedDivisionId}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <option value="">
                  {selectedDivisionId
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

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 disabled:bg-gray-400"
            >
              {isLoading ? 'Searching...' : 'Search Donors'}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          Search Results
          <span className="text-sm font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full italic">
            {searchResults.length} Donors Found
          </span>
        </h2>

        {isLoading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-opacity-50"></div>
            <p className="mt-4 text-gray-500 font-medium">
              Finding donors near you...
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          /* Donor Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchResults.map((donor, idx) => (
              <DonorCard key={idx} donor={donor} />
            ))}
          </div>
        ) : hasSearched ? (
          /* Empty State: Jodi Search kora hoy kintu result na thake */
          <div className="text-center bg-white py-20 rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🩸</div>
            <h3 className="text-xl font-bold text-gray-700">No Donors Found</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Sorry, we couldn't find any donors matching your criteria. Try
              different filters.
            </p>
          </div>
        ) : (
          /* Initial State: Search korar age */
          <div className="text-center text-gray-400 py-20 border-2 border-dashed border-gray-200 rounded-3xl">
            <p>Select your criteria and click search to find donors.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
