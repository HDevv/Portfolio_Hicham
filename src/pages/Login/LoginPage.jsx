import React, { useState } from "react";
import "./LoginPage.css";
import { useUser } from "../../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Formulaire rempli avec l'email:",
      email,
      "et le mot de passe:",
      password
    );
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      const { token } = data;
      if (!token) {
        throw new Error("Token non reçu");
      }

      console.log("Connnexion réussie, token reçu:", token);
      localStorage.setItem("token", token);

      setUser({ email });
    } catch (error) {
      console.error("Connexion refusée:", error);
      setError("Utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <form className="login-page" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
