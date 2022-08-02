import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "./logo.png";
import { BsCartCheck } from "react-icons/bs";
import Dropdown from "../Dropdown/Dropdown.jsx";

import DropDownWallet from "../DropwdownWallet/DropDownWallet.jsx";

import { useDispatch, useSelector } from "react-redux";
import { getNft } from "../../redux/actions";
import { useEffect } from "react";
import DropdownNft from "../DropdownNft/DropdownNft";

export default function Navbar({ setWalletAddress, chain }) {
  // const logged = useSelector((state) => state.userIsAuthenticated);

  const userrr = JSON.parse(localStorage.getItem("profiles"));
  const userrrGoogle = JSON.parse(localStorage.getItem("profileGoogle"));

  const userComunTrue = useSelector((state) => state.userComunTrue);

  const userGoogleTrue = useSelector((state) => state.userGoogleTrue);

  const newUser = JSON.parse(userrr);

  console.log("ESTE ES EL USEE GOOGLE", userrrGoogle);
  console.log("ESTE ES EL USER COMUN", newUser);

  // useEffect(() => {

  // }, [])

  const dispatch = useDispatch();

  function cargarHome() {
    dispatch(getNft());
  }

  return (
    <header className={styles.container}>
      <NavLink to="/home" className={styles.home}>
        <button onClick={() => cargarHome()} className={styles.buttonW}>
          <img className={styles.logo} src={Logo} alt="" />
        </button>
      </NavLink>

      <nav className={styles.navBar}>
        <div className={styles.divRed}>
          {chain === "mumbai" ? (
            <p className={styles.mumbai}>Red: Mumbai</p>
          ) : chain === "rinkeby" ? (
            <p className={styles.rinkeby}>Red: Rinkeby</p>
          ) : null}
        </div>
        <ul>
          {userrrGoogle === null && newUser ? (
            <div className={styles.padreDrop}>
              <div>
                <div>
                  <NavLink to="/market">
                    <li>Market</li>
                  </NavLink>
                  <NavLink to="/about">
                    <li>About</li>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : null}
          {newUser === null && userrrGoogle ? (
            <div className={styles.padreDrop}>
              <div>
                <div>
                  <NavLink to="/market">
                    <li>Market</li>
                  </NavLink>
                  <NavLink to="/about">
                    <li>About</li>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : null}
          {newUser === null && userrrGoogle === null ? (
            <div>
              <NavLink to="/market">
                <li>Market</li>
              </NavLink>
              <NavLink to="/about">
                <li>About</li>
              </NavLink>
              <NavLink to="/login">
                <li>Login</li>
              </NavLink>
              <NavLink to="/formRegister">
                <li>Sign Up</li>
              </NavLink>
            </div>
          ) : null}
        </ul>

          {newUser || userrrGoogle?
          (<div className={styles.divdrop}>
            <div>
              <Dropdown className={styles.wallet}></Dropdown>
            </div>
            <div>
              <div className={styles.tooltip}>
                <NavLink to="/cart">
                  <BsCartCheck className={styles.wallet} />
                  <span className={styles.tooltiptext}>View Cart</span>
                </NavLink>
              </div>
            </div>
            <div>
              <DropdownNft className={styles.wallet}></DropdownNft>
            </div>
            <div>
              <DropDownWallet className={styles.wallet}></DropDownWallet>
            </div>
          </div>
          ):(
          <div className={styles.divdrop}>
            <div>
              <div className={styles.tooltip}>
                <NavLink to="/cart">
                  <BsCartCheck className={styles.wallet} />
                  <span className={styles.tooltiptext}>View Cart</span>
                </NavLink>
              </div>
            </div>
            <div>
              <DropdownNft className={styles.wallet}></DropdownNft>
            </div>
            <div>
              <DropDownWallet className={styles.wallet}></DropDownWallet>
            </div>
          </div>
          )}
      </nav>
    </header>
  );
}
