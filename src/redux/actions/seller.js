import axios from "axios";
import { server } from "../../server";

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });

    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });

    if (data && data.seller) {
      dispatch({
        type: "LoadSellerSuccess",
        payload: data.seller,
      });
    } else {
      dispatch({
        type: "LoadSellerFail",
        payload: "Seller data not found in response.",
      });
    }
  } catch (error) {
    const message = error.response?.data?.message || "Failed to load seller";
    dispatch({ type: "LoadSellerFail", payload: message });
  }
};
