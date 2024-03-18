import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ProductComponent from "../../components/product-component";
import "@testing-library/jest-dom";

// Mock global fetch
global.fetch = jest
  .fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          products: [{ id: "1", name: "Banana", price: "1.99" }],
        }),
    })
  );

beforeEach(() => {
  fetch.mockClear();
});

it("carga y muestra productos después de la renderización", async () => {
  render(<ProductComponent />);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  // Usar findByText para buscar el elemento de forma asíncrona
  const item = await screen.findByText(/Banana/);
  expect(item).toBeInTheDocument();
});

it("muestra detalles del producto al hacer clic en 'Mostrar más detalles'", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        products: [{ id: "1", name: "Banana", price: "1.99" }],
      }),
    })
  ).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        id: "1",
        name: "Banana",
        price: "1.99",
        vendors: [{ id: 1, name: "Exotics Fruit Lair Ltd." }],
      }),
    })
  );

  render(<ProductComponent />);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  const detailsButton = await screen.findByText(/mostrar más detalles\s*?/i);
  fireEvent.click(detailsButton);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

  expect(await waitFor(() => screen.getByText(/Precio:/))).toBeInTheDocument();
  expect(await waitFor(() => screen.getByText(/Descripción:/))).toBeInTheDocument();
  expect(screen.getByText(/1.99/)).toBeInTheDocument();
});
