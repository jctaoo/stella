export enum AppEnv {
  dev,
  prd,
}

export const useEnv = (): AppEnv => {
  const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
  if (activeEnv === "development") return AppEnv.dev;
  return AppEnv.prd;
};
