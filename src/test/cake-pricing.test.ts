import { describe, expect, it } from "vitest";
import { cakeEstimate, cakes, cakeSizes, menu } from "@/components/cafe/data";

describe("Cafe prices", () => {
  it("offers only the three requested cakes", () => {
    expect(cakes.map((cake) => cake.id)).toEqual(["cheese", "carrot", "custom"]);
  });
  it("offers 8, 12, 18 and 25 people", () => {
    expect(cakeSizes).toEqual([8, 12, 18, 25]);
    expect(cakeEstimate("cheese", 6)).toBeNull();
  });
  it("scales cheesecake from 18 euros for eight, rounded to half a euro", () => {
    expect(cakeSizes.map((size) => cakeEstimate("cheese", size)?.min)).toEqual([18, 27, 40.5, 56.5]);
  });
  it("scales carrot cake from 20 euros for eight", () => {
    expect(cakeSizes.map((size) => cakeEstimate("carrot", size)?.min)).toEqual([20, 30, 45, 62.5]);
  });
  it("estimates custom cakes between 3.50 and 5 euros per person", () => {
    expect(cakeSizes.map((size) => cakeEstimate("custom", size))).toEqual([
      { min: 28, max: 40 }, { min: 42, max: 60 }, { min: 63, max: 90 }, { min: 87.5, max: 125 },
    ]);
  });
  it("shares the base prices with the cake menu", () => {
    expect(menu.find((section) => section.cakeCta)?.items.map((item) => item.price)).toEqual(["18,00", "20,00", "desde 28,00"]);
  });
  it("adds juice and wine at the requested prices", () => {
    const drinks = menu.find((section) => section.title === "Bebidas")?.items;
    expect(drinks?.find((item) => item.name === "Zumo")?.price).toBe("3,00");
    expect(drinks?.find((item) => item.name === "Vino en copa")?.price).toBe("3,50");
    expect(drinks?.find((item) => item.name === "Vino en botella")?.price).toBe("16,00");
  });
});