const FilterButton: React.FC<{
  button: { id: number; label: string };
  isActive: boolean;
  onClick: (id: number) => void;
  classes: {
    chosen: string;
    button: string;
  };
}> = (props) => {
  return (
    <button
      key={props.button.id}
      onClick={() => props.onClick(props.button.id)}
      className={props.isActive ? props.classes.chosen : props.classes.button}
    >
      {props.button.label}
    </button>
  );
};

export default FilterButton;
