module.exports.findByTestId = (wrapper, testId, index = -1) => {
  if (index > -1) {
    return wrapper.findAll(`[data-testid="${testId}"]`).at(index);
  } else {
    return wrapper.find(`[data-testid="${testId}"]`);
  }
};
