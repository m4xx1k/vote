'use client'


const Select = ({items, selectProps}) => {
  return (
	<select
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			{...selectProps}>
		{items.map(item=>
			<option key={item._id} value={item._id}>{item.name}</option>)}
	</select>
  )
}

export default Select
