
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const progress = useSelector((state) => state.ui.progress);

  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
