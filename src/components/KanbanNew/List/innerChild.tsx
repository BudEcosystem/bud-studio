function ChildELement(props: any) {
  const { quote, isDragging, isGroupedOver, provided, style, isClone, index } =
    props;
  return (
    <div
      style={{
        width: '90%',
        height: '100px',
        background: 'red',
        margin: '10px',
      }}
      data-isGroupedOver={isGroupedOver}
      data-is-dragging={isDragging}
      data-isDragging={isDragging}
      ref={provided?.innerRef}
    >
      Hello there
    </div>
  );
}
export default ChildELement;
