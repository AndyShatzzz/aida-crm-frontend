import React, { FC, useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Rnd } from 'react-rnd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from 'styled-components';
import { tablesRequest } from '../../shared/api/tablesRequest/tablesRequest';
import DeleteIcon from '@mui/icons-material/Delete';

const ITEM_TYPE = 'TABLE';

const StyledTable = styled.div`
  background: lightblue;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;
  position: relative;

  &:hover {
    background: lightgreen;
    opacity: 0.7;
  }
`;

const defaultTables = [
  {
    tableNumber: 1,
    x: 529,
    y: 273,
    width: 141,
    height: 134,
    id: 1
  }
];

interface ISaleEditModeProps {
  tables: any;
  setTables: any;
  editMode: boolean;
  setEditMode: any;
}

type tablesState = {
  tableNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
};

export const SaleEditMode: FC<ISaleEditModeProps> = ({ tables, setTables, editMode, setEditMode }) => {
  const [editableTables, setEditableTables] = useState<tablesState[]>();
  const { data: tablesPosition } = tablesRequest.useGetTablesQuery();
  const [PostTables] = tablesRequest.usePostTablesMutation();
  const [PatchTables] = tablesRequest.usePatchTablesMutation();

  useEffect(() => {
    if (tables) {
      setEditableTables(tables);
    }
  }, [tables]);

  async function handleUpdateTablePosition() {
    if (tablesPosition?.length === 0 || !tablesPosition) {
      await PostTables({
        tables: defaultTables
      });
      await setEditMode((state: any) => !state);
    } else {
      await PatchTables({
        _id: tablesPosition && tablesPosition[0]._id,
        tables: editableTables
      });
      await setEditMode((state: any) => !state);
    }
  }

  const handleDrop = (x: number, y: number) => {
    const newTable = {
      x,
      y,
      width: 100,
      height: 100
    };
    setEditableTables((prev: any) => [...prev, { id: prev.length + 1, ...newTable }]);
  };

  const updateTablePosition = (id: number, newPosition: any) => {
    setEditableTables((prev: any) =>
      prev.map((t: any) => (t.id === id ? { ...t, x: newPosition.x, y: newPosition.y } : t))
    );
  };

  const updateTableSize = (id: number, width: number, height: number) => {
    setEditableTables((prev: any) => prev.map((t: any) => (t.id === id ? { ...t, width, height } : t)));
  };

  const handleDeleteTable = (e: any, id: number) => {
    e.stopPropagation();
    const updateTables = editableTables?.filter(item => item.id !== id);
    setEditableTables(updateTables);
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, mb: 2 }}
        onClick={handleUpdateTablePosition}
      >
        Сохранить столы
      </Button>
      <DndProvider backend={HTML5Backend}>
        <Box>
          <Typography variant="h6">Добавление столов</Typography>
          <DraggableTable />
          <DropZone onDropTable={handleDrop}>
            {editableTables &&
              editableTables.map((table: any) => (
                <Rnd
                  key={table.id}
                  size={{ width: table.width, height: table.height }}
                  position={{ x: table?.x, y: table?.y }}
                  onDragStop={(e, d) => {
                    updateTablePosition(table.id, { x: d.x, y: d.y });
                  }}
                  onResize={(e, direction, ref) => {
                    updateTableSize(table.id, ref.offsetWidth, ref.offsetHeight);
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateTablePosition(table.id, { x: position.x, y: position.y });
                  }}
                >
                  <StyledTable
                    style={{
                      background: 'lightblue',
                      border: '1px solid black',
                      width: table.width,
                      height: table.height
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: '0px', right: '0px' }}
                      onClick={e => handleDeleteTable(e, table.id)}
                    >
                      <DeleteIcon sx={{ width: '15px', height: '15px' }} />
                    </IconButton>
                    Стол №{table.id}
                  </StyledTable>
                </Rnd>
              ))}
          </DropZone>
        </Box>
      </DndProvider>
    </>
  );
};

const DraggableTable = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <Box
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        cursor: 'grab',
        border: '1px solid gray',
        textAlign: 'center',
        marginTop: '10px',
        width: '150px',
        height: '30px'
      }}
    >
      Стол
    </Box>
  );
};

const DropZone: React.FC<{ onDropTable: (x: number, y: number) => void; children: any }> = ({
  onDropTable,
  children
}) => {
  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onDropTable(offset.x, offset.y - 240);
      }
    }
  }));

  return (
    <Box
      ref={drop}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'visible',
        backgroundColor: '#f0f0f0'
      }}
    >
      {children}
    </Box>
  );
};

export default SaleEditMode;
