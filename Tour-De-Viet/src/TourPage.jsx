import React, { useState, useEffect } from 'react';
import bg from './assets/Background/TourPage_bg.png';
import Slider from 'react-slider'
import './TourPage.css'
import { Link, useParams } from 'react-router-dom'
import ToursService from '../server/TourService';

const MIN = 500000;
const MAX = 20000000;

export default function TourPage() {
    const { current_id } = useParams();
    const [tourList, SetTourList] = useState([]);
    const [values, setValue] = useState([MIN, MAX]); //price
    const [selectedTransportationValues, setSelectedTransportationValues] = useState([]); // transportation
    const [selectedValues, setSelectedValues] = useState([]); // category
    const [filterTour, setFilterTour] = useState([]);

    const filterObjects = (tourList, selectedValues, selectedTransportationValues, values) => {
        return tourList.filter(tour => {
            const meetsSelectedValues = selectedValues.length === 0 ||
                (selectedValues.length === 1 && selectedValues[0] === "All") ||
                (selectedValues.includes(tour.description.Type));

            const meetsTransportationValues = selectedTransportationValues.length === 0 ||
                (selectedTransportationValues.length === 1 && selectedTransportationValues[0] === "All") ||
                (selectedTransportationValues.includes(tour.transport));

            const meetsPriceValue = values === null || (tour.price <= values[1] && tour.price >= values[0]);

            return meetsSelectedValues && meetsTransportationValues && meetsPriceValue;
        });
    };

    useEffect(() => {
        const fetchAllTour = async () => {
            try {
                const service = new ToursService();
                const response = await service.fetchAllTour(current_id);
                const parsedResponse = response.map(item => {
                    const parsedDescription = JSON.parse(item.description);
                    return { ...item, description: parsedDescription };
                });
                SetTourList(parsedResponse);
                const tmpFilterTour = filterObjects(parsedResponse, selectedValues, selectedTransportationValues, values);
                setFilterTour(tmpFilterTour);


            } catch (error) {
                console.error("Error fetching tours", error);
            }
        };

        fetchAllTour();

    }, []);

<<<<<<< Updated upstream
    function handleCheckboxSelection(event) {
        const labelText = event.target.parentNode.textContent.trim();
        console.log("Selected label:", labelText);
        if (labelText !== 'All' && document.getElementById('all').checked) {
            document.getElementById('all').checked = false;
        }
        const value = event.target.value;

        // Create a copy of selectedValues
        let updatedSelectedValues = [...selectedValues];

        if (event.target.checked) {
            updatedSelectedValues.push(value);
        } else {
            updatedSelectedValues = updatedSelectedValues.filter(item => item !== value);
        }
        console.log(updatedSelectedValues);

        // Update selectedValues using the setter function
        setSelectedValues(updatedSelectedValues);

        // Filter the tour list based on updated selectedValues and selectedTransportationValues
        const tmpFilterTour = filterObjects(tourList, updatedSelectedValues, selectedTransportationValues, values);
        setFilterTour(tmpFilterTour);
    }


=======
>>>>>>> Stashed changes
    function handleAllSelection(event) {
        const value = event.target.value;
        if (value === 'All' && event.target.checked) {
            // If "All" checkbox is checked, uncheck all other checkboxes
            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="test"]');
            checkboxes.forEach(checkbox => {
                if (checkbox !== event.target) {
                    checkbox.checked = false;
                }
            });
        } else {
            // If any other checkbox is checked, check the "All" checkbox
            const allCheckbox = document.querySelector('input[type="checkbox"][name="test"][value="All"]');
            if (allCheckbox) {
                const checkboxes = document.querySelectorAll('input[type="checkbox"][name="test"]:checked');
                const allChecked = checkboxes.length === document.querySelectorAll('input[type="checkbox"][name="test"]').length;
                allCheckbox.checked = allChecked;
            }
        }
        
        // Update selectedValues using the setter function
        const selectedValues = event.target.checked ? [value] : [];
        setSelectedValues(selectedValues);
    
        // Filter the tour list based on updated selectedValues and selectedTransportationValues
        const tmpFilterTour = filterObjects(tourList, selectedValues, selectedTransportationValues, values);
        setFilterTour(tmpFilterTour);
    }
    
    function handleCheckboxSelection(event) {
        const labelText = event.target.parentNode.textContent.trim();
        console.log("Selected label:", labelText);
    
        // Create a copy of selectedValues
        let updatedSelectedValues = [...selectedValues];
        const value = event.target.value;
    
        if (event.target.checked) {
            updatedSelectedValues.push(value);
        } else {
            updatedSelectedValues = updatedSelectedValues.filter(item => item !== value);
        }
        console.log(updatedSelectedValues);
    
        // Update selectedValues using the setter function
        setSelectedValues(updatedSelectedValues);
    
        // If any other checkbox is unchecked, uncheck the "All" checkbox
        if (event.target.value !== 'All') {
            const allCheckbox = document.getElementById('all');
            allCheckbox.checked = false;
        }
    
        // Check if all options beside "All" are checked
        const allOthersChecked = [...document.querySelectorAll('input[type="checkbox"][name="test"]')]
            .filter(checkbox => checkbox.value !== 'All')
            .every(checkbox => checkbox.checked);
    
        // If all options beside "All" are checked, uncheck all others and check the "All" checkbox
        if (allOthersChecked) {
            const allCheckbox = document.getElementById('all');
            allCheckbox.checked = true;
    
            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="test"]');
            checkboxes.forEach(checkbox => {
                if (checkbox !== allCheckbox) {
                    checkbox.checked = false;
                }
            });
        }
    
        // Filter the tour list based on updated selectedValues and selectedTransportationValues
        const tmpFilterTour = filterObjects(tourList, updatedSelectedValues, selectedTransportationValues, values);
        setFilterTour(tmpFilterTour);
    }
    
    
    
    
    // Check if all checkboxes are unchecked and update "All" accordingly
    function checkAllUnchecked() {
        const allCheckbox = document.getElementById('all');
        const allUnchecked = ![...document.querySelectorAll('input[type="checkbox"][name="test"]')]
            .some(checkbox => checkbox.checked);
        allCheckbox.checked = allUnchecked;

        // If all checkboxes are unchecked, check the "All" checkbox
        if (allUnchecked) {
            allCheckbox.checked = true;
        }
    }

    
    // Attach event listener to all checkboxes to call checkAllUnchecked function
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="test"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkAllUnchecked);
    });
    


    function handleAllTransportationSelection(event) {
        const value = event.target.value;
        if (event.target.checked) {
            const checkboxes = document.querySelectorAll('input[type="checkbox"][name="testTransportation"]');
            checkboxes.forEach(checkbox => {
                if (checkbox !== event.target) {
                    checkbox.checked = false;
                }
            });
            // Update selectedTransportationValues using the setter function
            setSelectedTransportationValues([value]);
        } else {
            // Update selectedTransportationValues using the setter function
            setSelectedTransportationValues([]);
        }

        // Filter the tour list based on updated selectedTransportationValues
        const tmpFilterTour = filterObjects(tourList, selectedValues, selectedTransportationValues, values);
        setFilterTour(tmpFilterTour);
    }


    function handleTransportationCheckboxSelection(event) {
        const labelText = event.target.parentNode.textContent.trim();
        console.log("Selected transportation:", labelText);

        if (labelText !== 'All' && document.getElementById('allTransportation').checked) {
            document.getElementById('allTransportation').checked = false;
        }
        const value = event.target.value;
        let updatedTransportationValues = [...selectedTransportationValues]; // Create a copy of selectedTransportationValues

        if (event.target.checked) {
            updatedTransportationValues.push(value);
        } else {
            updatedTransportationValues = updatedTransportationValues.filter(item => item !== value);
        }
        console.log(updatedTransportationValues);

        // Update selectedTransportationValues using the setter function
        setSelectedTransportationValues(updatedTransportationValues);

        // Filter the tour list based on updated selectedTransportationValues
        const tmpFilterTour = filterObjects(tourList, selectedValues, updatedTransportationValues, values);
        setFilterTour(tmpFilterTour);
    }

    const handleSlider = (newValue) => {
        // newValue is an array containing the new range values selected by the slider
        setValue(newValue); // Assuming setValue is the function to update the slider values
        const tmpFilterTour = filterObjects(tourList, selectedValues, selectedValues, values);
        setFilterTour(tmpFilterTour);
    };


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
                                    value={values} min={MIN} max={MAX} onChange={handleSlider} />
                            </div>
                        </div>
                    </div>
                    <div className='cateogry bg-dark-green w-3/5 h-72 mt-4 ml-64 mr-2 rounded-[20px] font-itim'>
                        <div className='ml-6 pt-3'>
                            <h2 className='font-semibold text-xl ml-6 pt-2 pb-2' >Category</h2>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' id='all' name='test' onChange={handleAllSelection} style={{ display: 'none' }} value='All' defaultChecked /> <span className='circle'></span> All
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }} value='Tourism location' /> <span className='circle'></span> Tourism location
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }} value='Entertainment location' /> <span className='circle'></span> Entertainment location
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }} value='Spa' /> <span className='circle'></span> Spa
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }} value='Sporting activity' /> <span className='circle'></span> Sporting activity
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='test' onChange={handleCheckboxSelection} style={{ display: 'none' }} value='Culinary' /> <span className='circle'></span> Culinary
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='transportation bg-dark-green w-3/5 h-72 mt-4 ml-64 mr-2 rounded-[20px] font-itim'>
                        <div className='ml-6 pt-3'>
                            <h2 className='font-semibold text-xl ml-6 pt-2 pb-2' >Transportation</h2>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' id='allTransportation' name='testTransportation' onChange={handleAllTransportationSelection} style={{ display: 'none' }} value='All' defaultChecked /> <span className='circle'></span> All
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='testTransportation' onChange={handleTransportationCheckboxSelection} style={{ display: 'none' }} value='Train' /> <span className='circle'></span> Train
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='testTransportation' onChange={handleTransportationCheckboxSelection} style={{ display: 'none' }} value='Plane' /> <span className='circle'></span> Airline
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='testTransportation' onChange={handleTransportationCheckboxSelection} style={{ display: 'none' }} value='Bus' /> <span className='circle'></span> Guest bus
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='testTransportation' onChange={handleTransportationCheckboxSelection} style={{ display: 'none' }} value='Boat' /> <span className='circle'></span> Boat
                                </label>
                            </div>
                            <div>
                                <label className='sidebar-label'>
                                    <input type='checkbox' name='testTransportation' onChange={handleTransportationCheckboxSelection} style={{ display: 'none' }} value='None' /> <span className='circle'></span> None
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='w-2/3 mt-28 ml-10 justify overflow-y-auto ' style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none' }}>
                    {filterTour.map((tourData, index) => (
                        <Link to={`/tourpage/${tourData.townID}/${tourData.tourName}`} key={index} className=''>
                            <div key={index} className='bg-light-green w-3/4 h-64 mt-6 rounded-[20px] flex'>
                                <div className='w-2/5 bg-slate-700 h-full rounded-[20px]'></div>
                                <div className='w-3/5 h-full'>
                                    <div className='text-4xl font-itim font-semibold mt-6 ml-6 h-auto'>{tourData.tourName}</div>
                                    <div className='text-2xl font-itim mt-3 ml-6 h-auto'>{tourData.description.Type}</div>
                                    <div className='text-2xl font-itim mt-3 ml-6 h-auto'>{tourData.totalTime}</div>
                                    <div className='text-2xl font-itim mt-3 ml-6 h-auto'>{tourData.transport}</div>
                                    <div className='text-2xl font-itim mt-3 ml-6 h-auto grid-cols-2 gap-4 flex justify-between'>
                                        <div>{tourData.avg_rating !== null ? tourData.avg_rating : "N/A"}</div>
                                        <div className='mr-5'>{tourData.price}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
