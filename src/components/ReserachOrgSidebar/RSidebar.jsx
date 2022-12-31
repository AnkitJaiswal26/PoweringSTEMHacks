import React from "react";
import { Link } from "react-router-dom";
import { orgSidebar } from "./orgSidebar";
import styles from "./Sidebar.module.css";

const RSidebar = ({ value }) => {
  return (
    <div className={styles.sidebar_wrapper}>
      <Link to="/">
        <div className={styles.logoDiv}>EHRecord</div>
      </Link>
      <hr className="bg-gray-200 border-0" />

      <div>
        <ul className={styles.sidebarList}>
          {orgSidebar.map((item, index) => {
            return (
              <li key={item.name}>
                <div className={`${item.name === value ? styles.active : ""}`}>
                  {item.icon}
                  <Link to={item.url}>{item.name}</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RSidebar;
