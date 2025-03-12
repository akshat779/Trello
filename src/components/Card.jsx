import React from "react";

const Card = ({ id,title }) => {
    return (
        <div key={id} className="bg-white w-[90%] p-3 m-2 max-h-screen rounded-md">
            <p className="break-words whitespace-normal">{title}</p>
        </div>
    )
}

export default Card;