import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-xl mb-4 text-black ">Are you sure you want to delete?</h2>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
