import { SpinGameUrlBase } from "@/app/Hub/constants/Endpoints";
import { CreateGameResponse, PagedRequest, PagedResponse } from "@/app/Hub/constants/Types";
import httpResult from "@/app/Hub/services/httpResult";
import SpinGame, { CreateSpinGameRequest } from "../constants/SpinTypes";
import { Result } from "@/app/Hub/utils/result";

export const createGame = async (request: CreateSpinGameRequest): Promise<Result<CreateGameResponse>> => {
  return await httpResult.post<CreateSpinGameRequest, CreateGameResponse>(SpinGameUrlBase, request);
};

export const getGamesPage = async (pagedRequest: PagedRequest): Promise<Result<PagedResponse<SpinGame>>> => {
  const url = `${SpinGameUrlBase}/page`;
  return await httpResult.post<PagedRequest, PagedResponse<SpinGame>>(url, pagedRequest);
};
