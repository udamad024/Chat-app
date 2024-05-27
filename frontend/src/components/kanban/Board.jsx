// src/components/kanban/Board.jsx

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Card from "./Card"; // Import the Card component

export default function Board() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
    const [newCardTitle, setNewCardTitle] = useState("");

    // Load state from localStorage
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem("boardState"));
        if (savedState) {
            setCompleted(savedState.completed || []);
            setIncomplete(savedState.incomplete || []);
            setBacklog(savedState.backlog || []);
            setInReview(savedState.inReview || []);
        }
    }, []);

    // Save state to localStorage
    useEffect(() => {
        const boardState = { completed, incomplete, backlog, inReview };
        localStorage.setItem("boardState", JSON.stringify(boardState));
    }, [completed, incomplete, backlog, inReview]);

    const handleAddCard = () => {
        if (newCardTitle.trim()) {
            const newCard = { id: Date.now(), title: newCardTitle, completed: false };
            setIncomplete([newCard, ...incomplete]);
            setNewCardTitle("");
        }
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        setNewState(destination.droppableId, task);
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
        }
    }

    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, completed: false };
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "2":  // DONE
                updatedTask = { ...task, completed: true };
                setCompleted([updatedTask, ...completed]);
                break;
            case "3":  // IN REVIEW
                updatedTask = { ...task, completed: false };
                setInReview([updatedTask, ...inReview]);
                break;
            case "4":  // BACKLOG
                updatedTask = { ...task, completed: false };
                setBacklog([updatedTask, ...backlog]);
                break;
        }
    }

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                >
                    <Column title={"TO DO"} tasks={incomplete} id={"1"}>
                        <div style={{ padding: "10px" }}>
                            <Card isForm>
                                <input
                                    type="text"
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                    placeholder="New card title"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        marginBottom: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ccc"
                                    }}
                                />
                                <button onClick={handleAddCard} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "lightblue", border: "none", cursor: "pointer" }}>
                                    Add Card
                                </button>
                            </Card>
                        </div>
                    </Column>
                    <Column title={"IN PROGRESS"} tasks={inReview} id={"3"} />
                    <Column title={"DONE"} tasks={completed} id={"2"} />
                    <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
                </div>
            </DragDropContext>
        </div>
    );
}
