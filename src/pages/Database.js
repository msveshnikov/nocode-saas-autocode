import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Database = () => {
    const { currentUser } = useAuth();
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [isCreateTableDialogOpen, setIsCreateTableDialogOpen] = useState(false);
    const [newTableName, setNewTableName] = useState('');
    const [newColumnName, setNewColumnName] = useState('');
    const [newColumnType, setNewColumnType] = useState('');
    const [newColumns, setNewColumns] = useState([]);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await fetch('/api/database/tables', {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            const data = await response.json();
            setTables(data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const fetchTableData = async tableName => {
        try {
            const response = await fetch(`/api/database/tables/${tableName}/data`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            const data = await response.json();
            setTableData(data);
        } catch (error) {
            console.error('Error fetching table data:', error);
        }
    };

    const handleTableSelect = tableName => {
        setSelectedTable(tableName);
        fetchTableData(tableName);
    };

    const handleCreateTable = async () => {
        try {
            const response = await fetch('/api/database/tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.token}`
                },
                body: JSON.stringify({
                    name: newTableName,
                    columns: newColumns
                })
            });
            if (response.ok) {
                setIsCreateTableDialogOpen(false);
                setNewTableName('');
                setNewColumns([]);
                fetchTables();
            } else {
                console.error('Error creating table');
            }
        } catch (error) {
            console.error('Error creating table:', error);
        }
    };

    const handleAddColumn = () => {
        if (newColumnName && newColumnType) {
            setNewColumns([...newColumns, { name: newColumnName, type: newColumnType }]);
            setNewColumnName('');
            setNewColumnType('');
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Database Management
            </Typography>
            <Box display="flex" mb={4}>
                <Box mr={2}>
                    <Typography variant="h6" gutterBottom>
                        Tables
                    </Typography>
                    {tables.map(table => (
                        <Button
                            key={table.name}
                            variant={selectedTable === table.name ? 'contained' : 'outlined'}
                            onClick={() => handleTableSelect(table.name)}
                            sx={{ mb: 1, display: 'block' }}
                        >
                            {table.name}
                        </Button>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsCreateTableDialogOpen(true)}
                        sx={{ mt: 2 }}
                    >
                        Create New Table
                    </Button>
                </Box>
                <Box flexGrow={1}>
                    {selectedTable && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                {selectedTable} Data
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {tableData.length > 0 &&
                                                Object.keys(tableData[0]).map(column => (
                                                    <TableCell key={column}>{column}</TableCell>
                                                ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((row, index) => (
                                            <TableRow key={index}>
                                                {Object.values(row).map((value, cellIndex) => (
                                                    <TableCell key={cellIndex}>{value}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Box>
            </Box>
            <Dialog
                open={isCreateTableDialogOpen}
                onClose={() => setIsCreateTableDialogOpen(false)}
            >
                <DialogTitle>Create New Table</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Table Name"
                        fullWidth
                        value={newTableName}
                        onChange={e => setNewTableName(e.target.value)}
                    />
                    <Box mt={2}>
                        <Typography variant="subtitle1">Columns</Typography>
                        {newColumns.map((column, index) => (
                            <Typography key={index}>
                                {column.name} ({column.type})
                            </Typography>
                        ))}
                        <Box display="flex" mt={1}>
                            <TextField
                                label="Column Name"
                                value={newColumnName}
                                onChange={e => setNewColumnName(e.target.value)}
                                size="small"
                                sx={{ mr: 1 }}
                            />
                            <TextField
                                label="Column Type"
                                value={newColumnType}
                                onChange={e => setNewColumnType(e.target.value)}
                                size="small"
                                sx={{ mr: 1 }}
                            />
                            <Button variant="outlined" onClick={handleAddColumn}>
                                Add Column
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsCreateTableDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateTable} variant="contained" color="primary">
                        Create Table
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Database;
