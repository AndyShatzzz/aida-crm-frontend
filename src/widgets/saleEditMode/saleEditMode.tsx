import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Rnd } from 'react-rnd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ITEM_TYPE = 'TABLE';

export const SaleEditMode = () => {
  const [tables, setTables] = useState<{ id: number; x: number; y: number; width: number; height: number }[]>([]);

  const handleDrop = (x: number, y: number) => {
    const newTable = {
      id: tables.length + 1,
      x,
      y,
      width: 100,
      height: 100
    };
    setTables([...tables, newTable]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box
          style={{
            width: '200px',
            height: '100%',
            borderRight: '2px solid gray',
            padding: '10px'
          }}
        >
          <Typography variant="h6">Добавление столов</Typography>
          <DraggableTable />
          <DropZone onDropTable={handleDrop}>
            {tables.map(table => (
              // eslint-disable-next-line react/jsx-key
              <Rnd
                size={{ width: table.width, height: table.height }}
                position={{ x: table?.x, y: table?.y }}
                onDragStop={(e, d) => {
                  setTables(prev => prev.map(t => (t.id === table.id ? { ...t, left: d.x, top: d.y } : t)));
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setTables(prev =>
                    prev.map(t =>
                      t.id === table.id
                        ? {
                            ...t,
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                            left: position.x,
                            top: position.y
                          }
                        : t
                    )
                  );
                }}
              >
                <div style={{ background: 'lightblue', border: '1px solid black' }}>Стол №{table.id}</div>
              </Rnd>
            ))}
          </DropZone>
        </Box>
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
        onDropTable(offset.x - 200, offset.y);
      }
    }
  }));

  return (
    <Box
      ref={drop}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'auto',
        backgroundColor: '#f0f0f0'
      }}
    >
      {children}
    </Box>
  );
};

export default SaleEditMode;
