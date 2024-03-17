import ProductComponent from "../components/product-component";

export default function Home() {
  return (
    <div>
      <h1 className="p-4 w-full font-extrabold text-4xl text-center">Listado de Frutas</h1>
      <div>
        <ProductComponent />
      </div>
    </div>
  );
}
