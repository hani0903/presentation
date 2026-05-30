interface TableProps {
  headers: string[];
  rows: string[][];
}

export const Table = ({ headers, rows }: TableProps) => (
  <div className="border-outline-variant overflow-x-auto rounded-2xl border">
    <table className="w-full text-left">
      <thead className="bg-surface-container-high">
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className="text-body-3 text-on-surface border-outline-variant border-b px-4 py-3 font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr
            key={ri}
            className="border-outline-variant even:bg-surface-container-low border-b last:border-0"
          >
            {row.map((cell, ci) => (
              <td
                key={ci}
                className="text-body-3 text-on-surface-variant px-4 py-3"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
