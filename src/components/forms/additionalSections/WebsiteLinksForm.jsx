import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWebsiteLink, removeWebsiteLink } from '../../../redux/slices/resumeSlice';

const WebsiteLinksForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const websiteLinks = useSelector((state) => state.resume.additionalSections.websiteLinks);

  const [linkDetails, setLinkDetails] = useState({
    linkTitle: '',
    url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkDetails({
      ...linkDetails,
      [name]: value,
    });
  };

  const handleAddLink = () => {
    if (linkDetails.linkTitle && linkDetails.url) {
      dispatch(addWebsiteLink({ ...linkDetails }));
      setLinkDetails({
        linkTitle: '',
        url: '',
      });
    }
  };

  const handleDeleteLink = (index) => {
    dispatch(removeWebsiteLink(index));
  };

  return (
    <div className="website-links-form">
      <h2>Website Links</h2>
      <form>
        <div>
          <label htmlFor="linkTitle">Link Title</label>
          <input
            type="text"
            id="linkTitle"
            name="linkTitle"
            value={linkDetails.linkTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            value={linkDetails.url}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddLink}>
          Add Link
        </button>
      </form>
      <div>
        <h3>Current Website Links</h3>
        <ul>
          {websiteLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.linkTitle}
              </a>
              <button onClick={() => handleDeleteLink(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={onPrevious} className="btn btn-secondary">Previous</button>
        {onNext && <button onClick={onNext} className="btn btn-primary">Next</button>}
      </div>
    </div>
  );
};

export default WebsiteLinksForm;
