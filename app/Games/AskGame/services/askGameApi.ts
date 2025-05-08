import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../../../Hub/constants/Endpoints";
import { Result, ok, err } from "neverthrow";

export const startGame = async (gameId: number) => {
  try {
    const response = await fetch(`${AskGameUrlBase}/${gameId}`, {
      method: "GET",
    });

    if (response.status !== 200) {
      throw new Error("Status was not 200");
    }

    var data: AskGame = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createGame = async (
  createGameRequest: CreateAskGameRequest
): Promise<Result<number, string>> => {
  try {
    const response = await fetch(AskGameUrlBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createGameRequest),
    });

    if (response.status !== 200) {
      throw new Error("Status was not 200");
    }

    var data: number = await response.json();
    return ok(data);
  } catch (error) {
    console.error(error);
    return err("Klarte ikke opprette spill.");
  }
};

export default { startGame, createGame };
