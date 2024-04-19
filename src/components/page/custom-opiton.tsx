const CustomSelectOption = (props) => {
    return (
      <components.Option {...props}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={props.data.iconPath} 
            alt={props.data.label} 
            style={{ marginRight: 10, width: 20, height: 20 }} 
          />
          {props.data.label}
        </div>
      </components.Option>
    );
  };
  