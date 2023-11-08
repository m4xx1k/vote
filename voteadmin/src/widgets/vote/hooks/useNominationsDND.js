import {useEffect, useState} from "react";
import {reorderItemsDND} from "@/shared/utils/dnd.utils";
import {fetchAllNominations} from "@/shared/api/nominations.api";


export const useNominationsDND = (cb = console.log) => {
    const [items, setItems] = useState([])
    useEffect(() => {
        const getData = async () => {
            const data = await fetchAllNominations()
            console.log({items:data})
            setItems(data.map(n => ({...n, id: n._id})))
        }
        getData()

    }, [])
    const onDragEnd = async ({source, destination}) => {
        if (!destination) {
            return;
        }
        const newItems = reorderItemsDND({
                items,
                startIndex: source.index,
                endIndex: destination.index
            }
        );
        setItems(newItems);
        const data = {
            id: items[source.index]._id,
            sourceOrder: items[source.index].order,
            destinationOrder: items[destination.index].order
        }
        console.log(data)
        const res = await cb(data)
        console.log(res)
    }
    return {items, onDragEnd}
}
