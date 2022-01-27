export const success = (value: any) => {
  return {
    value,

    isSuccess() {
      return true;
    },

    isError() {
      return false;
    },
  };
};

export const error = (value: any) => {
  return {
    value,

    isError() {
      return true;
    },

    isSuccess() {
      return false;
    },
  };
};
