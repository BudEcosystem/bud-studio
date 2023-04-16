import 'reactflow/dist/style.css';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background, Panel, ReactFlowProvider } from 'reactflow';
import ToolBar from './tool-bar';
import styles from './canvas.module.css'
import RectangleNode from './rectangle'

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = { rectangle: RectangleNode};

export default function Canvas(){
    const reactFlowWrapper = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    let id = 0;
    const getId = () => `bud_node_${id++}`;

    useEffect(() => {
        console.log(nodes)
    }, [nodes, edges])

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        console.log(type)

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
            return;
        }

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
    },[reactFlowInstance]);
      
    return (
        <ReactFlowProvider>
            <div style={{ width: '100%', height: '100vh' }} ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                >
                    {/* <Controls /> */}
                    <Background variant="dots" color='#555555' />
                    <Panel position='bottom-right' className={styles.toolPanel}>
                        <ToolBar></ToolBar>
                    </Panel>
                </ReactFlow>
            </div>
        </ReactFlowProvider>
        
    )
}