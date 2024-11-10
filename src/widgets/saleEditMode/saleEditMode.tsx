import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Rnd } from 'react-rnd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { styled } from 'styled-components';

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

  &:hover {
    background: lightgreen;
    opacity: 0.7;
  }
`;

interface ISaleEditModeProps {
  tables: any;
  setTables: any;
}

export const SaleEditMode: FC<ISaleEditModeProps> = ({ tables, setTables }) => {
  const handleDrop = (x: number, y: number) => {
    const newTable = {
      x,
      y,
      width: 100,
      height: 100
    };
    setTables((prev: any) => [...prev, { id: prev.length + 1, ...newTable }]);
  };

  const updateTablePosition = (id: number, newPosition: any) => {
    setTables((prev: any) => prev.map((t: any) => (t.id === id ? { ...t, x: newPosition.x, y: newPosition.y } : t)));
  };

  const updateTableSize = (id: number, width: number, height: number) => {
    setTables((prev: any) => prev.map((t: any) => (t.id === id ? { ...t, width, height } : t)));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <Typography variant="h6">Добавление столов</Typography>
        <DraggableTable />
        <DropZone onDropTable={handleDrop}>
          {tables.map((table: any) => (
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
                Стол №{table.id}
              </StyledTable>
            </Rnd>
          ))}
        </DropZone>
      </Box>
    </DndProvider>
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
        height: '150px'
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
