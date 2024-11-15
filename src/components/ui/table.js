'use client';

import React from 'react';

const Table = ({ columns, data, onAction }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {column.header}
              </th>
            ))}
            {onAction && <th className="px-4 py-2 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {column.cell ? column.cell(row) : row[column.accessor]}
                </td>
              ))}
              {onAction && (
                <td className="px-4 py-2">
                  {onAction(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;