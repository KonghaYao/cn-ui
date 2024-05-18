/**
 * Apple Like Color Design Colors
 */
export const BaseColor = {
    White: "#FFFFFF",
    SecondaryWhite: "#F2F2F7",
    TertiaryWhite: "#3A3A3C",
    LabelSecondaryWhite: "#EBEBF5",
    FloatingWhite: "#fafafa",

    Black: "#000000",
    TertiaryBlack: "#2C2C2E",
    SecondaryBlack: "#1C1C1E",
    LabelSecondaryBlack: "#3C3C43",

    SeparatorOpaque: "#e3e3e3",
    SeparatorOpaqueBlack: "#3f3f3f",
};
export const BaseColorToName = Object.fromEntries(
    Object.entries(BaseColor).map(([k, v]) => [v, k]),
);
