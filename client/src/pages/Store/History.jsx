import React, { useEffect, useState } from "react";
import { getAllUpdatedEquipment, getAllUpdatedMaterials, searchUpdatedMaterial} from "../../services/StoreServices";
import { useNavigate } from "react-router-dom";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import MaterialHistoryComponent from "../../components/Store/materialHistoryComponent";
import EquipmentHistoryComponent from "../../components/Store/EquipmentHistoryComponent";

function History({ selectedAction, startDate, endDate }) {

    const [open, setOpen] = useState(true);
    const [updatedMaterial, setUpdatedMaterial] = useState([]);
    const [updatedEquipment, setUpdatedEquipment] = useState([]);
    const [activeTab, setActiveTab] = useState('material'); // State to manage active tab
    const [searchMaterial, setSearchMaterial] = useState("");
    const [searchEquipment, setSearchEquipment] = useState("");
    const [filteredMaterial, setFilteredMaterial] = useState([]); // State to manage filtered material
    const [value, setValue] = useState({ 

        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
        
        }); 

    const navigator = useNavigate();
    const givenProjectId = 3;

    // Pagination for updated material table
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = updatedMaterial.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(updatedMaterial.length / recordsPerPage);

    // Pagination for updated equipment table
    const [eCurrentPage, setECurrentPage] = useState(1);
    const eRecordsPerPage = 5;
    const eLastIndex = eCurrentPage * eRecordsPerPage;
    const eFirstIndex = eLastIndex - eRecordsPerPage;
    const eRecords = updatedEquipment.slice(eFirstIndex, eLastIndex);
    const eNumberOfPages = Math.ceil(updatedEquipment.length / eRecordsPerPage);

    // const [action, setAction] = useState('All History');
    // const [filteredRecords, setFilteredRecords] = useState(records);
    // const [showDatePicker, setShowDatePicker] = useState(false);

    // Get all updated materials and sort by date
    // useEffect(() => {
    //     getAllUpdatedMaterials(givenProjectId).then((response) => {
    //         const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
    //         setUpdatedMaterial(sortedMaterial);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }, []);

    useEffect(() => {
        if(selectedAction === "All History"){
        getAllUpdatedMaterials(givenProjectId).then((response) => {
            const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            setUpdatedMaterial(sortedMaterial);
        }).catch(error => {
            console.error(error);
        })
    } else{
        getAllUpdatedMaterials(givenProjectId).then((response) => {
            const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            setUpdatedMaterial(sortedMaterial);

            
                const filtered = updatedMaterial.filter(updatedMaterial => {
                    const recordDate = new Date(updatedMaterial.updatedDate);
                    return recordDate >= startDate && recordDate <= endDate;
                });
                setUpdatedMaterial(filtered);
          
        }).catch(error => {
            console.error(error);
        })
    }
    }, []);

    // Get all updated equipment and sort by date
    useEffect(() => {
        getAllUpdatedEquipment(givenProjectId).then((response) => {
            const sortedEquipment = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            setUpdatedEquipment(sortedEquipment);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    //Search updated materials
    useEffect(() => {
        if (searchMaterial !== "") {
            searchUpdatedMaterial(givenProjectId, searchMaterial).then(response => {
                const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
                setUpdatedMaterial(sortedMaterial);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        } else {
            //if search bar is empty, get all materials
            getAllUpdatedMaterials(givenProjectId).then(response => {
                const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
                setUpdatedMaterial(sortedMaterial);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }
    }, [searchMaterial]);

    // //Filter updated materials by date
    // useEffect(() => {
        
    // },[filteredMaterial]);

    // Pagination for updated equipment table
    const ePrePage = () => {
        if (eCurrentPage !== 1) {
            setECurrentPage(eCurrentPage - 1);
        }
    }

    const eChangeCurrentPage = (id) => {
        setECurrentPage(id);
    }

    const eNextPage = () => {
        if (eCurrentPage !== eNumberOfPages) {
            setECurrentPage(eCurrentPage + 1);
        }
    }

    // Pagination for updated material table
    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    

    return (
        <div>
            <TopNavigationStore />
            <section className="flex">
                <SideNavigationStore open={open} setOpen={setOpen} />

                <div className="relative h-screen">
                    <div className="absolute top-0 left-0 pt-3 pl-10">
                        <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">History</h1>
                    </div>

                    <div className="flex justify-center min-h-screen mx-auto mt-20 ml-10 ">
                        <div className="overflow-x-auto ">
                            <button
                                type="button"
                                onClick={() => setActiveTab('material')}
                                className={`py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${activeTab === 'material' ? 'bg-blue-200' : 'bg-white'} rounded-tl-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                            >
                                Materials
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('equipment')}
                                className={`py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${activeTab === 'equipment' ? 'bg-blue-200' : 'bg-white'} rounded-tr-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                            >
                                Equipment
                            </button>

                            {activeTab === 'material' && (
                                <MaterialHistoryComponent 
                                    records={records}
                                    prePage={prePage}
                                    changeCurrentPage={changeCurrentPage}
                                    nextPage={nextPage}
                                    currentPage={currentPage}
                                    numberOfPages={numberOfPages}
                                    search={searchMaterial}
                                    setSearch={setSearchMaterial}
                                    selectedAction={selectedAction}
                                    setValue={setValue}
                                    value={value}
                                    
                                />
                            )}

                            {console.log('value-history',value)}

                            {activeTab === 'equipment' && (
                                <EquipmentHistoryComponent
                                    eRecords={eRecords}
                                    ePrePage={ePrePage}
                                    eChangeCurrentPage={eChangeCurrentPage}
                                    eNextPage={eNextPage}
                                    eCurrentPage={eCurrentPage}
                                    eNumberOfPages={eNumberOfPages}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default History;
