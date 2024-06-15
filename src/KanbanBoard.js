import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import React, { useEffect, useRef, useState } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
    const containersRef = useRef([]);
    const [tasks, setTasks] = useState({
        'To Do': [],
        'In Progress': [],
        'Complete': [],
    });
    const [newTask, setNewTask] = useState({ lane: 'To Do', title: '', details: '' });

    useEffect(() => {
        dragula(containersRef.current);
    }, []);

    const addTask = () => {
        if (newTask.title.trim() === '' || newTask.details.trim() === '') {
            alert('Please enter both task name and details.');
            return;
        }
        setTasks((prevTasks) => ({
            ...prevTasks,
            [newTask.lane]: [...prevTasks[newTask.lane], { title: newTask.title, details: newTask.details }],
        }));
        setNewTask({ lane: 'To Do', title: '', details: '' });
    };

    return (
        <div>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Task Details"
                    value={newTask.details}
                    onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
                />
                <select
                    value={newTask.lane}
                    onChange={(e) => setNewTask({ ...newTask, lane: e.target.value })}
                >
                    {['To Do', 'In Progress', 'Complete'].map((lane) => (
                        <option key={lane} value={lane}>{lane}</option>
                    ))}
                </select>
                <button onClick={addTask}>Add Task</button>
            </div>

            <div className="kanban-board">
                {['To Do', 'In Progress', 'Complete'].map((lane, index) => (
                    <div key={lane} className="kanban-lane" ref={(el) => (containersRef.current[index] = el)}>
                        <h3>{lane}</h3>
                        {tasks[lane].map((task, taskIndex) => (
                            <div className="kanban-task" key={`task-${lane}-${taskIndex}`}>
                                <h4>{task.title}</h4>
                                <p>{task.details}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
