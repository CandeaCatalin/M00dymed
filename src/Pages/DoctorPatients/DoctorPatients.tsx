import {
    CardContent,
    IconButton,
    InputLabel,
    MenuItem,
    Popper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TextField,
} from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import React, { useEffect, useState } from 'react';
import {
    AddBtn,
    CardContainer,
    FilterForm,
    FooterContainer,
    HeaderContainer,
    SearchInput,
    TableHeader,
} from '../../components/common/Doctors.components';
import { AppwritePatients } from '../../services/AppwritePatients';
export const DoctorPatients = () => {
    const [filterValue, setFilterValue] = useState('All');
    const [searchValue, setSearchValue] = useState('');
    const [rows, setRows] = useState<PatientData[]>([]);
    const { getPatients } = AppwritePatients();
    useEffect(() => {
        getPatients(filterValue, searchValue ? searchValue : '').then((r) => setRows(r));
        // setRows(elements);\
    }, [filterValue, searchValue]);
    const handleChangeFilter = (event: SelectChangeEvent) => {
        setFilterValue(event.target.value);
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <CardContainer>
            <CardContent>
                <HeaderContainer>
                    <SearchInput
                        size="small"
                        id="free-solo-demo"
                        freeSolo
                        options={[]}
                        onInputChange={(e) => setSearchValue(e.target.value)}
                        sx={{ m: 0, minWidth: 100, maxHeight: 50 }}
                        renderInput={(params) => <TextField {...params} label="Search patients" />}
                    />
                    {/* filter */}
                    <div style={{ marginRight: '10px' }}>
                        <FilterForm size="small" sx={{ m: 1, minWidth: 100, maxHeight: 50 }}>
                            <InputLabel size="small">Diagnostics</InputLabel>
                            <Select
                                size="small"
                                labelId="filter-diagnostics"
                                id="filter-diagnostics"
                                value={filterValue}
                                label="Filter by Diagnostics"
                                onChange={handleChangeFilter}
                            >
                                {diagnostics.map((diagnostic) => {
                                    return <MenuItem value={diagnostic.id}>{diagnostic.label}</MenuItem>;
                                })}
                            </Select>
                        </FilterForm>
                    </div>
                </HeaderContainer>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHeader>
                            <TableRow>
                                {tableColumns.map((column) => {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                        {tableColumns.map((column) => {
                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'actions' ? (
                                                        <div>
                                                            <Menu
                                                                id={row.id}
                                                                firstName={row.firstName}
                                                                lastName={row.lastName}
                                                                diagnostics={row.diagnostics}
                                                                diagnosticsGrade={row.diagnosticsGrade}
                                                            />
                                                        </div>
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <FooterContainer>
                    <AddBtn
                        variant="contained"
                        onClick={() => {
                            console.log(searchValue);
                        }}
                    >
                        Add
                    </AddBtn>
                </FooterContainer>
            </CardContent>
        </CardContainer>
    );
};

const diagnostics = [
    {
        id: 'All',
        label: 'All',
    },
    {
        id: 'Depression',
        label: 'Depression',
    },
    {
        id: 'Anxiety',
        label: 'Anxiety',
    },
];

interface Column {
    id: 'FirstName' | 'LastName' | 'diagnostics' | 'diagnosticsGrade' | 'actions';
    label: string;
    minWidth: number;
    align: 'left';
}
const tableColumns: Column[] = [
    {
        id: 'FirstName',
        label: 'First Name',
        align: 'left',
        minWidth: 50,
    },
    {
        id: 'LastName',
        label: 'Last Name',
        align: 'left',
        minWidth: 50,
    },
    {
        id: 'diagnostics',
        label: 'Diagnostics',
        align: 'left',
        minWidth: 50,
    },
    {
        id: 'diagnosticsGrade',
        label: 'Severity Grade',
        align: 'left',
        minWidth: 50,
    },
    {
        id: 'actions',
        label: '',
        align: 'left',
        minWidth: 20,
    },
];

interface PatientData {
    id: string;
    FirstName: string;
    LastName: string;
    diagnostics: string;
    diagnosticsGrade: string;
    actions?: string;
}

const Menu = (Pacient: PatientData) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    let open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const handleActionClick = (id: string, action: string) => {
        open = !Boolean(anchorEl);
    };
    return (
        <>
            <IconButton
                id={id}
                onClick={(e) => {
                    handleClick(e);
                }}
            >
                <MoreVertOutlinedIcon />{' '}
            </IconButton>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div
                    style={{
                        background: 'white',
                        fontSize: 5,
                        borderRadius: 10,
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleActionClick(Pacient.firstName, 'seeProfile');
                        }}
                    >
                        See Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleActionClick(Pacient.firstName, 'editProfile');
                        }}
                    >
                        Edit Profile
                    </MenuItem>
                </div>
            </Popper>
        </>
    );
};
