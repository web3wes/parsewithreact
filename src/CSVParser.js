import { useState, useEffect } from 'react';

function CSVParser() {
  const [csvData, setCsvData] = useState(null);

  // Default CSV string
  const defaultCsvString = `Name, Age, City
John, 30, New York
Jane, 25, San Francisco
Bob, 40, Chicago`;

  // Parse default CSV string on mount
  useEffect(() => {
    // Split the default CSV string by new line, then split each row by comma
    const data = defaultCsvString.split('\n').map((row) => row.split(','));
    // Set the parsed data to the csvData state
    setCsvData(data);
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    // Get the uploaded file
    const file = event.target.files[0];

    // Create a FileReader instance
    const reader = new FileReader();

    // Set up onload callback function to handle the FileReader result
    reader.onload = () => {
      // Get the text from the FileReader result
      const text = reader.result;
      // Split the text by new line, then split each row by comma
      const data = text.split('\n').map((row) => row.split(','));
      // Set the parsed data to the csvData state
      setCsvData(data);
    };

    // Read the uploaded file as text
    reader.readAsText(file);
  };

  // Render file upload input and parsed CSV data as table
  return (
    <div>
      {/* File upload input */}
      <input type="file" onChange={handleFileUpload} />
      {/* Render the table if csvData state has a value */}
      {csvData && (
        <table>
          <tbody>
            {/* Map each row in csvData to a <tr> element */}
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Map each cell in the row to a <td> element */}
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CSVParser;
