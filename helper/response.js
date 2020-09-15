// eslint-disable-next-line arrow-body-style
export const responseFormalize = (status, code, error, message, data) => {

  return {
    status: status || 404,
    code: code || null,
    error: error || false,
    message: message || null,
    data: data || null,
  };
};

export const errorResponse = responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
