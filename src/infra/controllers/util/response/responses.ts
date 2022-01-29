export const ok = (value: any) => {
  return {
    statusCode: 200,
    value,
  };
};

export const created = (value: any) => {
  return {
    statusCode: 201,
    value,
  };
};

export const badRequest = (value: any) => {
  return {
    statusCode: 400,
    value,
  };
};
