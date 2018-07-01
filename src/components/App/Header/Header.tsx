import * as React from "react";
const styles = require("./styles.scss");

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.logo} />
            <h1 className={styles.mainHeader}>
                Live Order Book
            </h1>
        </header>
    );
};

export default Header;