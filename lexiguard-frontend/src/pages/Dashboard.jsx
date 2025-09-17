import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FileText } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch uploaded files from backend
    fetch("http://localhost:5000/api/uploads") // change URL if backend is deployed
      .then((res) => res.json())
      .then((data) => {
        // Add simulated analysis info for each file
        const analyzedDocs = data.map((doc) => ({
          ...doc,
          summary: `This is a simulated summary for ${doc.filename}`,
          risks: [
            { clause_text: "Termination Clause", risk_explanation: "One-sided in favor of employer", severity: "High" },
            { clause_text: "Payment Terms", risk_explanation: "Late payment penalty missing", severity: "Medium" },
          ],
          suggestions: [
            "Rewrite termination clause to include notice period",
            "Add late payment penalty clause",
          ],
        }));
        setDocuments(analyzedDocs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-black via-[#0F2A40] to-[#064E3B] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Document Dashboard</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            View your uploaded legal documents with AI analysis
          </p>
        </div>

        {/* Documents List */}
        <div className="grid md:grid-cols-2 gap-6">
          {documents.length === 0 ? (
            <p className="text-gray-300 col-span-full text-center">
              No documents uploaded yet.
            </p>
          ) : (
            documents.map((doc) => (
              <Card
                key={doc.filename}
                className="bg-[#064E3B]/90 backdrop-blur-md shadow-2xl border-none"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span>{doc.filename}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-300 text-sm">
                    Type: {doc.type} | Uploaded: {new Date(doc.uploaded_at).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {doc.risks.map((risk, idx) => (
                      <Badge
                        key={idx}
                        variant={risk.severity === "High" ? "destructive" : "secondary"}
                      >
                        {risk.severity} Risk
                      </Badge>
                    ))}
                  </div>

                  <p className="mt-2 text-gray-200 text-sm">{doc.summary}</p>

                  <div className="mt-2 space-y-1">
                    {doc.suggestions.map((s, idx) => (
                      <p key={idx} className="text-gray-300 text-sm">• {s}</p>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href={`http://localhost:5000${doc.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 underline"
                    >
                      Open / Download
                    </a>

                    <button
                      onClick={() => navigate("/results", { state: { analysis: doc } })}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white w-full py-2 rounded"
                    >
                      View Analysis
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
