# Kindle to Notes 🎯

To get all highlights and notes from the My Clippings.txt, and import them to any note-taking app such as Obsidian.
MD Notes - Markdown Notes.

## Progress 📝

-   [x] ~~Basic structure data from highlights~~
-   [x] Filter by title with their corresponding notes.
-   [ ] [Integration] Import the book's highlights into Obsidian.
    -   [ ] Markdown automation for each Book in the array.
        -   [ ] Arrange the Resulting MD Notes by:
            -   Titles with associate tag - i.e: .h1
            -   Highlights: Using admonition or quotes.
    -   [ ] Find the pattern for MD Notes (/^\.h\d{1}/i)
-   [ ] Sync function that detects the last entry of the clipping file
    -   It will compare the -previous entry-, with the newly .txt file
