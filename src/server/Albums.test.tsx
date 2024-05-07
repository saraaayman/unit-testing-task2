import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import Albums from "./Albums";

const fakeAlbums = [
  {
    id: 1,
    title: "title one",
    userId: 1,
  },
  {
    id: 2,
    title: "title two",
    userId: 2,
  },
  {
    id: 3,
    title: "title three",
    userId: 3,
  },
];

const server = setupServer(
  http.get("*/albums", () => {
    return HttpResponse.json(fakeAlbums);
  })
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Albums />", () => {
  test("renders loading", () => {
    render(<Albums />);
    expect(screen.getByText("Loading ...")).toBeInTheDocument();
  });

  test("renders something wrong when fetch albums fails", async () => {
    server.use(
      http.get("*/albums", () => {
        return HttpResponse.json({}, { status: 400 });
      })
    );
    render(<Albums />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading ..."));

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  test("renders empty message for empty albums response", async () => {
    server.use(
      http.get("*/albums", () => {
        return HttpResponse.json([]);
      })
    );
    render(<Albums />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading ..."));

    expect(screen.getByText("No albums")).toBeInTheDocument();
  });
  test("renders albums list after successful data fetching", async () => {
    render(<Albums />);

    await waitForElementToBeRemoved(() => screen.getByText("Loading ..."));

    expect(screen.getAllByRole("listitem")).toHaveLength(fakeAlbums.length);

    fakeAlbums.forEach((album) => {
      expect(
        screen.getByRole("heading", { level: 2, name: album.title })
      ).toBeInTheDocument();
    });
  });
});
