/**
 * Apple Like Color Design Colors
 */
export const BaseColor = {
    White: "#FFFFFF",
    Black: "#000000",
    SecondaryBlack: "#1C1C1E",
    SecondaryWhite: "#F2F2F7",
    TertiaryBlack: "#2C2C2E",
    TertiaryWhite: "#3A3A3C",
    LabelSecondaryWhite: "#3C3C43",
    LabelSecondaryBlack: "#EBEBF5",
    SeparatorOpaque: "#C6C6C8",
    FloatingWhite: "#fafafa",
};
export const BaseColorToName = Object.fromEntries(
    Object.entries(BaseColor).map(([k, v]) => [v, k]),
);
