import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const SymptomInput = ({
  age,
  setAge,
  gender,
  setGender,
  symptomsInput,
  setSymptomsInput,
  symptomsList,
  handleAddSymptom,
  handleRemoveSymptom,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="w-full max-w-2xl z-10 p-3 sm:p-0"
  >
    {/* Age and Gender */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full rounded-full p-3 bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all text-sm sm:text-base"
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full rounded-full p-3 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all text-sm sm:text-base"
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Symptom List and Input */}
    <div className="w-full border border-white/50 rounded-2xl p-4 mb-4 bg-white/80 text-gray-800 shadow-lg focus-within:ring-2 focus-within:ring-green-400 transition-all">
      <AnimatePresence>
        <div className="flex flex-wrap gap-2 mb-3 min-h-[3rem]">
          {symptomsList.map((symptom, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-green-100 text-green-800 font-semibold py-1 px-3 rounded-full flex items-center gap-2 text-xs sm:text-sm shadow-sm"
            >
              {symptom}
              <button
                onClick={() => handleRemoveSymptom(index)}
                className="text-xs sm:text-sm p-1 hover:text-red-500 transition-colors"
              >
                <MdOutlineClose />
              </button>
            </motion.span>
          ))}
        </div>
      </AnimatePresence>

      <input
        type="text"
        placeholder="Type symptoms and press Enter (e.g., fever, headache)"
        value={symptomsInput}
        onChange={(e) => setSymptomsInput(e.target.value)}
        onKeyDown={handleAddSymptom}
        className="w-full bg-transparent focus:outline-none placeholder-gray-600 text-gray-800 text-sm sm:text-base"
      />
    </div>
  </motion.div>
);

export default SymptomInput;
