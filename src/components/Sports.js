import React from "react";
import SportsData from "../data/sports";


const SportCards = () => {
    return (
        
        <div>
            <div className="sportcards-section">
               { SportsData?.map(({ img, name }) => (
            
                    <a href="/" className='sportcard-container'>
            
                        <img className="sport-image" src={img} alt=""/>
                        <div className="sport-name">{name}</div>
                    </a>
                    
                ))}
            </div>
        </div>
    )
}





export default SportCards;