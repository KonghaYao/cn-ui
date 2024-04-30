import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { getStoryContext, waitForPageReady } from "@storybook/test-runner";
import { toMatchImageSnapshot } from "jest-image-snapshot";

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const setupVisualTest = async (page, story) => {
    // Accesses the story's parameters and retrieves the viewport used to render it
    const context = await getStoryContext(page, story);
    const needVirtual = context.parameters?.virtualTest === true;
    await waitForPageReady(page);
    const ScreenshotCompare = async (suffix = "") => {
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            customSnapshotsDir,
            customSnapshotIdentifier: context.id + suffix,
        });
    };

    if (needVirtual) await ScreenshotCompare();
};

const config = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },
    async preVisit(page, story) {
        // await setupScreenSize(page, story);
        await setupVisualTest(page, story);
    },
};

export default config;
