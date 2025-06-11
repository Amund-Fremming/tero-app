import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../../../Hub/constants/Endpoints";
import { Result } from "@/app/Hub/utils/result";
import { PagedRequest, PagedResponse } from "@/app/Hub/constants/Types";
import httpResult from "@/app/Hub/services/httpResult";

export const createGame = async (createGameRequest: CreateAskGameRequest): Promise<Result<AskGame>> =>
  await httpResult.post<CreateAskGameRequest, AskGame>(AskGameUrlBase, createGameRequest);

export const getGame = async (id: number) => {
  const url = `${AskGameUrlBase}/${id}`;
  return await httpResult.simpleGet<AskGame>(url);
};

export const getGamesPage = async (body: PagedRequest): Promise<Result<PagedResponse<AskGame>>> => {
  const url = `${AskGameUrlBase}/page`;
  return await httpResult.post<PagedRequest, PagedResponse<AskGame>>(url, body);
};

export default { createGame };
