import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const ComponentBox = styled(Box)(({ theme }) => ({
    border: '1px dashed #ccc',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const DraggableComponent = ({ id, children }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: { id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <Box
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }}
        >
            {children}
        </Box>
    );
};

const Builder = () => {
    const [components, setComponents] = useState([]);

    const [, drop] = useDrop({
        accept: 'component',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveComponent(item.id, left, top);
            return undefined;
        }
    });

    const moveComponent = useCallback((id, left, top) => {
        setComponents(prevComponents =>
            prevComponents.map(component =>
                component.id === id ? { ...component, left, top } : component
            )
        );
    }, []);

    const addComponent = type => {
        const newComponent = {
            id: Date.now(),
            type,
            left: 0,
            top: 0
        };
        setComponents(prevComponents => [...prevComponents, newComponent]);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Page Builder
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <Typography variant="h6" gutterBottom>
                            Components
                        </Typography>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 1 }}
                            onClick={() => addComponent('text')}
                        >
                            Add Text
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 1 }}
                            onClick={() => addComponent('button')}
                        >
                            Add Button
                        </Button>
                        <Button variant="outlined" fullWidth onClick={() => addComponent('image')}>
                            Add Image
                        </Button>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={9}>
                    <StyledPaper>
                        <Typography variant="h6" gutterBottom>
                            Canvas
                        </Typography>
                        <ComponentBox ref={drop}>
                            {components.map(component => (
                                <DraggableComponent key={component.id} id={component.id}>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: component.left,
                                            top: component.top
                                        }}
                                    >
                                        {component.type === 'text' && (
                                            <Typography>Sample Text</Typography>
                                        )}
                                        {component.type === 'button' && (
                                            <Button variant="contained">Sample Button</Button>
                                        )}
                                        {component.type === 'image' && (
                                            <Box
                                                component="img"
                                                src="https://via.placeholder.com/150"
                                                alt="Sample Image"
                                            />
                                        )}
                                    </Box>
                                </DraggableComponent>
                            ))}
                        </ComponentBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Builder;
