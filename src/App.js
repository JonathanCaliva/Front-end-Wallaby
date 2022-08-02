import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useMoralis } from "react-moralis";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import About from "./components/About/About";
import FormRegister from "./components/FormRegister/FormRegister";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Login from "./components/Login/Login.jsx";
import Payment from "./components/Payment/Payment";
import NotFound from "./components/NotFound/NotFound";
import Favorite from "./components/Favorite/Favorite";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Profile from "./components/Profile/Profile";
import FormEditProfile from "./components/FormEditProfile/FormEditProfile";
import MyCollections from "./components/MyCollections/MyCollections";
import MyOrders from "./components/MyOrders/MyOrders";
import Dashboard from "./components/Dashboard/Dashboard";
import Listusers from "./components/Dashboard/Listusers/Listusers.jsx";
import RecoverPassword from "./components/recoverPassword/RecoverPassword";
import Star from "./components/Star/Star";
import Market from "./components/Market/Market";
import Collection from "./components/Collection/Collection";
import { mumbaiContractABI, rinkebyContractABI } from "./contracts/contract";
import SwitchBoton from "./components/SwitchBoton/SwitchBoton";
import { nft_contract_mumbai } from "./contracts/contract";

function App() {
  useEffect(() => {
    JSON.parse(window.localStorage.getItem("profiles"));
  }, []);

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const [walletAddress, setWalletAddress] = useState(null);
  const [chain, setChain] = useState("mumbai");
  const [contractNFT, setContractNFT] = useState(
    "0x360c34B4724b6eDEB276c7BAa3a55BA220Bd1ec6"
  );
  const [contractABI, setContractABI] = useState(rinkebyContractABI);
  console.log("ESTO ES CHAIN", chain);

  function chainChain(value) {
    console.log("ESTE ES EL VALUE QUE ME LLEGA DEL BOTON", value);
    if (value === "mumbai") {
      setContractNFT("0x9d0FE661f4A940be4c1fda9569e7AEFaF9Eafb75");
      setContractABI(mumbaiContractABI);
      setChain("mumbai");
    } else {
      setContractNFT("0x360c34B4724b6eDEB276c7BAa3a55BA220Bd1ec6");
      setContractABI(rinkebyContractABI);
      setChain("rinkeby");
    }
  }

  console.log("NUEVO ESTADO", chain);

  useEffect(() => {
    window.localStorage.getItem("profiles");
    window.localStorage.getItem("googleProfile");
  }, []);

  useEffect(() => {
    console.log("dale");
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  let favoritoInicial = JSON.parse(localStorage.getItem("favorito"));
  if (!favoritoInicial) {
    favoritoInicial = [];
  }

  const [favorito, setFavorito] = useState(favoritoInicial);

  useEffect(() => {
    let favoritoInicial = JSON.parse(localStorage.getItem("favorito"));
    if (favoritoInicial) {
      localStorage.setItem("favorito", JSON.stringify(favorito));
    } else {
      localStorage.setItem("favorito", JSON.stringify([]));
    }
  }, [favorito]);

  const agregarFavorito = (e) => {
    const copiaFavorito = favorito;
    const nuevoFavorito = favorito.filter((item) => item.id !== e.id);
    setFavorito([...nuevoFavorito, e]);

    if (copiaFavorito.length !== nuevoFavorito.length) {
      Swal.fire("", "Item already exist in the favorite", "error");
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item added to favorite succefully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const eliminarFavorito = (id) => {
    const nuevoFavorito = favorito.filter((e) => e.id !== id);
    setFavorito(nuevoFavorito);
  };
  console.log(favorito);
  let carritoInicial = JSON.parse(localStorage.getItem("carrito"));
  if (!carritoInicial) {
    carritoInicial = [];
  }
  const [carrito, setCarrito] = useState(carritoInicial);

  useEffect(() => {
    let carritoInicial = JSON.parse(localStorage.getItem("carrito"));
    if (carritoInicial) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      localStorage.setItem("carrito", JSON.stringify([]));
    }
  }, [carrito]);

  const agregarCarrito = (e) => {
    const copiaCarrito = carrito;
    const nuevoCarrito = carrito.filter((item) => item._id !== e._id);
    setCarrito([...nuevoCarrito, e]);

    if (copiaCarrito.length !== nuevoCarrito.length) {
      Swal.fire("", "Item already exist in the cart", "error");
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item added to cart succefully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const eliminarCarrito = (id) => {
    const nuevoCarrito = carrito.filter((e) => e.id !== id);
    setCarrito(nuevoCarrito);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };
  console.log("CHAIN", chain);
  return (
    <div className="generalApp">
      <Routes>
        <Route
          exact
          path="/"
          element={<LandingPage chainChain={chainChain} />}
        />

        <Route
          path="/home"
          element={
            <Home
              chain={chain}
              chainChain={chainChain}
              carrito={carrito}
              agregarCarrito={agregarCarrito}
              agregarFavorito={agregarFavorito}
              favorito={favorito}
              setWalletAddress={setWalletAddress}
              walletAddress={walletAddress}
            />
          }
        />
        <Route
          path="/detail/:id/:token_address"
          element={
            <Detail
              agregarFavorito={agregarFavorito}
              agregarCarrito={agregarCarrito}
            />
          }
        />
        <Route
          path="/form"
          element={<Form contractNFT={contractNFT} contractABI={contractABI} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route
          path="/market"
          element={
            <Market
              agregarCarrito={agregarCarrito}
              agregarFavorito={agregarFavorito}
              walletAddress={walletAddress}
              contractNFT={contractNFT}
            />
          }
        />
        <Route path="/formRegister" element={<FormRegister />} />
        <Route path="/collection/:address" element={<Collection />} />
        <Route
          path="/cart"
          element={
            <ShoppingCart
              limpiarCarrito={limpiarCarrito}
              eliminarCarrito={eliminarCarrito}
              carrito={carrito}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/FormEditProfile" element={<FormEditProfile />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard/Listusers" element={<Listusers />} />

        <Route
          path="/favorite"
          element={
            <Favorite eliminarFavorito={eliminarFavorito} favorito={favorito} />
          }
        />
        <Route
          path="/mycollections"
          element={<MyCollections chain={chain} chainChain={chainChain} />}
        />
        <Route path="/myorders" element={<MyOrders />} />

        <Route path="/:email/newpassword" element={<RecoverPassword />} />
      </Routes>
    </div>
  );
}
export default App;
