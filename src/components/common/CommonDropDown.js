import Dropdown from 'react-bootstrap/Dropdown';

function CommonDropDown({childElement,optionList}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {childElement}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {optionList.map((option, index) => (
          <Dropdown.Item key={index} onClick={option.action}>{option.title}</Dropdown.Item>
        ))}
        
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CommonDropDown;