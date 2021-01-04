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


    const editButton = {
        backgroundColor :"black"
    }

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
                                            <Link to={'/updateRecord/'+row.original._id}  className="edit-link-button col-sm-6" >
                                                Edit
                                            </Link>
                                            
                                            <button onClick={() => {deleteRow(row.original._id)}} className="delete-link-button col-sm-6" >
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
                    <div className="page-link">First</div>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <div className="page-link">{'<'}</div>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <div className="page-link">{'>'}</div>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <div className="page-link">Last</div>
                </li>
                <li>
                    <div className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </div>
                </li>
                <li>
                    <div className="page-link">
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
                    </div>
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

function DataTable({data,deleteRow}) {
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
        <Table columns={columns} data={data} deleteRow={deleteRow} />
    )
}

export default DataTable;