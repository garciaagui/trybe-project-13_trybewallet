export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_WALLET_INFO = 'SAVE_WALLET_INFO';

export const saveUserInfoAction = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const saveWalletInfoAction = (payload) => ({
  type: SAVE_WALLET_INFO,
  payload,
});
