'use client'
import {useState, useEffect} from "react";

function ProductComponent() {
  const [frutas, setFrutas] = useState([]);

  useEffect(() => {
    const cargarFrutas = async () => {
      try {
        const response = await fetch("/api/fruits");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error al cargar las frutas:", error);
      }
    };

    cargarFrutas();
  }, []);

  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          margin: "10px",
          display: "inline-block",
        }}
      >
        <div>
        {frutas.map((fruta) => (
          <><h2>{fruta.name}</h2><p>Family: {fruta.family}</p><p>Genus: {fruta.genus}</p></>
          ))}
        </div>


      </div>
    </>
  );
}

export default ProductComponent;
