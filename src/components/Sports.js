import React from "react";
import SportsData from "../data/sports";


const SportCard = () => {
    return (
        
        
        <div className="sportcards-section">

           { SportsData?.map(({ img, name }) => (
            
                <div className='sportcard-container'>
            
                    <img className="sport-image" src={img} alt=""/>
                    <div className="sport-name">{name}</div>
            
                </div>
            ))}
        </div>
    )
}





export default SportCard;