export type Swapper = "TerraSwap" | "LOOP" | "Astroport";

export class ParamsWithSwapperName {
  swapper!: Swapper;
}

export class ParamsWithSwapperNameAndScale {
  swapper!: Swapper;
  scale!: number;
}
