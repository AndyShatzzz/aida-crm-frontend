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

const StyledTable = styled.div<{ width: number; height: number; x: number; y: number }>`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: lightblue;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: lightgreen;
    cursor: pointer;
    opacity: 0.7;
  }
`;

type getTables = {
  tables: {
    tableNumber: number;
    x: number;
    y: number;
    width: number;
    height: number;
    id: number;
  }[];
  id: number;
};

export const TableList: FC<ITableListProps> = ({ setIsTableOpen, setTableNumber }) => {
  const { data: cheques } = productsRequest.useGetChequesQuery();
  const { data: tablesPosition } = tablesRequest.useGetTablesQuery();

  const [tableQuantity, handleSetTableQuantity] = useSetTableQuantity();
  const [openCheques, findOpenCheques] = useFindOpenCheques();

  const [editMode, setEditMode] = useState(false);
  const [tables, setTables] = useState<getTables[] | undefined>();

  const handleClick = (tableNumber: number) => {
    setIsTableOpen(true);
    setTableNumber(tableNumber);
  };

  useEffect(() => {
    findOpenCheques(cheques || []);
  }, [cheques]);

  useEffect(() => {
    handleSetTableQuantity(openCheques);
  }, [cheques, openCheques]);

  useEffect(() => {
    setTables(tablesPosition);
  }, [tablesPosition]);

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
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, mb: 2 }}
        onClick={() => setEditMode(state => !state)}
      >
        {editMode ? 'Сохранить изменения' : 'Редактировать столы'}
      </Button>

      <Box
        sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'visible', backgroundColor: '#f0f0f0' }}
      >
        {editMode ? (
          <SaleEditMode
            tables={tables !== undefined && tables[0].tables}
            setTables={setTables}
          />
        ) : (
          tables !== undefined &&
          tables[0].tables.map((table: any) => (
            <StyledTable
              key={table.id}
              width={table.width}
              height={table.height}
              x={table.x}
              y={table.y}
              onClick={() => handleClick(table.id)}
            >
              Стол №{table.tableNumber}
            </StyledTable>
          ))
        )}
      </Box>
    </Box>
  );
};
