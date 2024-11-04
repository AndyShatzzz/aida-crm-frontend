import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Rnd } from 'react-rnd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'TABLE';

export const SaleEditMode = () => {
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

  const handleDrop = (x: number, y: number) => {
    const newTable = {
      x,
      y,
      width: 100,
      height: 100
    };
    setTables(prev => [...prev, { id: prev.length + 1, ...newTable }]);
  };

  const updateTablePosition = (id: number, newPosition: any) => {
    setTables(prev => prev.map(t => (t.id === id ? { ...t, x: newPosition.x, y: newPosition.y } : t)));
  };

  const updateTableSize = (id: number, width: number, height: number) => {
    setTables(prev => prev.map(t => (t.id === id ? { ...t, width, height } : t)));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <Typography variant="h6">Добавление столов</Typography>
        <DraggableTable />
        <DropZone onDropTable={handleDrop}>
          {tables.map(table => (
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
              <div
                style={{
                  background: 'lightblue',
                  border: '1px solid black',
                  width: table.width,
                  height: table.height
                }}
              >
                Стол №{table.id}
              </div>
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
        marginTop: '10px'
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
