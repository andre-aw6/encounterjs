import { cupons as getCupons } from "../../graphql";

export const SET_CUPONS = "SET_COPONS";

function setCupons(cupons) {
  return {
    type: SET_CUPONS,
    cupons,
  };
}

export function handleLoadCupons() {
  return async (dispatch) => {
    const { cupons } = await getCupons();
    dispatch(setCupons(cupons));
  };
}
