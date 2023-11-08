'use client'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useNominationsDND} from "@/widgets/vote/hooks/useNominationsDND";
import {getDNDItemStyle} from "@/shared/utils/dnd.utils";
import {updateNominationOrder} from "@/shared/api/nominations.api";

const NominationsDnd = () => {
    const {onDragEnd, items} = useNominationsDND(updateNominationOrder)
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={'p-4'}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getDNDItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                        className={`${snapshot.isDragging ? 'bg-blue-600' : 'border-2 border-blue-600'}`}
                                    >
                                        {item.ru.name}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    );
};

export default NominationsDnd;
