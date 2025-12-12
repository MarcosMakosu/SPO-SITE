import { useState, useEffect } from "react";
import axios from "axios";
import { Search, MapPin, Stethoscope, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Directory() {
  const [doctors, setDoctors] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async (city = "") => {
    setLoading(true);
    try {
      const params = {};
      if (city) params.city = city;
      
      const response = await axios.get(`${BACKEND_URL}/api/doctors`, { params });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors(cityFilter);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-6xl text-primary-900 mb-6">Find a Specialist</h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
          Search our comprehensive directory of verified medical professionals by city.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-16">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by city (e.g. New York)"
            className="block w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-full text-lg shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-stone-400"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            data-testid="city-search-input"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-full font-medium hover:bg-primary-800 transition-colors"
            data-testid="search-button"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-stone-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-100">
          <p className="text-stone-500 text-lg">No doctors found matching your criteria.</p>
          <button 
            onClick={() => {setCityFilter(""); fetchDoctors("");}}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="group bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full" data-testid={`doctor-card-${doctor.id}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center text-primary font-serif font-bold text-2xl shrink-0">
          {doctor.name.charAt(0)}
        </div>
        <div className="bg-stone-50 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-stone-500">
          Verified
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-serif text-xl font-bold text-primary-900 mb-1 group-hover:text-primary transition-colors">
          {doctor.name}
        </h3>
        <div className="flex items-center gap-2 text-accent font-medium text-sm mb-3">
          <Stethoscope className="w-4 h-4" />
          {doctor.specialty}
        </div>
        <div className="flex items-center gap-2 text-stone-500 text-sm">
          <MapPin className="w-4 h-4" />
          {doctor.city}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-stone-100 space-y-3">
        <div className="flex items-center gap-3 text-sm text-stone-600">
          <Phone className="w-4 h-4 text-stone-400" />
          {doctor.contact_info}
        </div>
      </div>
    </div>
  );
}
