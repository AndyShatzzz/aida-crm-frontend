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

export const TableList: FC<ITableListProps> = ({ setIsTableOpen, setTableNumber }) => {
  const { data: cheques } = productsRequest.useGetChequesQuery();

  const [tableQuantity, handleSetTableQuantity] = useSetTableQuantity();
  const [openCheques, findOpenCheques] = useFindOpenCheques();

  const [editMode, setEditMode] = useState(false);
  const [tables, setTables] = useState<{ id: number; x: number; y: number; width: number; height: number }[]>([
    {
      id: 1,
      x: 531,
      y: 319,
      width: 150,
      height: 150
    },
    {
      id: 2,
      x: 530,
      y: 124,
      width: 150,
      height: 150
    },
    {
      id: 3,
      x: 763,
      y: 16,
      width: 100,
      height: 100
    },
    {
      id: 4,
      x: 883,
      y: 83,
      width: 100,
      height: 100
    },
    {
      id: 5,
      x: 1010,
      y: 153,
      width: 100,
      height: 100
    },
    {
      id: 6,
      x: 833,
      y: 290,
      width: 393,
      height: 115
    },
    {
      id: 7,
      x: 900,
      y: 452,
      width: 100,
      height: 100
    },
    {
      id: 8,
      x: 859,
      y: 591,
      width: 62,
      height: 67
    },
    {
      id: 9,
      x: 951,
      y: 589,
      width: 69,
      height: 66
    },
    {
      id: 10,
      x: 1047,
      y: 588,
      width: 77,
      height: 65
    },
    {
      id: 11,
      x: 1154,
      y: 587,
      width: 72,
      height: 65
    },
    {
      id: 12,
      x: 121,
      y: 177,
      width: 229,
      height: 210
    }
  ]);

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
            tables={tables}
            setTables={setTables}
          />
        ) : (
          tables.map(table => (
            <StyledTable
              key={table.id}
              width={table.width}
              height={table.height}
              x={table.x}
              y={table.y}
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
