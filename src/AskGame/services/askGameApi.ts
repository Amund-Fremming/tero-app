import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../../Common/constants/Endpoints";
import { Result } from "@/src/Common/utils/result";
import httpResult from "@/src/Common/services/httpResult";

export const createGame = async (createGameRequest: CreateAskGameRequest): Promise<Result<AskGame>> =>
  await httpResult.post<CreateAskGameRequest, AskGame>(AskGameUrlBase, createGameRequest);

export const getAskGame = async (id: number): Promise<Result<AskGame>> => {
  const url = `${AskGameUrlBase}/${id}`;
  return await httpResult.simpleGet<AskGame>(url);
};

export default { createGame, getGame: getAskGame };
