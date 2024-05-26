import React, { useState } from "react";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

const initialBoard = {
  columns: [
    {
      id: 1,
      title: "Open",
      backgroundColor: "#fff",
      cards: [
        {
          id: 1,
          title: "DF-22110005",
          description: (
            <div>
              <label className="description-text">Unit No :10/100</label> <br />
              <label className="description-text">
                ชื่อลูกค้า : นายไอคอน เฟรมเวิร์ค
              </label>
              <br />
              <label className="description-text">
                วันที่แจ้งเคส : 11/11/2022
              </label>
              <br />
              <label className="description-text">
                ผู้ดูแลเคส : นายเฟรมเวิร์ค ไอคอน
              </label>
              <br />
              <label className="description-text" style={{ color: "red" }}>
                SLA : 5 Days (OverDue)
              </label>
              <br />
            </div>
          )
        },
        {
          id: 2,
          title: "DF-22110009",
          description: (
            <div>
              <label className="description-text">Unit No :10/100</label> <br />
              <label className="description-text">
                ชื่อลูกค้า : นายไอคอน เฟรมเวิร์ค
              </label>
              <br />
              <label className="description-text">
                วันที่แจ้งเคส : 16/12/2022
              </label>
              <br />
              <label className="description-text">
                ผู้ดูแลเคส : นายเฟรมเวิร์ค ไอคอน
              </label>
              <br />
              <label className="description-text" style={{ color: "red" }}>
                SLA : 7 Days (OverDue)
              </label>
              <br />
            </div>
          )
        }
      ]
    },
    {
      id: 2,
      title: "InProgress",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Cancel",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "In Complete",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};

export function ControlledBoard() {
    const [board, setBoard] = useState(initialBoard);
  
    function handleCardMove(_card, source, destination) {
      const updatedBoard = moveCard(board, source, destination);
      setBoard(updatedBoard);
    }
  
    function handleNewCard(newCard, laneId) {
      const updatedBoard = {
        ...board,
        columns: board.columns.map(column => {
          if (column.id === laneId) {
            return {
              ...column,
              cards: [...column.cards, newCard]
            };
          }
          return column;
        })
      };
      setBoard(updatedBoard);
    }
  
    return (
      <Board
        onCardDragEnd={handleCardMove}
        disableColumnDrag
        allowAddCard={{ on: "top", handleAdd: handleNewCard }}
      >
        {board}
      </Board>
    );
  }
  
