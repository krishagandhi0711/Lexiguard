import React from "react";

export default function FairnessScore({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded-xl shadow mt-4 bg-white">
      <h2 className="text-xl font-bold mb-2">⚖️ Fairness Analysis</h2>
      <p className="text-lg">
        Fairness Score: <strong>{data.fairness_score}/100</strong>
      </p>
      <div className="mt-3">
        <h3 className="font-semibold">Clause Comparison:</h3>
        {data.comparisons && data.comparisons.length > 0 ? (
          data.comparisons.map((comp, i) => (
            <div key={i} className="mt-2 p-2 border rounded bg-gray-50">
              <p>
                <strong>Standard:</strong> {comp.standard_clause}
              </p>
              <p>
                <strong>Document:</strong> {comp.document_clause}
              </p>
              <p className="text-red-600">
                <strong>Risk:</strong> {comp.comparison_note}
              </p>
            </div>
          ))
        ) : (
          <p>No comparisons available.</p>
        )}
      </div>
    </div>
  );
}
