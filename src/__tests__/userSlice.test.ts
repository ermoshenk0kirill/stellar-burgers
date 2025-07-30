import { authChecked, setUser, userSlice, fetchUserLogin, fetchUserRegistration, fetchUserUpdate, fetchUserLogout } from "../services/slices/userSlice";
import { TUser } from "@utils-types";

const initialState = {
  user: null,
  AuthCheck: false,
  isLoading: false,
  error: null,
};

const mockUser: TUser = {
  name: "Kirill",
  email: "kirill@gmail.com"
};

describe("userSlice reducer", () => {
  it("должен возвращать начальное состояние", () => {
    expect(userSlice.reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });
  

  it("должен обрабатывать экшен authChecked", () => {
    const action = authChecked(true);
    const state = userSlice.reducer(initialState, action);
    expect(state.AuthCheck).toBe(true);
  });

  it("должен устанавливать пользователя", () => {
    const action = setUser(mockUser);
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });

  describe("fetchUserLogin", () => {
    it("включает загрузку", () => {
      const action = { type: fetchUserLogin.pending.type };
      const state = userSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it("сохраняет пользователя и ставит AuthCheck", () => {
      const action = {
        type: fetchUserLogin.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.AuthCheck).toBe(true);
    });

    it("сохраняет ошибку и ставит AuthCheck", () => {
      const action = {
        type: fetchUserLogin.rejected.type,
        error: { message: "Login failed" },
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe("Login failed");
      expect(state.AuthCheck).toBe(true);
    });
  });

  describe("fetchUserRegistration", () => {
    it("сохраняет пользователя и ставит AuthCheck", () => {
      const action = {
        type: fetchUserRegistration.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.AuthCheck).toBe(true);
    });

    it("сохраняет ошибку и ставит AuthCheck", () => {
      const action = {
        type: fetchUserRegistration.rejected.type,
        error: { message: "Registration error" },
      };
      const state = userSlice.reducer(initialState, action);
      expect(state.error).toBe("Registration error");
      expect(state.AuthCheck).toBe(true);
    });
  });

  describe("fetchUserUpdate", () => {
    it("обновляет пользователя и отключает загрузку", () => {
      const action = {
        type: fetchUserUpdate.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = userSlice.reducer({ ...initialState, isLoading: true }, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
    });
  });

  describe("fetchUserLogout", () => {
    it("очищает пользователя, ошибку и загрузку", () => {
      const action = { type: fetchUserLogout.fulfilled.type };
      const state = userSlice.reducer({ ...initialState, user: mockUser, isLoading: true, error: "Some error" }, action);
      expect(state.user).toBe(null);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });
  });
});
