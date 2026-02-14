import React, { useState, useEffect } from 'react';
import {
  Download,
  Search,
  MapPin,
  Hospital,
  Calendar,
  Clock,
  Filter,
  Users,
  ArrowRight,
} from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const SearchPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchResults, setSearchResults] = useState([]);
  const [allDivisions, setAllDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [bloodGroup, setBloodGroup] = useState('');
  const [divisionName, setDivisionName] = useState('');
  const [districtName, setDistrictName] = useState('');

  useEffect(() => {
    fetch('/divisions.json')
      .then((res) => res.json())
      .then((data) => setAllDivisions(data));
    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data));
  }, []);

  const handleDivisionChange = (e) => {
    const divId = e.target.value;
    const divObj = allDivisions.find((d) => d.id === divId);
    setDivisionName(divObj ? divObj.name : '');
    setDistrictName('');
    setFilteredDistricts(
      divId ? allDistricts.filter((dis) => dis.division_id === divId) : []
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await axiosSecure.get(`/search-requests`, {
        params: { bloodGroup, division: divisionName, district: districtName },
      });
      setSearchResults(response.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-20 px-6 text-center text-white print:hidden relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="10" cy="10" r="2" fill="white" />
            <circle cx="90" cy="10" r="2" fill="white" />
            <circle cx="50" cy="50" r="5" fill="white" />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
          FIND BLOOD HEROES
        </h1>
        <p className="text-red-100 max-w-2xl mx-auto font-medium">
          Search for pending blood requests in your area and save a life today.
          Every drop counts.
        </p>
      </div>

      {/* Filter Section */}
      <div className="max-w-6xl mx-auto -mt-12 px-4 relative z-10 print:hidden">
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-2xl p-8 border border-white/50">
          <div className="flex items-center gap-2 mb-6 text-red-600">
            <Filter size={20} strokeWidth={3} />
            <span className="font-black uppercase tracking-widest text-sm">
              Filter Search
            </span>
          </div>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1">
                BLOOD GROUP
              </label>
              <select
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-slate-100 border-none p-4 rounded-2xl focus:ring-2 ring-red-500 font-bold transition-all outline-none"
              >
                <option value="">Select Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1">
                DIVISION
              </label>
              <select
                required
                onChange={handleDivisionChange}
                className="w-full bg-slate-100 border-none p-4 rounded-2xl focus:ring-2 ring-red-500 font-bold transition-all outline-none"
              >
                <option value="">Select Division</option>
                {allDivisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-1">
                DISTRICT
              </label>
              <select
                required
                disabled={!divisionName}
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                className="w-full bg-slate-100 border-none p-4 rounded-2xl focus:ring-2 ring-red-500 font-bold transition-all outline-none disabled:opacity-50"
              >
                <option value="">Select District</option>
                {filteredDistricts.map((dis) => (
                  <option key={dis.id} value={dis.name}>
                    {dis.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 cursor-pointer text-white font-black py-4 rounded-2xl hover:bg-red-600 shadow-lg shadow-slate-200 hover:shadow-red-200 transition-all duration-300 flex items-center justify-center gap-2 tracking-widest"
            >
              {isLoading ? (
                <div className="animate-spin  h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <Search size={18} /> SEARCH
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-10 print:hidden border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              SEARCH RESULTS
            </h2>
            <p className="text-slate-500 font-medium">
              Found{' '}
              <span className="text-red-600 font-bold">
                {searchResults.length}
              </span>{' '}
              pending requests matching your criteria
            </p>
          </div>
          {searchResults.length > 0 && (
            <button
              onClick={handleDownloadPDF}
              className="group flex items-center gap-3 bg-white text-slate-900 border-2 border-slate-900 px-8 py-3 rounded-2xl font-black text-xs hover:bg-slate-900 hover:text-white transition-all"
            >
              <Download
                size={18}
                className="group-hover:-translate-y-1 transition-transform"
              />{' '}
              DOWNLOAD REPORT
            </button>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-block animate-bounce bg-red-100 p-4 rounded-full mb-4">
                <Users size={40} className="text-red-600" />
              </div>
              <p className="font-black text-slate-400 text-xl animate-pulse uppercase">
                Searching for Heroes...
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((request) => (
              <div
                key={request._id}
                className="group bg-white p-1 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 print:shadow-none print:border-slate-300"
              >
                <div className="bg-slate-50 rounded-[2.2rem] p-6 h-full border border-transparent group-hover:bg-white group-hover:border-red-50 transition-colors">
                  <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-red-200">
                        {request.bloodGroup}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter px-4 py-1.5 bg-red-100 text-red-600 rounded-full">
                      {request.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-red-600 transition-colors">
                    {request.recipientName}
                  </h3>

                  <div className="space-y-4 text-sm font-semibold text-slate-500 mb-8">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl">
                      <Hospital size={18} className="text-slate-400" />
                      <span className="truncate">{request.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-red-400" />
                      <span>
                        {request.district}, {request.division}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-slate-400" />
                        <span>{request.donationDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-slate-400" />
                        <span>{request.donationTime}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blood-details/${request._id}`}
                    className="flex justify-center items-center gap-2 w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black tracking-widest hover:bg-red-600 transition-all print:hidden"
                  >
                    DETAILS <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            hasSearched && (
              <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-black text-slate-800">
                  No Hero Requests Found
                </h3>
                <p className="text-slate-500 mt-2 font-medium">
                  Try changing your location or blood group.
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: auto; margin: 10mm; }
          body { background: white !important; font-size: 12pt; }
          .print\\:hidden { display: none !important; }
          .grid { display: grid !important; grid-template-cols: 1fr 1fr !important; gap: 20px !important; }
          .bg-white { border: 1px solid #ddd !important; box-shadow: none !important; border-radius: 10px !important; }
          .bg-slate-50 { background: none !important; border: none !important; }
          h2 { font-size: 20pt !important; margin-bottom: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
