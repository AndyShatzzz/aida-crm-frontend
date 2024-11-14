import { Box, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import css from './tableList.module.scss';
import { productsRequest } from '../../../shared/api/productsRequest/productsRequest';
import { ITableListProps } from '../types/ITableListProps';
import { ITableQuantity } from '../../../shared/types/ITableQuantity';
import { useFindOpenCheques } from '../../../shared/hooks/useFindOpenCheques';
import { useSetTableQuantity } from '../hooks/useSetTableQuantity';
import { SaleEditMode } from '../../saleEditMode/saleEditMode';
import styled from 'styled-components';
import { tablesRequest } from '../../../shared/api/tablesRequest/tablesRequest';

const StyledTable = styled.div<{ width: number; height: number; x: number; y: number; opened?: boolean }>`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: ${props => (props.opened ? '#fa9bc9' : 'lightblue')};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

type tablesState = {
  tableNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
  opened?: boolean;
};

export const TableList: FC<ITableListProps> = ({ setIsTableOpen, setTableNumber }) => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const { data: tablesPosition } = tablesRequest.useGetTablesQuery();

  const [openCheques, findOpenCheques] = useFindOpenCheques();

  const [editMode, setEditMode] = useState(false);
  const [tables, setTables] = useState<tablesState[]>();

  const handleClick = (tableNumber: number) => {
    setIsTableOpen(true);
    setTableNumber(tableNumber);
  };

  useEffect(() => {
    findOpenCheques(cheques || []);
  }, [cheques]);

  const updateTablesStatus = () => {
    const updatedTables = tables?.map(table => {
      const isOpened = openCheques?.find(item => item.tableNumber === table.id);
      return isOpened ? { ...table, opened: true } : table;
    });
    setTables(updatedTables);
  };

  useEffect(() => {
    if (tablesPosition) {
      setTables(tablesPosition[0].tables);
    }
  }, [tablesPosition]);

  useEffect(() => {
    if (tables && tables.length > 0) {
      updateTablesStatus();
    }
  }, [openCheques]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {!editMode && (
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => setEditMode(state => !state)}
        >
          Редактировать столы
        </Button>
      )}

      <Box
        sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'visible', backgroundColor: '#f0f0f0' }}
      >
        {editMode ? (
          <SaleEditMode
            tables={tables !== undefined && tables}
            setTables={setTables}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          tables !== undefined &&
          tables.map((table: any) => (
            <StyledTable
              key={table.id}
              width={table.width}
              height={table.height}
              x={table.x}
              y={table.y}
              opened={table.opened}
              onClick={() => handleClick(table.id)}
            >
              Стол №{table.id}
            </StyledTable>
          ))
        )}
      </Box>
    </Box>
  );
};
