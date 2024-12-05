import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
const mockNavigate = require("react-router-dom").useNavigate;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked data" }),
  })
);

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successful form fields", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    //regular expressions to check each input field
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  test("successful input changes", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "polytest@email.com" } });
    expect(emailInput.value).toBe("polytest@email.com");

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "polytestpassword" } });
    expect(passwordInput.value).toBe("polytestpassword");
  });

  //checking form submission
  test("successful form submission", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "fake-jwt-token" }),
    });

    const mockNavigateFn = jest.fn();
    mockNavigate.mockReturnValue(mockNavigateFn);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "polytest@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "polytestpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        // "http://localhost:5001/api/auth/signin",
        `https://poly-messages-avgzbvbybqg4hhha.westus3-01.azurewebsites.net/api/auth/signin`,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "polytest@email.com",
            password: "polytestpassword",
          }),
        })
      );
    });

    expect(localStorage.getItem("token")).toBe("fake-jwt-token");
    expect(mockNavigateFn).toHaveBeenCalledWith("/home");
  });

  //testing invalid login
  test("error: failed login", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    global.alert = jest.fn();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "polytest@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5001/api/auth/signin",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "polytest@email.com",
            password: "wrongpassword",
          }),
        })
      );
      expect(global.alert).toHaveBeenCalledWith("Invalid credentials");
    });

    global.fetch.mockRestore();
    global.alert.mockRestore();
  });

  test("SignUp button/page", () => {
    const mockNavigateFn = jest.fn();
    mockNavigate.mockReturnValue(mockNavigateFn);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    expect(mockNavigateFn).toHaveBeenCalledWith("/signup");
  });

  //testing for unnatural failures
  test("error: failure", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    global.alert = jest.fn();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "polytest@email.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "somepassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    global.fetch.mockRestore();
    global.alert.mockRestore();
  });
});
