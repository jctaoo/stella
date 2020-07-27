enum PassageDetailState {
  loading,
  notfound,
  fail,
}

export function isPassageDetailState(obj: unknown): boolean {
  const keys = Object.keys(PassageDetailState);
  for (const key of keys) {
    if (obj === key) {
      return true;
    }
  }
  return false;
}

export default PassageDetailState;