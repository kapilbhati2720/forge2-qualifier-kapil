import { useState, useEffect } from "react";

const API = "http://127.0.0.1:8000/api";

export default function App() {
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [newListTitle, setNewListTitle] = useState("");
  const [newCardTitles, setNewCardTitles] = useState({});

  useEffect(() => {
    fetch(`${API}/boards`)
      .then(r => r.json())
      .then(data => setBoards(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (activeBoard) {
      fetch(`${API}/boards/${activeBoard.id}/lists`)
        .then(r => r.json())
        .then(setLists);
    }
  }, [activeBoard]);

  const createBoard = async () => {
    if (!newBoardName.trim()) return;
    const res = await fetch(`${API}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newBoardName, slug: newBoardName.toLowerCase().replace(/\s+/g, "-") })
    });
    const board = await res.json();
    setBoards([...boards, board]);
    setNewBoardName("");
  };

  const createList = async () => {
    if (!newListTitle.trim() || !activeBoard) return;
    const res = await fetch(`${API}/boards/${activeBoard.id}/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newListTitle, order_index: lists.length })
    });
    const list = await res.json();
    setLists([...lists, { ...list, cards: [] }]);
    setNewListTitle("");
  };

  const createCard = async (listId) => {
    const title = newCardTitles[listId];
    if (!title?.trim()) return;
    const res = await fetch(`${API}/lists/${listId}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, position: 0 })
    });
    const card = await res.json();
    setLists(lists.map(l => l.id === listId ? { ...l, cards: [...(l.cards || []), card] } : l));
    setNewCardTitles({ ...newCardTitles, [listId]: "" });
  };

  const moveCard = async (card, fromListId, toListId) => {
    await fetch(`${API}/cards/${card.id}/move`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ list_id: toListId })
    });
    setLists(lists.map(l => {
      if (l.id === fromListId) return { ...l, cards: l.cards.filter(c => c.id !== card.id) };
      if (l.id === toListId) return { ...l, cards: [...(l.cards || []), card] };
      return l;
    }));
  };

  const isOverdue = (due) => due && new Date(due) < new Date();

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20, background: "#0079BF", minHeight: "100vh" }}>
      <h1 style={{ color: "white", marginBottom: 20 }}>🦞 Kanban Board</h1>

      {!activeBoard ? (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)}
              placeholder="New board name..." style={{ padding: "8px 12px", borderRadius: 4, border: "none", fontSize: 14 }} />
            <button onClick={createBoard}
              style={{ padding: "8px 16px", background: "#026AA7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Create Board
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {boards.map(b => (
              <div key={b.id} onClick={() => setActiveBoard(b)}
                style={{ background: b.color || "#026AA7", color: "white", padding: "20px 24px", borderRadius: 8, cursor: "pointer", minWidth: 160, fontWeight: 600 }}>
                {b.name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setActiveBoard(null)}
            style={{ marginBottom: 16, padding: "6px 12px", background: "rgba(255,255,255,0.2)", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
            ← All Boards
          </button>
          <h2 style={{ color: "white", marginBottom: 16 }}>{activeBoard.name}</h2>

          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", overflowX: "auto" }}>
            {lists.map(list => (
              <div key={list.id} style={{ background: "#EBECF0", borderRadius: 8, padding: 12, minWidth: 240, maxWidth: 240 }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>{list.title}</h3>
                {(list.cards || []).map(card => (
                  <div key={card.id} style={{
                    background: "white", borderRadius: 4, padding: "8px 10px", marginBottom: 8,
                    borderLeft: isOverdue(card.due_date) ? "4px solid #EB5A46" : "4px solid transparent"
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{card.title}</div>
                    {card.due_date && (
                      <div style={{ fontSize: 11, color: isOverdue(card.due_date) ? "#EB5A46" : "#5E6C84", marginTop: 4 }}>
                        📅 {card.due_date} {isOverdue(card.due_date) && "⚠ Overdue"}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                      {lists.filter(l => l.id !== list.id).map(l => (
                        <button key={l.id} onClick={() => moveCard(card, list.id, l.id)}
                          style={{ fontSize: 10, padding: "2px 6px", background: "#0079BF", color: "white", border: "none", borderRadius: 3, cursor: "pointer" }}>
                          → {l.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <input value={newCardTitles[list.id] || ""} onChange={e => setNewCardTitles({ ...newCardTitles, [list.id]: e.target.value })}
                  placeholder="Add card..." style={{ width: "100%", padding: "6px 8px", borderRadius: 4, border: "1px solid #ddd", fontSize: 12, marginTop: 4, boxSizing: "border-box" }} />
                <button onClick={() => createCard(list.id)}
                  style={{ width: "100%", marginTop: 6, padding: "6px", background: "#0079BF", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>
                  + Add Card
                </button>
              </div>
            ))}

            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: 12, minWidth: 240 }}>
              <input value={newListTitle} onChange={e => setNewListTitle(e.target.value)}
                placeholder="New list title..." style={{ width: "100%", padding: "6px 8px", borderRadius: 4, border: "none", fontSize: 13, boxSizing: "border-box" }} />
              <button onClick={createList}
                style={{ width: "100%", marginTop: 8, padding: "6px", background: "#026AA7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
                + Add List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}