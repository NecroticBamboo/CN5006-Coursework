// src/components/pagination.table.js
import React from "react";

import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce  } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// see https://www.freakyjolly.com/react-table-tutorial/#.X-9rBNj7SHs 


// const url = '/updateRecord/'+data._id;

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data, deleteRow }) {
	
    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
	
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
		preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
			defaultColumn,
            initialState: { pageIndex: 0, pageSize: 20 },
        },
        useFilters,
        useGlobalFilter,
        usePagination
    )

    // Render the UI for your table
    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
									{column.render('Header')}
									{/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
								</th>
                            ))}
                            <th>
                                Actions
                            </th>    
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                                {/* {console.log(deleteRow)} */}
                                <td>
                                    <div class="container-fluid">
                                        <div class="row">    
                                            <Link to={'/updateRecord/'+row.original._id} className="link-button col-sm-6">
                                                Edit
                                            </Link>
                                            
                                            <button onClick={() => {deleteRow(row.original._id)}} class="link-button col-sm-6">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul>
        </div >
    )
}

function DataTable({data}) {
    const columns = React.useMemo(
        () => [
			{
				Header: 'Date',
				accessor: 'date',
			},
			{
				Header: 'State',
				accessor: 'state',
			},
			{
				Header: 'County',
				accessor: 'county',
			},
			{
				Header: 'Cases',
				accessor: 'cases',
			},
			{
				Header: 'Deaths',
				accessor: 'deaths',
			},
        ],
        []
    );
	return (
        <Table columns={columns} data={data} />
    )
}

export default DataTable;


//-------------------------------------------------------------------------------------------------


// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import updateRecord from './updateRecord'

// class DataTable extends Component {
//     renderRow(data) {
//         const url = '/updateRecord/'+data._id;

//         return (
//             <tr>
                
//                 <td>
//                     {data.date}
//                 </td>
//                 <td>
//                     {data.county}
//                 </td>
//                 <td>
//                     {data.state}
//                 </td>
//                 <td>
//                     {data.cases}
//                 </td>
//                 <td>
//                     {data.deaths}
//                 </td>
//                     {/* <button onClick={() => {this.prop
//                     s.editRow(data._id)}}  id ="Button" className="muted-button">
//                         Edit
//                     </button> */}
//                 <td>    
//                     <Link to={url} className="link-button">
//                         Edit
//                     </Link>
                    
//                     <button onClick={() => {this.props.deleteRow(data._id)}} class="link-button">
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         );
//     }

//     renderBody(data) {
//         return data.map((row, i) => {
//             return this.renderRow(row);
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <td class="title-size">Date</td>
//                                 <td class="title-size">County</td>
//                                 <td class="title-size">State</td>
//                                 <td class="title-size">Cases</td>
//                                 <td class="title-size">Deaths</td>
//                                 <td class="title-size">Actions</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {this.renderBody(this.props.data)}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )
//     }

// }

// export default DataTable;