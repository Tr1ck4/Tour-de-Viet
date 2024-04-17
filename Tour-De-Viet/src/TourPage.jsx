import React, { useState, useEffect } from 'react';
import bg from './assets/Background/TourPage_bg.png';
import Slider from 'react-slider'
import './TourPage.css'
import axios from 'axios';

const MIN = 500000;
const MAX = 20000000;

export default function TourPage() {
    const [values, setValue] = useState([MIN, MAX]);
    const [tourList, SetTourList] = useState([]);
    useEffect(() => {
        const fetchAllTour = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/tours");
                SetTourList(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching tours", error);
                // Handle the error as needed
            }
        };

        fetchAllTour();

    }, []);

    // Initialize an empty array to store selected values
let selectedValues = [];

// Function to handle checkbox selection
function handleCheckboxSelection(event) {
    const labelText = event.target.parentNode.textContent.trim();
    console.log("Selected label:", labelText);

    // If the "All" checkbox is checked and another checkbox is checked, uncheck the "All" checkbox
    if (labelText !== 'All' && document.getElementById('all').checked) {
        document.getElementById('all').checked = false;
    }
    
    const value = event.target.value;
    
    if (event.target.checked) {
        selectedValues.push(value); // Add value to selected values if checkbox is checked
    } else {
        selectedValues = selectedValues.filter(item => item !== value); // Remove value from selected values if checkbox is unchecked
    }

    // Log the selected values (you can replace this with your own logic)
    console.log(selectedValues);
}

// Function to handle selecting "All" checkbox
function handleAllSelection(event) {
    const value = event.target.value;

    // If "All" checkbox is checked, uncheck all other checkboxes
    if (event.target.checked) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="test"]');
        checkboxes.forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
        selectedValues = [value]; // Update selected values with only "All"
    } else {
        selectedValues = []; // Empty selected values if "All" is unchecked
    }

    // Log the selected values (you can replace this with your own logic)
    console.log(selectedValues);
}



    

    
    return (
        <>
            <main className='bg-fixed bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                <div className='w-1/3  mt-28 mr-4 justify '>
                    <div className='price bg-dark-green w-3/5 h-auto ml-64 mr-2  rounded-[20px] '>
                    {/* price range */}
                        <div className='font-itim font-semibold text-xl ml-6 pt-2 pb-2 '>Price range</div>
                        <div className='grid-row-2 items-center justify-center text-center'>
                            <div className={"value font-itim text-xl justify-s"}>${values[0]} - ${values[1]}</div>
                            <div className='flex items-center justify-center pb-4'>
                                <Slider className='slider'
                                    value={values} min={MIN} max={MAX} onChange={setValue} />
                            </div>
                        </div>
                    </div>
                    <div className='cateogry bg-dark-green w-3/5 h-72 mt-4 ml-64 mr-2 rounded-[20px] font-itim'>
                        <div className='ml-6 pt-3'>
                        <h2 className='font-semibold text-xl ml-6 pt-2 pb-2' >Category</h2>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' id='all' name='test' onChange={handleAllSelection} style={{ display: 'none' }} defaultChecked /> <span className='circle'></span> All
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Tourism location
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Entertainment location
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Spa
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Sporting activity
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Culinary
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className='transportation bg-dark-green w-3/5 h-72 mt-4 ml-64 mr-2 rounded-[20px] font-itim'>
                    <div className='ml-6 pt-3'>
                        <h2 className='font-semibold text-xl ml-6 pt-2 pb-2' >Transportation</h2>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' id='all' name='test' onChange={handleAllSelection} style={{ display: 'none' }} defaultChecked /> <span className='circle'></span> All
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Train
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Airline
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Guess bus
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> Boat
                            </label>
                        </div>
                        <div>
                            <label className='sidebar-label'>
                                <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }}/> <span className='circle'></span> None
                            </label>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='w-2/3 mt-28 ml-10 justify overflow-y-auto ' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                    {tourList.map((tourData, index) => (
                        <div key={index} className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px] flex'>
                            <div className='w-2/5 bg-slate-700 h-full rounded-[20px]'></div>
                            <div className='w-3/5 h-full'>
                                <div className='text-4xl font-itim font-semibold mt-6 ml-6 h-auto'>{tourData.townID}</div>
                                <div className='text-2xl font-itim mt-12 ml-6 h-auto'>{tourData.totalTime}</div>
                                <div className='text-2xl font-itim mt-3 ml-6 h-auto'>{tourData.transport}</div>
                                <div className='text-2xl font-itim mt-3 ml-6 h-auto grid-cols-2 gap-4 flex justify-between'>
                                    <div>{tourData.avg_rating !== null ? tourData.avg_rating : "N/A"}</div>
                                    <div className='mr-5'>{tourData.price}</div>
                                </div>
                            </div>
                        </div>
                ))}
                </div>
            </main>
            {/* <ul>
                {tourList.map((tourData, index) => (
                    <li key={index}>
                        <p>Town ID: {tourData.townID}</p>
                        <p>Total Time: {tourData.totalTime}</p>
                        <p>Transport: {tourData.transport}</p>
                        <p>Price: {tourData.price}</p>
                        <p>Average Rating: {tourData.avg_rating !== null ? tourData.avg_rating : "N/A"}</p>
                    </li>
                ))}
            </ul> */}
        </>
    );
}
