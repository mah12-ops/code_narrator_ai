import { useState } from "react";
import axios from "axios";

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

      <input
        type="text"
        name="language"
        placeholder="Enter language (e.g. JavaScript)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full bg-gray-100 p-2 mb-4 rounded"
      />

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
