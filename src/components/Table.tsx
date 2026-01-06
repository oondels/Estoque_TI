import React from 'react';

interface Column {
  key: string;
  label: string;
  minWidth?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export function Table({ columns, data, onRowClick }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ minWidth: column.minWidth || 'auto' }}
                className="h-14 px-4 text-left text-sm font-semibold text-[#374151] bg-[#F9FAFB]"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="h-32 text-center text-[#9CA3AF]"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`
                  border-b border-[#E5E7EB] transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-[#F9FAFB]' : ''}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{ minWidth: column.minWidth || 'auto' }}
                    className="h-14 px-4 text-sm text-[#374151]"
                  >
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
