function SportCard({name, img}) {
    return (
        <div className='sportcard-container'>
            <img className="sport-image" src={img} alt=""/>

            <div className="sport-name">{name}</div>
            
        </div>
    )
}

export default SportCard