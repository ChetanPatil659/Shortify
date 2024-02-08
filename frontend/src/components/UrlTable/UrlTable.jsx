import React from 'react'

function UrlTable({ columns, rows }) {

    return (
        <table className='table-auto w-full max-w-4xl text-left'>
            <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                <tr>
                    {columns.map((val, ind) => (
                        <th className='p-2 whitespace-nowrap' key={ind+100}>{val.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='text-sm divide-y divide-gray-100'>
                {rows.map((val,ind) => (
                    <tr key={ind + 60}>
                        {columns.map((column, idx) => (
                            <td className='p-2 whitespace-nowrap' key={ind + 60 + idx}>{val[column.field]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UrlTable