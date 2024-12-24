import DataTable from 'react-data-table-component';

const initCap = (str) => {
    if (!str) {
        return '';
    }

    return str
        .toString()
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const formatRow = (row) => {
    return `${Object.keys(row).map((key) => `${initCap(key)}: ${initCap(row[key])}`).join('\n')}`;
}

const ExpandedComponent = ({ data }) => <pre>{formatRow(data)}</pre>;

const DTable = ({ title, columns, data, onRowClicked = () => {}, expanded=false, rowsPerPage=5 }) => {
    return (
        <div style={{ width: '100%' }}>
            <DataTable
                title={title}
                columns={columns}
                data={data}
                onRowClicked={onRowClicked}
                expandableRows={expanded}
                expandableRowsComponent={ExpandedComponent}
                pagination
                highlightOnHover
                pointerOnHover
                responsive
                paginationPerPage={rowsPerPage}
            />
        </div>
    );
};

export default DTable;