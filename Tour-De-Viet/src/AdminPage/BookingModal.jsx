import React from 'react';

const BookingModal = ({ booking, onClose, onSave }) => {
    const [editedBooking, setEditedBooking] = React.useState(booking);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditedBooking((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        onSave(editedBooking);
        onClose();
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white/10 rounded-lg p-8 relative h-4/5 w-1/3 backdrop-blur-md shadow-lg font-itim text-3xl">
                <h2 className=" text-4xl font-bold mb-4 text-black">Edit Booking</h2>
                <form className="grid grid-cols-3 gap-4" onSubmit={(e) => e.preventDefault()}>
                    <label className="col-span-1 text-black">Town ID:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="townID" 
                    defaultValue={editedBooking.townID} onChange={handleChange} />

                    <label className="col-span-1 text-black">Tour name:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="tourName" 
                    defaultValue={editedBooking.tourName} onChange={handleChange} />

                    <label className="col-span-1 text-black">Description:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="description" 
                    defaultValue={editedBooking.description} onChange={handleChange} />

                    <label className="col-span-1 text-black">Category:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="category" 
                    defaultValue={editedBooking.category} onChange={handleChange} />

                    <label className="col-span-1 text-black">Start date:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="startDate" 
                    defaultValue={editedBooking.startDate} onChange={handleChange} />

                    <label className="col-span-1 text-black">End date:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="endDate" 
                    defaultValue={editedBooking.endDate} onChange={handleChange} />

                    <label className="col-span-1 text-black">Price:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="price" 
                    defaultValue={editedBooking.price} onChange={handleChange} />

                    <label className="col-span-1 text-black">Transportation ID:</label>
                    <input className='bg-white text-black h-12 rounded-lg shadow-lg col-span-2 mr-7 pl-3' type="text" id="transportationID" 
                    defaultValue={editedBooking.transportationID} onChange={handleChange} />

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

export default BookingModal;