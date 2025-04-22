// components/LabResultTable.tsx
type LabField = {
    fieldName: string;
    meaning: string;
    value: string | number;
    normalRange: string;
    interpretation: string;
  };
  
  export function LabResultTable({ results }: { results: LabField[] }) {
    return (
      <div className="overflow-x-auto border rounded p-4 shadow-md">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th>Test</th>
              <th>Meaning</th>
              <th>Value</th>
              <th>Normal Range</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {results.map((field, idx) => (
              <tr key={idx} className="border-t">
                <td>{field.fieldName}</td>
                <td>{field.meaning}</td>
                <td>{field.value}</td>
                <td>{field.normalRange}</td>
                <td>{field.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  