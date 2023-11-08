

export const reorderItemsDND = ({
                     items,
                     startIndex,
                     endIndex
                 }) => {
    const result = [...items];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


export const getDNDItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 16,
    margin: `0 0 16px 0`,
    borderRadius: 2,
    ...draggableStyle
});

