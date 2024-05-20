import React from 'react';

const TransportationModal = ({ transportation, onClose, onSave }) => {
    const [editedTransportation, seteditedTransportation] = React.useState(transportation);

    const handleChange = (e) => {
        const { id, value } = e.target;
        seteditedTransportation((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(editedTransportation);
        onClose();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white/10 rounded-lg p-8 relative h-4/5 w-1/3 backdrop-blur-md shadow-lg font-itim text-3xl">
                <form className="grid grid-cols-3 gap-4">

                    {editedTransportation.ID !== '' && (
                        <>
                            <label className="col-span-1 text-black">ID:</label>
                            <input
                                className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3'
                                type="text"
                                id="ID"
                                defaultValue={editedTransportation.ID}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <label className="col-span-1 text-black">Name:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="Name"
                        defaultValue={editedTransportation.Name} onChange={handleChange} />

                    <label className="col-span-1 text-black">Start date:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="startDate"
                        defaultValue={editedTransportation.startDate} onChange={handleChange} />

                    <label className="col-span-1 text-black">End date:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="endDate"
                        defaultValue={editedTransportation.endDate} onChange={handleChange} />

                    <label className="col-span-1 text-black">Price:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="price"
                        defaultValue={editedTransportation.price} onChange={handleChange} />

                    <label className="col-span-1 text-black">Go from:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="goFrom"
                        defaultValue={editedTransportation.goFrom} onChange={handleChange} />

                    <label className="col-span-1 text-black">Arrive at:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="arriveAt"
                        defaultValue={editedTransportation.arriveAt} onChange={handleChange} />

                    <label className="col-span-1 text-black">Type:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="type"
                        defaultValue={editedTransportation.type} onChange={handleChange} />

                    <div className="col-span-3 flex justify-end gap-4">
                        <button
                            className="bg-green-500 text-white rounded-lg px-4 py-2"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 text-white rounded-lg px-4 py-2"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransportationModal;