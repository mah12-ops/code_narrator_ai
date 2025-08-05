import { useState } from "react";
import axios from "axios";
 import { SiJavascript, SiPython, SiPhp,  SiTypescript, SiRuby } from "react-icons/si";
 import { SiOpenjdk } from "react-icons/si"


 const languages = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
  { name: "Python", icon: <SiPython className="text-blue-600" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-600" /> },
  { name: "Java", icon: < SiOpenjdk className="text-red-500" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-700" /> },
  { name: "Ruby", icon: <SiRuby className="text-red-600" /> },
];


function Dashboard() {

  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    if (!code || !language) return alert("Please enter both code and language.");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/explain', {
        code,
        language,
      });
      setExplanation(res.data.explanation);
    } catch (err: any) {
      console.error('❌ Error fetching explanation:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Code Explanation</h1>

      <textarea
        name="code"
        placeholder="Paste your code here"
        rows={8}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full bg-gray-100 p-2 mb-4 rounded"
      />

      {/* <input
        type="text"
        name="language"
        placeholder="Enter language (e.g. JavaScript)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full bg-gray-100 p-2 mb-4 rounded"
      /> */}
      <div className="mb-4">
  <h3 className="font-semibold text-gray-700 mb-2">Choose Language</h3>
  <div className="flex flex-wrap gap-4">
    {languages.map((lang) => (
      <button
        key={lang.name}
        onClick={() => setLanguage(lang.name)}
        className={`flex items-center gap-2 px-4 py-2 rounded shadow-sm border 
          ${language === lang.name ? "bg-primary text-white" : "bg-white text-gray-800"} 
          hover:bg-primary hover:text-white transition`}
      >
        {lang.icon}
        <span className="text-sm">{lang.name}</span>
      </button>
    ))}
  </div>
</div>


      <button
        onClick={fetchExplanation}
        className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Explain Code'}
      </button>

      {explanation && (
        <div className="mt-6 bg-white p-4 rounded shadow whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Explanation:</h2>
          {explanation}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
