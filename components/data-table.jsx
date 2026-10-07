// A table whose rows are plain JS data. A cell given as an array renders as a list.
function Cell({ value }) {
  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    );
  }
  return value;
}

export function DataTable({ headers, rows }) {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} data-label={headers[c]}><Cell value={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
