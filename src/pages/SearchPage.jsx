import React, { useState, useEffect, useRef } from 'react';
import DonorCard from '../components/search/DonorCard';
import html2pdf from 'html2pdf.js';
import { Download } from 'lucide-react';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const pdfRef = useRef();
  const [allDivisions, setAllDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // --- Fake Data for Testing ---
  const fakeDonors = [
    {
      name: 'Ariful Islam',
      bloodGroup: 'A+',
      district: 'Dhaka',
      upazila: 'Mirpur',
      phone: '01711223344',
    },
    {
      name: 'Mitu Akter',
      bloodGroup: 'B-',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      phone: '01811223344',
    },
    {
      name: 'Sabbir Ahmed',
      bloodGroup: 'O+',
      district: 'Chittagong',
      upazila: 'Pahartali',
      phone: '01911223344',
    },
    {
      name: 'Fahmida Khan',
      bloodGroup: 'AB+',
      district: 'Sylhet',
      upazila: 'Beanibazar',
      phone: '01511223344',
    },
  ];

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

  const downloadPDF = () => {
    const element = pdfRef.current;
    setIsLoading(true);

    const opt = {
      margin: 10,
      filename: 'donor-list.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        // এই অংশটিই ম্যাজিক করবে
        onclone: (clonedDoc) => {
          const elements = clonedDoc.querySelectorAll('*');
          elements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el);

            // যদি কালারে oklch থাকে তবে সেগুলোকে সলিড কালারে ফোর্স করা হচ্ছে
            if (computedStyle.color.includes('oklch')) {
              el.style.color = '#1e293b'; // সলিড ডার্ক কালার
            }
            if (computedStyle.backgroundColor.includes('oklch')) {
              // যদি লাল রঙের ব্যাকগ্রাউন্ড হয় (যেমন বাটন বা হেডার)
              if (el.classList.contains('bg-red-600')) {
                el.style.backgroundColor = '#dc2626';
              } else {
                el.style.backgroundColor = '#ffffff';
              }
            }
            // বর্ডার এর জন্য
            if (computedStyle.borderColor.includes('oklch')) {
              el.style.borderColor = '#e2e8f0';
            }
          });
        },
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('PDF Error:', err);
        setIsLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    // Fake API Timeout simulation
    setTimeout(() => {
      // টেস্টের জন্য Fake Data সেট করছি
      setSearchResults(fakeDonors);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 text-slate-900">
      {/* Header */}
      <div className="bg-red-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-4 italic tracking-tight uppercase">
          Find a Life Saver
        </h1>
        <p className="text-red-100 max-w-2xl mx-auto text-lg font-medium">
          Search for blood donors near your location.
        </p>
      </div>

      {/* Filter Card */}
      <div className="max-w-6xl mx-auto -mt-10 px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 p-6 md:p-10 border border-slate-100">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Blood Group
              </label>
              <select
                required
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 font-bold"
              >
                <option value="">Select Group</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                Division
              </label>
              <select
                required
                onChange={handleDivisionChange}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 font-bold"
              >
                <option value="">Select Division</option>
                {allDivisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">
                District
              </label>
              <select
                required
                disabled={!selectedDivisionId}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 disabled:opacity-50 font-bold"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-slate-900 text-white font-black py-4 rounded-xl shadow-lg shadow-red-100 transition-all active:scale-95 disabled:bg-slate-300"
            >
              {isLoading ? 'SEARCHING...' : 'SEARCH DONORS'}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-black text-slate-800 uppercase italic">
            Search Results
            <span className="ml-4 text-[10px] not-italic bg-red-100 text-red-600 px-4 py-1.5 rounded-full tracking-widest">
              {searchResults.length} DONORS FOUND
            </span>
          </h2>

          {searchResults.length > 0 && (
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl"
            >
              <Download size={16} /> Download PDF
            </button>
          )}
        </div>

        <div ref={pdfRef} className="rounded-3xl p-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-black text-slate-300 uppercase tracking-widest text-xs">
                Finding matches...
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {searchResults.map((donor, idx) => (
                <DonorCard key={idx} donor={donor} />
              ))}
            </div>
          ) : hasSearched ? (
            <div className="text-center bg-white py-24 rounded-[3rem] border border-slate-100 shadow-sm">
              <p className="text-5xl mb-6">🩸</p>
              <h3 className="text-xl font-black text-slate-800 uppercase italic">
                No Donors Found
              </h3>
              <p className="text-slate-400 mt-2 font-medium">
                Try different filters or search nearby districts.
              </p>
            </div>
          ) : (
            <div className="text-center text-slate-300 py-32 border-4 border-dashed border-slate-100 rounded-[4rem]">
              <p className="font-black uppercase tracking-[0.3em] text-xs">
                Select criteria and start your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
