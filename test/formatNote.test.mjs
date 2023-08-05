import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { formatNoteToMD } from "../utils/Core";
import Routes from "../utils/Routes";

// All tests within this suite will be run in parallel
describe("Format Notes to text", async () => {
    const res = await formatNoteToMD([
        {
            book: "El arte de la guerra",
            author: "Zuo chan",
            annotations: [
                {
                    reference:
                        "Your Highlight on page 1 | Location 10-11 | Added on Wednesday, April 5, 2023 1:04:29 AM",
                    highlight:
                        "El primero de estos factores es la doctrina; el segundo, el tiempo; el tercero, el terreno; el cuarto, el mando; y el quinto, la disciplina.",
                },
            ],
        },
        {
            book: "Dive into Refactoring",
            annotations: [
                {
                    reference:
                        "Your Highlight on page 6-6 | Added on Wednesday, April 5, 2023 2:54:05 AM",
                    highlight:
                        "Therefore, it is necessary to get rid of code smells while they are still small.",
                },
                {
                    reference:
                        "Your Highlight on page 6-6 | Added on Monday, May 1, 2023 1:33:28 AM",
                    highlight: "Code smells",
                },
            ],
        },
    ]);
    console.log(res);
    // Test the folder created at the start of the function
    const absolutePath = path.join(Routes.source, "Notes");

    it("Should have a folder to store the files", () => {
        expect(fs.existsSync(absolutePath)).toBe(true);
    });

    it("Should return an array of strings", () => {
        // Check if the result is an Array
        expect(Array.isArray(res)).toBe(true);
        // Check if the array had strings
        res.forEach((i) => expect(typeof i).toBe("string"));
    });

    it("Note folder should has files with .md", () => {
        const files = fs.readdirSync(absolutePath).filter((f) => f.includes(".md")) ?? null;
        expect(files.length).toBeGreaterThan(0);
    });
});
