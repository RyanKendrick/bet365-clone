

function Header() {
    return (
        <div className="header-container">
            {/* <div className="menu">
                <img className="header-logo" src="./imgs/logo-hamburger.svg" alt="" />
                <div className="menu-font" >A-Z</div>
            </div>
            <div>In-Play</div> */}
            <div className="logo-border"><img src="./imgs/logo-small.svg" alt="" /></div>
            {/* <div>My Bets</div>
            <div>
                <img className="user-icon" src="./imgs/user-icon.svg" alt="" />
                <div className="wallet-amount">$100,000</div>
            </div> */}
        </div>
    );
}

export default Header