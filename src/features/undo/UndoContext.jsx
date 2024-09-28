import { createContext, useState, useContext } from 'react';

const UndoContext = createContext();

export const useUndo = () => useContext(UndoContext);

export const UndoProvider = ({ children }) => {
  const [undoVisible, setUndoVisible] = useState(false);
  const [undoData, setUndoData] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);

  const triggerUndo = (data, onConfirmDelete) => {
    setUndoData(data); // Store data to be undone
    setUndoVisible(true); // Show the undo button

    const timer = setTimeout(() => {
      setUndoVisible(false); // Hide undo button after timeout
      setUndoData(null); // Clear undo data after timeout
      onConfirmDelete(); // Call the actual delete confirm
    }, 5000); // 5-second timer

    setUndoTimer(timer);
  };

  const undoAction = (onUndo) => {
    clearTimeout(undoTimer); // Clear the timer
    onUndo(undoData); // Call undo handler
    setUndoVisible(false); // Hide undo button
    setUndoData(null); // Clear undo data
  };

  return (
    <UndoContext.Provider value={{ triggerUndo, undoAction, undoVisible }}>
      {children}
    </UndoContext.Provider>
  );
};
