import React, { useState } from "react";
import Icon from "../Images/logo_heart.PNG";
import Profile from "../Images/profile.webp";
// import Dashboard from "../Images/dash.svg";
import Skin from "../Images/skin.svg";
import BrainCancer from "../Images/brain.svg";
import Alzheimers from "../Images/alzheimers.svg";
import Parkinson from "../Images/parkinson.svg";
import Chatbot from "../Images/chatbot.svg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={Icon} alt="icon" className="logo" />
                <h2 className="title">CareAI. </h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello there 👋🏻</p>
                    <p>hospital@gmail.com</p>
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li
                        className={
                            location.pathname === "/Skin" || location.pathname === "/"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Skin} alt="Skin Cancer" />
                        <Link to="/Skin">Skin Cancer</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/BrainCancer" ? "active" : ""
                        }
                    >
                        <img src={BrainCancer} alt="Brain Cancer" />
                        <Link to="/BrainCancer">Brain Cancer</Link>
                    </li>
                    
                    <li
                        className={
                            location.pathname === "/Parkinson" ? "active" : ""
                        }
                    >
                        <img src={Parkinson} alt="Parkinson" />
                        <Link to="/Parkinson">Parkinson</Link>
                    </li>

                    <li
                        className={
                            location.pathname === "/Alzheimers" ? "active" : ""
                        }
                    >
                        <img src={Alzheimers} alt="Alzheimer’s" />
                        <Link to="/Alzheimers">Alzheimer’s </Link>
                    </li>
                    
                    <li
                        className={
                            location.pathname === "/Chatbot" ? "active" : ""
                        }
                    >
                        <img src={Chatbot} alt="Healthcare Chatbot" />
                        <Link to="/Chatbot">Chatbot</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
