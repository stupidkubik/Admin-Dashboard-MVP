global.fetch = jest.fn();

const { apiSlice } = require("../apiSlice") as typeof import("../apiSlice");
const { makeStore } = require("../store") as typeof import("../store");

describe("application store", () => {
  it("registers the RTK Query reducer and middleware", () => {
    const store = makeStore();

    expect(store.getState()).toHaveProperty(apiSlice.reducerPath);

    store.dispatch(apiSlice.util.resetApiState());
    expect(store.getState()[apiSlice.reducerPath].queries).toEqual({});
  });
});
