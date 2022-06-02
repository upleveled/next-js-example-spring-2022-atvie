export function queryParamToNumber(queryParam: string | string[] | undefined) {
  if (!queryParam) return undefined;
  if (Array.isArray(queryParam)) {
    return Number(queryParam[0]);
  }
  return Number(queryParam);
}
