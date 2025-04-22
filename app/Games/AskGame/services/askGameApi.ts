import AskGame, { CreateAskGameRequest } from "../constants/AskTypes";
import { AskGameUrlBase } from "../constants/Endpoints";

export const startGame = async (gameId: number) => {
  try {
    const response = await fetch(`${AskGameUrlBase}/${gameId}`, {
      method: "GET",
    });

    var data: AskGame = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createGame = async (createGameRequest: CreateAskGameRequest) => {
  try {
    const response = await fetch(AskGameUrlBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createGameRequest),
    });

    var data: AskGame = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default { startGame, createGame };
