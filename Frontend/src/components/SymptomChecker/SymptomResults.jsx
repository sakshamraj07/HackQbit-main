import { MdHealthAndSafety } from "react-icons/md";
import renderUrgency from "./utils/renderUrgency";

const SymptomResults = ({ results }) => (
  <div className="relative w-full max-w-4xl z-10 p-6 md:p-8 rounded-2xl border border-white/10 bg-transparent">
    {/* Header */}
    <div className="w-full flex flex-col items-center mb-8">
      <MdHealthAndSafety className="text-5xl text-emerald-300 drop-shadow-lg" />
      <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mt-3 drop-shadow-md">
        Possible Conditions
      </h2>
    </div>

    {/* Results */}
    <div className="grid grid-cols-1 gap-6 w-full">
      {results.map((condition, index) => (
        <div
          key={index}
          className="relative w-full overflow-hidden rounded-2xl shadow-lg 
                     bg-gradient-to-br from-emerald-600/70 via-teal-600/70 to-green-700/70
                     border border-white/20 p-6 backdrop-blur-md transition-all"
        >
          {/* Content */}
          <div className="relative flex flex-col gap-3 z-10">
            <div
              className="w-12 h-12 flex items-center justify-center 
                         rounded-xl bg-emerald-400/20 
                         text-emerald-200 text-2xl shadow-inner"
            >
              🩺
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-2xl font-bold text-white drop-shadow-md">{condition.name}</h3>
             
            </div>
            <p className="text-sm md:text-base text-gray-100 drop-shadow-md leading-relaxed">
              {condition.description}
            </p>
            <div className="mt-4 border-t pt-4 border-white/10">
              <strong className="text-lg text-emerald-200 drop-shadow-md">Next Steps:</strong>
              <p className="text-sm text-gray-100 mt-1 drop-shadow-md">{condition.cta}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SymptomResults;
