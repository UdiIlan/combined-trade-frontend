import AppAction from "./constants";
import { createAction } from "redux-actions";

export const login = createAction(AppAction.LOGIN, (userName: string, password: string) => { return { userName, password }; });