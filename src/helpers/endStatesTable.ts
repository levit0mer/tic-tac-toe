import { cellOptions } from "@/enums";
import { endStates } from "@/enums/endStates";
import { IEndStatesTable } from "@/interfaces/iEndStatesTable";

export const endStatesTable: any = {
    [endStates.X]: 1,
    [endStates.O]: -1,
    [endStates.TIE]: 0
}