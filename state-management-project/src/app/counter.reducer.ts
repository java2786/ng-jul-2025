import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./counter.actions";

export const initialState:number = 99;

const _counterReducer = createReducer(
    initialState,
    on(increment, (state)=> {
        return state+1;
    }),
    on(decrement, (state)=> {
        return state-1;
    }),
    on(reset, (state, action)=> {
        console.log(action);
        return action.payload.num;
    })
);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action)
}