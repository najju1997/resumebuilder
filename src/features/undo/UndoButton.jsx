// UndoButton.js
import { useUndo } from './UndoContext';

const UndoButton = ({ onUndo }) => {
  const { undoAction, undoVisible } = useUndo();

  if (!undoVisible) return null;

  return (
    <div className="undo-button bg-yellow-100 border border-yellow-400 p-2 rounded-md text-yellow-800">
      <p>Action will be confirmed in 5 seconds.</p>
      <button
        onClick={() => undoAction(onUndo)}
        className="text-blue-500 hover:text-blue-700 ml-2"
      >
        Undo
      </button>
    </div>
  );
};

export default UndoButton;
