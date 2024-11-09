import { cellOptions } from "@/enums";
import { endStates } from "@/enums/endStates";

export type IEndStatesTable = {
    [cellOptions.X]: number;
    [cellOptions.O]: number;
    [endStates.TIE]: number;
}