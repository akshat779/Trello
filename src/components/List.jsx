import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Card  from "./Card";


const ListContainer = ({ chidlren }) => {

    return (
        <div className="flex mt-5 flex-col items-center justify-center w-80 bg-gray-700 rounded-lg  overflow-y-auto">
            <div className="w-full bg-gray-800 flex justify-between items-center p-2 rounded-t-lg">
                <h1 className="text-gray-100 font-bold">Title Name</h1>
                <IoCloseCircleOutline className="text-white text-xl" />
            </div>
            <div className="flex flex-col items-center justify-center w-80 pb-4"> 
                {
                    chidlren.map((card) => {
                        return (
                          
                            <Card key={card.id} title={card.title} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ListContainer;